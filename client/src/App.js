import React, { useState, useRef } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FetchNews from './Components/FetchNews'
import BackgorundImage from './Components/Images/Untitled-1.png'
import ContactUs from './Components/ContactUs';
import Alerts from './Components/Alerts';
import axios from 'axios'

export default function App() {

  let categoryValue = 'general'
  if (window.location.href.substring(22).length !== 0) categoryValue = window.location.href.substring(22);

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(categoryValue);
  const [isVisible, setIsVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [alert, setAlert] = useState(null);
  const [sortBy, setSortBy] = useState('publishedAt')

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() =>
            setAlert(null)
            , 1500)
    }



  let backGroundStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(136,44,1,0.9)), url(${BackgorundImage})`,
    backgroundColor: 'black',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    height: '100vh',
    overflow: 'scroll'
  }

  const divRef = useRef(null);

  const onClick = () => {
    divRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function handleRootScroll(event) {
    // console.log("Div is scrolled");

    const element = event.target;
    if (element.scrollTop > 1000 && !isVisible) setIsVisible(true);
    else if (element.scrollTop < 1000 && isVisible) setIsVisible(false);
    if ((element.scrollHeight - element.scrollTop) - element.clientHeight <= 10) {
      // console.log("Reached the end of the div.");

      setPage((page % 5) + 1);
      async function fetchPagewiseData() {
        try{
        console.log('fetchpagewisedata function is called');
        const serverResponse = await axios.get('http://localhost:5000/api/everything', {
          params: {
            category: category,
            page: page,
            sortBy: sortBy
          }
        });
        console.log(serverResponse);
        setNews([...news, ...serverResponse.data.articles])
      }catch(error){
          console.log(error + "While fetching next page data");
      }

      }

      fetchPagewiseData();

    }
  }

  function handleShareVisible() {
    setShareVisible(!shareVisible);

    setTimeout(() => setShareVisible(false), 5000);
  }
  
  document.title = 'News App - ' + category.substring(0,1).toUpperCase() + category.substring(1);


  return (
    <Router>
      <div className='newsApp' style={backGroundStyle} onScroll={handleRootScroll} ref={divRef}>
        <Header setLoading={setLoading} setCategory={setCategory} setPage={setPage} />
        <Alerts alert={alert} />
        <Routes >
          <Route exact path='/' element={<FetchNews page={page} category={category} loading={loading} setLoading={setLoading} news={news} setNews={setNews} sortBy={sortBy} setSortBy={setSortBy} />} />
          <Route exact path='/sports' element={<FetchNews page={page} category={category} loading={loading} setLoading={setLoading} news={news} setNews={setNews} sortBy={sortBy} setSortBy={setSortBy} />} />
          <Route exact path='/entertainment' element={<FetchNews page={page} category={category} loading={loading} setLoading={setLoading} news={news} setNews={setNews} sortBy={sortBy} setSortBy={setSortBy} />} />
          <Route exact path='/contactus' element={<ContactUs showAlert={showAlert} />} />
        </Routes>
        <a className={`button ${isVisible ? 'visible' : ''}`} onClick={onClick} style={{textDecoration: 'none'}}/>

        <button type="button" onClick={handleShareVisible} className='btn btn-primary contact-button' aria-describedby='Test Describe'>Contact Me</button>

        <div className={`btn-group-vertical ${shareVisible ? 'visible' : ''}`} role="group" aria-label="Vertical button group" style={{ zIndex: '1000', position: 'fixed', top: '50%', right: '41px', transform: 'translateY(29.5%)' }}>
          <button type="button" className="btn btn-primary" style={{ padding: '0px 6px' }} ><Link to='https://www.linkedin.com/in/subhamahajan' target='_blank' className='fa fa-linkedin-square' style={{ fontWeight: 'normal', textDecoration: 'none', fontStyle: 'normal', fontSize: '1.5em', lineHeight: '40px', color: '#fff' }} /></button>
          <button type="button" className="btn btn-primary" style={{ padding: '0px 6px' }} ><Link to='https://twitter.com/SUbha________' target='_blank' className='fa fa-twitter' style={{ fontWeight: 'normal', textDecoration: 'none', fontStyle: 'normal', fontSize: '1.5em', lineHeight: '40px', color: '#fff' }} /></button>
          <button type="button" className="btn btn-primary" style={{ padding: '0px 6px' }} ><Link to='https://www.instagram.com/subhajoker/' target='_blank' className='fa fa-instagram' style={{ fontWeight: 'normal', textDecoration: 'none', fontStyle: 'normal', fontSize: '1.5em', lineHeight: '40px', color: '#fff' }} /></button>
          <button type="button" className="btn btn-primary" style={{ padding: '0px 6px' }} ><Link to='https://www.facebook.com/mahajansubha' target='_blank' className='fa fa-facebook-square' style={{ fontWeight: 'normal', textDecoration: 'none', fontStyle: 'normal', fontSize: '1.5em', lineHeight: '40px', color: '#fff' }} /></button>
        </div>
        <Footer />
      </div>

    </Router>
  )
}
