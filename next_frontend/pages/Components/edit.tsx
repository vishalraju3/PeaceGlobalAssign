import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [car, setTitle] = useState("")
  const [model, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchProduct()
  },[])

  const fetchProduct = async () => {
    await axios.get(`http://localhost:8000/api/products/${id}`).then(({data})=>{
      const { car, model } = data.product
      setTitle(car)
      setDescription(model)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const changeHandler = (event: any) => {
		setImage(event.target.files[0]);
	};

  const updateProduct = async (e:any) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('car', car)
    formData.append('model', model)
    if(image!==null){
      formData.append('image', image)
    }

    await axios.post(`http://localhost:8000/api/products/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Product</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value as string}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>car</Form.Label>
                            <Form.Control type="text" value={car} onChange={(event)=>{
                              setTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="">
                      <Col>
                        <Form.Group controlId="model">
                            <Form.Label>model</Form.Label>
                            <Form.Control as="textarea" rows={3} value={model} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg"  type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}