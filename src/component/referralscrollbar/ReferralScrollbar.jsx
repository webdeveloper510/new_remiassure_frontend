import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 992, min: 450 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 450, min: 0 },
    items: 1,

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
      const { transform } = carouselState;
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
    const items = [
      {
        heading: "Best on the market ",
        paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
      }, {
        heading: "Best on the market ",
        paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
      }, {
        heading: "Best on the market",
        paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
      }, {
        heading: "Best on the market",
        paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
      }, {
        heading: "Best on the market",
        paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
      }, {
        heading: "Best on the market",
        paragraph: 'At ultrices mi tempus imperdiet nulla. Risus nullam eget felis eget nunc lobortis. Fusce id velit ut tortor pretium viverra suspendisse...'
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
          if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
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
              <div class="image-container increase-size">
                <div class="image-container-text" draggable={false}>
                  <img src="assets/img/referral/Group.svg" alt="quote-up" className="Group_icons" />
                  <div className="row">
                    <div className="col-md-12">
                      <div class="testimonial-text">
                        <p className="material_heading_card">{item.paragraph}</p>
                        <img src="assets/img/referral/Group_star.png" alt="group_card" class="group_card_icon" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-lg-12 testimonial-client">
                      <div class="testimonial-inner">
                        <img src="assets/img/referral/girl.svg" alt="boy_icons" className="testimonial-icons" />
                        <h3 className="kevin_content">Kevin Rich</h3>
                        <p className="testimonial_icons_text">{item.heading}</p>
                      </div>
                    </div>
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