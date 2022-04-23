import "./Profile.css";
import image1 from "./default1.jpg"
import image2 from "./cover.jpg"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react"

export default function Profile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>

  );
  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>about</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={image2}
                alt=""
              />
              <img
                className="profileUserImg"
                src={image1}
                alt=""
              />
              <div className="box" type="text" placeholder="About">
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Şevval Atmaca {localStorage.getItem("currentUser")}</h4>
                <h5 className="profileRole">Student</h5>
            </div>
          </div>
          </div>
        </div>
        </div>
        
        <Card sx={{ maxWidth: 275,
        height: 310}}>
      <CardContent>
        <Typography variant="h4"  gutterBottom>
          Skills
        </Typography>
        <Typography  variant="h5">
          Java
        </Typography>
        <Typography variant="h5">
          C#
        </Typography>
        <Typography variant="h5">
          Pyhton
        </Typography>
      </CardContent>
    </Card>
    <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>
    </>
    
  );
}