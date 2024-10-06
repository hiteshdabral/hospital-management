import React from 'react'

const Hero = ({title,imageUrl}) => {
  return (
    <div className='hero container'>
        <div className='banner'>
            <h1>{title}</h1>
            <p>
    Welcome to your <b>Namma hospital!</b> We are dedicated to providing the highest quality healthcare services to our community. Our team of experienced professionals is here to ensure your well-being and comfort. Contact us today to learn more about our services and how we can assist you.
            </p>
        </div>
        <div className='banner'>
            <img src={imageUrl} alt="hero " className='animated-image' />
            <span>
                <img src="/Vector.png" alt="vector" />
            </span>
        </div>
    </div>
  )
}

export default Hero