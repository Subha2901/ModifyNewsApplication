import React from 'react';
import '../App.css';


function ScrollToTopButton( {isVisible} ) {
  // const [isVisible, setIsVisible] = useState(true);

  // Add a scroll event listener to show/hide the button based on scroll position
  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log('window.scrollY -> ', window.scrollY);
  //     if (window.scrollY > 100) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(true);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const scrollToTop = () => {
    console.log('Scrolled to the top');
    console.log(document.getElementsByClassName('newsApp'))
    let element = document.getElementsByClassName('newsApp')
    console.log(element.scrollTop);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      Scroll to Top
    </button>
  );
}

export default ScrollToTopButton;
