import React, { useEffect, useState } from 'react';	
import axios from "axios";
import ReactStars from 'react-stars';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './index.css';

export default () => {	
  const [status, setStatus ] = useState('loading...');	
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    if (status !== "loading...") return;
    axios("/api/get-testimonials").then(result => {
      if (result.status !== 200) {
        console.error("Error loading testimonials");
        console.error(result);
        return;
      }
      setTestimonials(result.data.messages);
      setStatus("loaded");
    });
  }, [status]);

  const getAvatar = () => {
    const random = Math.floor(Math.random() * (testimonials.length - 0 + 1) + 0);
    const imgUrl = `https://avatars.dicebear.com/api/human/${random}.svg?mood[]=happy`;
    return imgUrl;
  }

  // identity code
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "Untitled";
  const isLoggedIn = identity && identity.isLoggedIn;

  // create testimonial
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(4);
  const [text, setText] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  }
  const textChanged = evt => {
    const val = evt.target.value;
    setText(val);
  }
  const handleCreate = async event => {
    if(text === '') return;
    await axios.post('/api/create-testimonial', { text, rating });
    const newList = testimonials.concat({ text, rating });
    setTestimonials(newList);
    setShow(false);
  }

  return (
    <>
      {
        identity && identity.isLoggedIn ? (
              <div className="auth-btn-grp">
                <Button variant="outline-primary" onClick={handleShow}>Create Testimonial</Button>
                { ' '}
                <Button variant="outline-primary" className="login-btn" onClick={() => setDialog(true)}>
                    {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
                </Button>
              </div>
          ) : (
              <div className="auth-btn-grp">
                  <Button variant="outline-primary" className="login-btn" onClick={() => setDialog(true)}>
                      {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
                  </Button>
              </div>
          ) 
      }

      <Carousel
          className="main"
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={false} >
          
          {testimonials && testimonials.map((testimonial, index) => (
              <div key={ index } className="testimonial"> 
                  <img 
                      src={ getAvatar() } 
                      height="50px"
                      width="50px"
                      alt="avatar" />
                  <div className="message">
                      <ReactStars
                          className="rating"
                          count={ testimonial.rating }
                          size={24}
                          color1={'#ffd700'} 
                          edit={false}
                          half={false} />
                      <p className="text">
                      { testimonial.text }
                      </p>
                  </div>
              </div>
          ))}
      </Carousel>

      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />

      <Modal
          show={show}
          onHide={handleClose}
          animation={true}
          className="create-testimonial"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a Testimonial</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="create-form">
              <textarea 
                onChange={(evt) => textChanged(evt)} 
                placeholder="Enter your message here" />
              <br />
              <span>Rating:</span> {' '} 
              <ReactStars
                count={5}
                value={rating}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'}
                half={false} />
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(evt) => handleCreate(evt)}>Create</Button>
          </Modal.Footer>
      </Modal>
    </>
  );	
}