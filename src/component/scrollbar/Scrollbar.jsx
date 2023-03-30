import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class Scrollbar extends React.Component {
  state = { additionalTransfrom: 0 };
  render() {
    //const { deviceType } = this.props;
    const CustomSlider = ({ carouselState }) => {
      let value = 0;
      let carouselItemWidth = 0;
      if (this.Carousel) {
        carouselItemWidth = this.Carousel.state.itemWidth;
        const maxTranslateX = Math.round(
          // so that we don't over-slide
          carouselItemWidth *
            (this.Carousel.state.totalItems -
              this.Carousel.state.slidesToShow) +
            150
        );
        value = maxTranslateX / 100; // calculate the unit of transform for the slider
      }
      const { transform} = carouselState;
      return (
        <div className="custom-slider">
          <input
            type="range"
            value={Math.round(Math.abs(transform) / value)}
            defaultValue={0}
            max={
              (carouselItemWidth *
                (carouselState.totalItems - carouselState.slidesToShow) +
                (this.state.additionalTransfrom === 150 ? 0 : 150)) /
              value
            }
            onChange={e => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false;
              }
              const nextTransform = e.target.value * value;
              const nextSlide = Math.round(nextTransform / carouselItemWidth);
              if (
                e.target.value === 0 &&
                this.state.additionalTransfrom === 150
              ) {
                this.Carousel.isAnimationAllowed = true;
                this.setState({ additionalTransfrom: 0 });
              }
              this.Carousel.setState({
                transform: -nextTransform, // padding 20px and 5 items.
                currentSlide: nextSlide
              });
            }}
            className="custom-slider__input"
          />
        </div>
      );
    };
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
          if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
            this.setState({ additionalTransfrom: 150 });
          }
          if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
            this.setState({ additionalTransfrom: 0 });
          }
        }}
      >


        <div class="image-container increase-size">

          <div class="image-container-text" draggable={false}>
          <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" />
       <div className="row">
         <div className="col-lg-4">
         <img src="assets/img/home/boy.svg" alt="boy_icons" className="boy_icons"/>
         <p className="boy_icons_text">Worldtraveler</p>
         </div>
         <div className="col-8">
         <span className="material-icons">Best on the market 1.</span>
          <p className="material-heading">1.B.At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...</p>
          <img src="assets/img/help/star.png" alt="quote-up"/>
 
         </div>
       </div>
       <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" />
  
          </div>
		 
        </div>
       <div class="image-container increase-size">

          <div class="image-container-text" draggable={false}>
          <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" />
       <div className="row">
         <div className="col-lg-4">
         <img src="assets/img/home/boy.svg" alt="boy_icons" className="boy_icons"/>
         <p className="boy_icons_text">Worldtraveler</p>
         </div>
         <div className="col-8">
         <span className="material-icons">Best on the market 2.</span>
          <p className="material-heading">2.B.At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...</p>
          <img src="assets/img/help/star.png" alt="quote-up"/>
 
         </div>
       </div>
       <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" />
  
          </div>
		 
        </div>
		
				<div class="image-container increase-size">

          <div class="image-container-text" draggable={false}>
          <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" />
       <div className="row">
         <div className="col-lg-4">
         <img src="assets/img/home/boy.svg" alt="boy_icons" className="boy_icons"/>
         <p className="boy_icons_text">Worldtraveler</p>
         </div>
         <div className="col-8">
         <span className="material-icons">Best on the market 3.</span>
          <p className="material-heading">3.B.At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...</p>
          <img src="assets/img/help/star.png" alt="quote-up"/>
 
         </div>
       </div>
       <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" />
  
          </div>
		 
        </div>

       <div class="image-container increase-size">

          <div class="image-container-text" draggable={false}>
          <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" />
       <div className="row">
         <div className="col-lg-4">
         <img src="assets/img/home/boy.svg" alt="boy_icons" className="boy_icons"/>
         <p className="boy_icons_text">Worldtraveler</p>
         </div>
         <div className="col-8">
         <span className="material-icons">Best on the market 4.</span>
          <p className="material-heading">4.B.At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...</p>
          <img src="assets/img/help/star.png" alt="quote-up"/>
 
         </div>
       </div>
       <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" />
  
          </div>
		 
        </div>

       <div class="image-container increase-size">

          <div class="image-container-text" draggable={false}>
          <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" />
       <div className="row">
         <div className="col-lg-4">
         <img src="assets/img/home/boy.svg" alt="boy_icons" className="boy_icons"/>
         <p className="boy_icons_text">Worldtraveler</p>
         </div>
         <div className="col-8">
         <span className="material-icons">Best on the market 5.</span>
          <p className="material-heading">5.B.At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...</p>
          <img src="assets/img/help/star.png" alt="quote-up"/>
 
         </div>
       </div>
       <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" />
  
          </div>
		 
        </div>

        <div class="image-container increase-size">

          <div class="image-container-text" draggable={false}>
          <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" />
       <div className="row">
         <div className="col-lg-4">
         <img src="assets/img/home/boy.svg" alt="boy_icons" className="boy_icons"/>
         <p className="boy_icons_text">Worldtraveler</p>
         </div>
         <div className="col-8">
         <span className="material-icons">Best on the market 6.</span>
          <p className="material-heading">6.B.At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...</p>
          <img src="assets/img/help/star.png" alt="quote-up"/>
 
         </div>
       </div>
       <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" />
  
          </div>
		 
        </div>
      </Carousel>
    );
  }
}

export default Scrollbar;