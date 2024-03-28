import React from 'react'
import { Link } from 'react-router-dom';

export default function BreakingNewsCarousel({ index, imgUrl, title, publishedAt, source, url }) {
  let imageURL = imgUrl;
  if (!imgUrl) {
    imageURL = 'https://www.typeroom.eu/assets/original/2022/09/14/the%20verge%20redesign%202022%203.png'
  }



  return (
    <>
      <div>
        <img src={imageURL} className='breakingNewsImage' alt='...' />
        <Link to={url} target='_blank' >
          <div className="carousel-caption breakingCSS" style={{ backgroundColor: 'black', padding: '2% 5% 3.5%', bottom: '10px' }}>
            <h5 style={{ fontSize: '100%' }}>{title}</h5>
            {/* <p style={{ fontSize: '0.5rem', fontFamily: 'monospace', fontWeight: '200' }}>{desc}</p> */}
          </div>
        </Link>
      </div>
      

    </>
  )
}
