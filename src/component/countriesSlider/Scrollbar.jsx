import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const Scrollbar = () => {
  const carouselRef = useRef(null);

  const responsive = {
    largescreen: {
      breakpoint: { max: 3000, min: 1367 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 992, min: 450 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 450, min: 0 },
      items: 1,
    },
  };

  const CustomSlider = ({ carouselState }) => {
    // ... your CustomSlider component content
  };

  const items = [
    {
      heading: "Philippines ",
      abbreviation:"(PHP)",
      image: "assets/img/home/country2.png"
    }, {
      heading: "Ghana  ",
      abbreviation:"(GHS)",
      image: "assets/img/home/country3.png" 
     }, {
      heading: "Nigeria ",
      abbreviation:"(USD)",
      image: "assets/img/home/country1.png"
    }, {
      heading: "Kenya ",
      abbreviation:"(KES)",
      image: "assets/img/home/country4.png"
    }, {
      heading: "Thailand ",
      abbreviation:"(THB)",
      image: "assets/img/home/country5.png"
    }, {
      heading: "Vietnam ",
      abbreviation:"(VND)",
      image: "assets/img/home/country6.png"
    }, {
      heading: "Nigeria ",
      abbreviation:"(NGN)",
      image: "assets/img/home/country1.png"
    }
  ];

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  return (
    <div className="custome-country">
      <div className="custom-button-group country-slider-arrow for-desk">
        <button onClick={handlePrev} class="pre-sli"><img src="assets/img/home/skyiconarrow.png"/></button>
        <button onClick={handleNext} class="next-sli"><img src="assets/img/home/bluearrow.png"/></button>
      </div>
      <Carousel
        ssr={false}
        ref={carouselRef}
        partialVisible={false}
        responsive={responsive}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={-0}
        itemClass="image-item"
        // customButtonGroup={<CustomSlider />}
        beforeChange={(nextSlide) => {
          // ... your beforeChange logic
        }}
      >
        {items?.map((item, index) => {
          return (

            <div class="flags-container">

            <div class="image-container-text" draggable={false} >
             
                <div className="row items-start">
                <img src={item.image} alt="quote-up"/>
                <label>{item.heading} <b> {item.abbreviation}</b></label>
                </div>

            

            </div>

          </div>
          );
        })}
      </Carousel>
      <div className="custom-button-group country-slider-arrow for-mobilee">
        <button onClick={handlePrev} class="pre-sli"><img src="assets/img/home/skyiconarrow.png"/></button>
        <button onClick={handleNext} class="next-sli"><img src="assets/img/home/bluearrow.png"/></button>
      </div>
      
    </div>
  );
};

export default Scrollbar;
