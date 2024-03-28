import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import Loading from './Loading';
import BreakingNewsCarousel from './BreakingNewsCarousel';
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Dropdown from './Dropdown';

export default function FetchNews(props) {
  const [breakingNews, setBreakingNews] = useState([]);
  
  function getCurrentDimension() {
    return {
      width: window.innerWidth
    }
  }

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function newsDate(date) {
    const inputDate = new Date(date);
    const day = inputDate.getDate();
    const month = inputDate.toLocaleDateString('en-US', { month: 'long' });
    const year = inputDate.getFullYear();
    let formattedDate;

    if (day === new Date().getDate() - 1) formattedDate = 'Yesterday'

    else {
      function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
          return 'th';
        }
        switch (day % 10) {
          case 1:
            return 'st';
          case 2:
            return 'nd';
          case 3:
            return 'rd';
          default:
            return 'th';
        }
      }

      formattedDate = `${day}${getDaySuffix(day)} ${month},${year}`
    }

    return formattedDate
  }

  function formattedTime(time) {
    let formattedTime;
    if (time.substr(0, 2) > 12) {
      formattedTime = time.substr(0, 2) - 12;
      formattedTime += time.substr(2, 3) + 'PM';
    }
    else {
      formattedTime = time + 'AM';
    }

    return formattedTime
  }


  useEffect(() => {
    async function fetchData() {
      try {
        setScreenSize(getCurrentDimension())

        const serverResponse = await axios.get('http://localhost:5000/api/everything', {
          params: {
            category: props.category,
            page: props.page,
            sortBy: props.sortBy
          }
        });
        props.setNews(serverResponse.data.articles.filter((value) => value.title.search('Removed') <= -1))

        const serverResponseBreakingNews = await axios.get('http://localhost:5000/api/top-headlines', {
          params: {
            category: props.category,
            page: props.page,
            sortBy: props.sortBy
          }
        });
        setBreakingNews(serverResponseBreakingNews.data.articles.filter((value) => value.title.search('Removed') <= -1).slice(0, 10))
        console.log(breakingNews);

        props.setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(); // Call fetchData when category changes
  }, [props.category, props.sortBy]);


  return (
    <>
      {props.loading ? (
        <div style={{ minHeight: '800px' }}><Loading /></div> // Show a loading indicator while loading
      ) : (
        <>
          <div className='container breakingNewsContainer'>
            <Carousel autoPlay={false}
              infiniteLoop
              centerMode
              interval={1000}
              showStatus={false}
              showThumbs={false}>
              {
                breakingNews.map((value, index) => {
                  return (
                    <BreakingNewsCarousel key={index} index={index} imgUrl={value.urlToImage} title={value.title} desc={value.description} url={value.url} publishedAt={newsDate(value.publishedAt.substr(0, 10)) === 'Yesterday' ? 'Yesterday, ' + formattedTime(value.publishedAt.substr(11, 5)) : newsDate(value.publishedAt.substr(0, 10))} source={value.source.name} />
                  )
                })
              }
            </Carousel>
          </div>

          <div className="album py-5 bg-opacity-25">
            <div className="container" style={{ padding: '0 10%' }}>
            <Dropdown setSortBy={props.setSortBy} setLoading={props.setLoading} />
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                {
                  props.news.map((value, index) =>
                    value.title && <NewsCard key={index} index={index} screenSize={screenSize} title={value.title} desc={value.description} url={value.url} imgUrl={value.urlToImage === null ? 'https://media.istockphoto.com/id/1174341252/photo/newspaper-with-the-headline-news-and-glasses-and-coffee-cup-on-wooden-table-daily-newspaper.webp?b=1&s=170667a&w=0&k=20&c=AmkbAgTLnDaJrWB5yWksmD9H5HZQ4DsixbPaDheEcmw=' : value.urlToImage} publishedAt={newsDate(value.publishedAt.substr(0, 10)) === 'Yesterday' ? 'Yesterday, ' + formattedTime(value.publishedAt.substr(11, 5)) : newsDate(value.publishedAt.substr(0, 10))} source={value.source.name} />)
                }
              </div>
            </div>
          </div>
        </>
      )
      }
    </>
  )
}
