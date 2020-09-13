import React, { useEffect, useState } from 'react';	

export default () => {	
  const [status, setStatus ] = useState('loading...');	
  const [testimonials, setTestimonials] = useState(null);	

  return (	
    <main>	
      <h1>Testimonials to load here...</h1>	
    </main>	
  )	
}