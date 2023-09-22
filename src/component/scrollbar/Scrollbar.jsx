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
    const { mobile } = this.props;
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
        image: "assets/img/referral/Group_star.png",
        paragraph: 'I absolutely love this platform. Its so easy and user- friendly.Though my first time, it felt like second nature using it to transfer funds.I highly recommend it to anyone seeking a reliable and efficient money transfer service.'
      }, {
        heading: "Best on the market ",
        image: "assets/img/referral/Group_star1.png",
        paragraph: 'I have tried various international money transfer services, but RemitAssure truly stands out. Its user-friendly and the service is seamless. I certainly will use RemitAssure again.'
      }, {
        heading: "Best on the market",
        image: "assets/img/referral/Group_star.png",
        paragraph: 'RemitAssure is an execellent platform to use. I was taken aback by the speed at which my transfer was completed. It certainly beat my expectation'
      }, {
        heading: "Best on the market",
        image: "assets/img/referral/Group_star2.png",
        paragraph: 'RemitAssures exchange rates are amazing, certainly the best I have seen. For such an efficient and user-friendly service, they are are certainly value for money'
      }, {
        heading: "Best on the market",
        image: "assets/img/referral/Group_star.png",
        paragraph: 'I have tried several money transfer services, but RemitAssure has won me over.Their platform is easy to navigate, making the entire process smooth and hassle- free.RemitAssure has become my go - to choice for sending money internationally.'
      }, {
        heading: "Best on the market",
        image: "assets/img/referral/Group_star1.png",
        paragraph: 'I especially love the rigour of this platform and its focus on security and fraud prevention. Once onbaorded, one feels like this is a platform to be trusted for secure money transfer'
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
                  {/* <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" /> */}
                  <div className="each-review">
                    <div className="col-12 align-center">
                      {/* <span className="material-icons fw-light">{item.heading}</span> */}
                      <p className="material-heading fw-light">{item.paragraph}</p>
                    </div>
                    <div className="col-12 align-center">
                      <img src={item.image} alt="quote-up" className="testimonial-rating" />
                      {/* <img src="assets/img/home/boy.svg" alt="boy_icons" className="boy_icons" /> */}
                      {/* <img src="assets/img/referral/Group_star.png" alt="quote-up" className="testimonial-rating" /> */}
                    </div>

                  </div>
                  {/* <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" /> */}

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