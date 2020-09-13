import React, { useEffect, useState } from 'react';	
import axios from "axios";

export default () => {	
  const [status, setStatus ] = useState('loading...');	
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    if (status != "loading...") return;
    axios("/api/get-testimonials").then(result => {
      if (result.status != 200) {
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

  return (
    <>
      {testimonials && testimonials.map((testimonial, index) => (
        <div key={ index }>
          <img 
            src={ getAvatar() } 
            height="50px"
            width="50px"/>
          <div className="myCarousel">
            <span>{ testimonial.rating }</span>
            <p>
              { testimonial.text }
            </p>
          </div>
        </div>
      ))}
    </>
  );	
}