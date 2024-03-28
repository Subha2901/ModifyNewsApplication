import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Images/Logo.png'

export default function Header(props) {
  const [search, setSearch] = useState('');

  const handleLoading = function (event) {
    props.setLoading('true');
    props.setCategory(event.target.getAttribute('href').substr(1).length === 0 ? 'general' : event.target.getAttribute('href').substr(1));
    props.setPage(1);
  }

  const handleSearch = function (event) {
    event.preventDefault();

    console.log(search);
    props.setLoading('true');
    props.setCategory(search.length === 0 ? 'general' : search);
    props.setPage(1);
  }

  function handleInput(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{ paddingLeft: '20%', paddingTop: '10px' }}>
        <div className="container-fluid">
          <div className="navbar-brand">
            <img src={Logo} alt="Logo" width="40" height="auto" className="d-inline-block align-text-top" />
            <span className='h5' style={{ fontFamily: 'cursive', fontWeight: '600' }}> News App </span>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" onClick={handleLoading}>All</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/sports' onClick={handleLoading}>Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/entertainment' onClick={handleLoading}>Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-disabled="true" to='/contactus' onClick={handleLoading}>Contact Us</Link>
              </li>
              <form className="d-flex header-from" role="search" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleInput} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
