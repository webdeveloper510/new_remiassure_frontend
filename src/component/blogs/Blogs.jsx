import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const Blogs = () => {
  const carouselRef = useRef(null);

  const responsive = {
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
        date:"23rd Feb 2023",
        dateicon:"assets/img/home/dateicon.png",
        author: "assets/img/home/Shape-2.png",
        heading: "Lorem Ipsum",
        link: '/link1', // Add the link property
        image: "assets/img/referral/Group_star1.png",
        paragraph: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.'
      },   {
        date:"23rd Feb 2023",
        dateicon:"assets/img/home/dateicon.png",
        author: "assets/img/home/Shape-2.png",
        heading: "Lorem Ipsum",
        link: '/link1', // Add the link property
        image: "assets/img/referral/Group_star1.png",
        paragraph: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.'
      },
      {
        date:"23rd Feb 2023",
        dateicon:"assets/img/home/dateicon.png",
        author: "assets/img/home/Shape-2.png",
        heading: "Lorem Ipsum",
        link: '/link1', // Add the link property
        image: "assets/img/referral/Group_star1.png",
        paragraph: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.'
      },
      {
        date:"23rd Feb 2023",
        dateicon:"assets/img/home/dateicon.png",
        author: "assets/img/home/Shape-2.png",
        heading: "Lorem Ipsum",
        link: '/link1', // Add the link property
        image: "assets/img/referral/Group_star1.png",
        paragraph: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.'
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
            <div class="blogs">

                <div class="image-container-text" draggable={false}>
				<div className="row">
                  <div className="col-md-12">
                    <div className="blogimag"><img src={item.author} alt="quote-up" className="bloggim" /></div>
                  
                  </div>
                  <div className="date">
<div className="date-icon">
<img src={item.dateicon} alt="quote-up" className="" />
</div>
 
<div className="dattenum">
{item.date}
</div>           </div>
<div className="blogheading">
    <h3>{item.heading}</h3>

</div>
<div className="bloginfo">
    <p>{item.paragraph}</p>

</div>
<div className="Morelink">
<a href="{item.link}">
  MORE. <img src="assets/img/home/arrowmore.png">

  </img>
</a>
</div>
                  
				  </div>
                  {/* <img src="assets/img/home/quote-up.svg" alt="quote-up" className="quotup_icons" /> */}
                  
                  {/* <img src="assets/img/home/quote-down.svg" alt="quote-up" className="quotdown_icons" /> */}

                </div>

              </div>
          );
        })}
      </Carousel>

      <div className="custom-button-group">
        <button onClick={handlePrev} class="pre-sli"><img src="assets/img/home/arrow1 (1).png"/></button>
        <button onClick={handleNext} class="next-sli"><img src="assets/img/home/nextsli.png"/></button>
      </div>
    </div>
  );
};

export default Blogs;
