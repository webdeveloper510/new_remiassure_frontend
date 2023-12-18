import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const Partners = () => {
  const carouselRef = useRef(null);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 992, min: 450 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 450, min: 0 },
      items: 3,
    },
  };

  const CustomSlider = ({ carouselState }) => {
    // ... your CustomSlider component content
  };

 const items = [
      {
      
        image: "assets/img/home/image1.png",
       
      },   {
        image: "assets/img/home/image22.png",
      },
      {
        image: "assets/img/home/image2.png",
      },
      {
        image: "assets/img/home/image3.png",
      },
      {
        image: "assets/img/home/image4.png",
      },
      {
        image: "assets/img/home/image5.png",
      },
      
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
    <div>

      
      <Carousel
        ssr={false}
        ref={carouselRef}
        partialVisible={false}
        responsive={responsive}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={-0}
        // customButtonGroup={<CustomSlider />}
        beforeChange={(nextSlide) => {
          // ... your beforeChange logic
        }}
      >
        {items?.map((item) => {
          return (
            <div class="partners">

                <div class="image-container-text" draggable={false}>
			
                  <div className="">
                    <div className="">
                        <img src={item.image} alt="quote-up" className="vs" /></div>
                  
              
             



                  
				  </div>
                  {/* <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" /> */}
                  
                  {/* <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" /> */}

                </div>

              </div>
          );
        })}
      </Carousel>

    
    </div>
  );
};

export default Partners;
