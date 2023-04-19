import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import dynamic from 'next/dynamic'
import { BrowserRouter as Router , Routes, Route, Link, BrowserRouter } from "react-router-dom";


import EditProduct from "./Components/edit";
import ProductList from "./Components/list";
import CreateProduct from "./Components/create";


export default function Home() {
  return (
  //   <BrowserRouter>
  //       <Router>
  //   <Navbar bg="primary">
  //     <Container>
  //       <Link to={"/"} className="navbar-brand text-white">
  //         CRUD Operations
  //       </Link>
  //     </Container>
  //   </Navbar>

  //   <Container className="mt-5">
  //     <Row>
  //       <Col md={12}>
  //         <Routes>
  //           <Route path="/product/create" element={<CreateProduct />} />
  //           <Route path="/product/edit/:id" element={<EditProduct />} />
  //           <Route path='/' element={<ProductList />} />
  //         </Routes>
  //       </Col>
  //     </Row>
  //   </Container>
  // </Router>
  //   </BrowserRouter>
  <div>
     <CreateProduct/>
  </div>

  )
}




