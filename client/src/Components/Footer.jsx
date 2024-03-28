import React from 'react'
import {Link} from 'react-router-dom'
import Logo from './Images/Logo.png'

export default function Footer() {
  return (
    <div>
      <div className="container" style={{color: 'black'}}>
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <img src={Logo} className="bi" width="30" height="24"></img>
      </a>
      <span className="mb-3 mb-md-0">&copy; 2023 Copyright Act</span>
      <span className='mb-3 mb-md-0' style={{paddingLeft: '10px', color: 'white'}}>Subha Mahajan</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
    <li className="ms-3"><Link to='https://www.linkedin.com/in/subhamahajan' target='_blank' className='fa footer-icon fa-linkedin-square' /></li>
      <li className="ms-3"><Link to='https://twitter.com/SUbha________' target='_blank' className='fa footer-icon fa-twitter' /></li>
      <li className="ms-3"><Link to='https://www.instagram.com/subhajoker/' target='_blank' className='fa footer-icon fa-instagram' /></li>
      <li className="ms-3"><Link to='https://www.facebook.com/mahajansubha' target='_blank' className='fa footer-icon fa-facebook-square' /></li>
    </ul>
  </footer>
</div>
    </div>
  )
}
