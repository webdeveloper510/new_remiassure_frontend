import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  largescreen: {
    breakpoint: { max: 3000, min: 1367 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1366, min: 991 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 992, min: 450 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 450, min: 0 },
    items: 1,

  }
};

class Scrollbar extends React.Component {
  state = { additionalTransfrom: 0 };
  render() {
    const items = [
      {
        heading: "PHILIPPINES (PHP) ",
        image: "assets/img/home/country2.png"
      }, {
        heading: "Ghana (GHS) ",
        image: "assets/img/home/country3.png" 
       }, {
        heading: "Nigeria (USD)",
        image: "assets/img/home/country1.png"
      }, {
        heading: "Nigeria (NGN)",
        image: "assets/img/home/country1.png"
      }, {
        heading: "Kenya (KES)",
        image: "assets/img/home/country4.png"
      }, {
        heading: "THAILAND (THB)",
        image: "assets/img/home/country5.png"
      }, {
        heading: "VIETNAM (VND)",
        image: "assets/img/home/country6.png"
      }
    ];
    return (
     
 
      <Carousel
        ssr={false}
        ref={el => (this.Carousel = el)}
        partialVisible={false}
        //customButtonGroup={<CustomSlider />}
        itemClass="image-item"
        itemAriaLabel="Image-aria-label"
        responsive={responsive}
        containerClass="carousel-container-with-scrollbar"
        additionalTransfrom={-this.state.additionalTransfrom}
        beforeChange={nextSlide => {
          if (nextSlide !== 0 && this.state.additionalTransfrom !== 120) {
            this.setState({ additionalTransfrom: -0 });
          }
          if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
            this.setState({ additionalTransfrom: 0 });
          }
        }}
      >
   
    
        {
          items?.map(item => {
            return (
              <div class="flags-container">

                <div class="image-container-text" draggable={false} >
                 
                    <div className="row items-start">
                    <img src={item.image} alt="quote-up"/>
                    <label>{item.heading}</label>
                    </div>

                

                </div>

              </div>
            )
          })
        }
      </Carousel>
    );
  }
}

export default Scrollbar;