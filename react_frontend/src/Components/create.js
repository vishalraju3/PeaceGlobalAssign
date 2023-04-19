import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from "react-image-crop";
/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */

export default function CreateProduct() {
  const navigate = useNavigate();

  const [car, setcar] = useState("")
  const [model, setmodel] = useState("")
  const [image, setImage] = useState("")
  const [img, setimg] = useState("")

  const [validationError,setValidationError] = useState({})
  const [src, selectfile] = useState(null)
  const [visible, SetVisible] = useState(false)
  
  const [crop,setCrop] = useState({  unit: '%', // Can be 'px' or '%'
  x: 25,
  y: 25,
  width: 50,
  height: 50})

  const changeHandler = (event) => {
    SetVisible(true)

	selectfile(URL.createObjectURL(event.target.files[0]));
  setimg(event.target.files[0]);
  

  console.log(crop);
    };



 function getCroppedImg() {

SetVisible(false);
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
    
      // New lines to be added
      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";
    
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      
  // canvas.toBlob(blob=>{
  //   setimg(blob)

  // });
  const base64Image = canvas.toDataURL("image/jpeg");
  // setimg(base64Image)
 

 
  Swal.fire({
    text:"image cropped Successfully",
    icon:"success"
  })
    }



  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('car', car)
    formData.append('model', model)
    formData.append('image', img)

    await axios.post(`http://localhost:8000/api/products`, formData).then(({data})=>{
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
              <h4 className="card-title">Create Product</h4>
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
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="car">
                            <Form.Label>car</Form.Label>
                            <Form.Control type="text" value={car} onChange={(event)=>{
                              setcar(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="">
                      <Col>
                        <Form.Group controlId="model">
                            <Form.Label>model</Form.Label>
                            <Form.Control type="text" value={model} onChange={(event)=>{
                              setmodel(event.target.value)
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
                  { visible ? <Row>
                    <div>{
                      src && (
                        <ReactCrop src={src} crop={crop} onChange={setCrop} onImageLoaded={setImage} ></ReactCrop>
                      )
                    }

                    </div>
                    <div>
                    <button onClick={getCroppedImg}>Set crop</button>
                    </div>

                    </Row> : <div></div>}

                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
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