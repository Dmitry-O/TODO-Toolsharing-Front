import React, {useState} from 'react';
import {Jumbotron, Button, Media} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';

const Home = (props) => {
    const items = [
        {
          src: "carousel_bg_1.jpg",
          altText: 'carousel_bg_1.jpg',
          caption: 'Very useful instruments'
        },
        {
          src: "carousel_bg_2.jpg",
          altText: 'carousel_bg_2.jpg',
          caption: 'Get what you want quickly'
        },
        {
          src: "carousel_bg_3.jpg",
          altText: 'carousel_bg_3.jpg',
          caption: 'We want you to make a great future with us!'
        }
      ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <Media className="col-12" style={{height: "600px"}} src={item.src} alt={item.altText} />
                <CarouselCaption className="text-dark" captionHeader={item.caption} />
            </CarouselItem>
        );
    });

        return (
            <>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
                <Jumbotron className="jumbo">
                    <div className="container">
                        <div className="row row-header">
                            <div className=" col-12 col-md-5 text-left">
                                <h5>
                                    <p className="jumbotext">We are looking forawd to see you again because
                                    you are so awesome person that i can't forget. We are looking forawd to see you again because
                                    you are so awesome person that i can't forget. We are looking forawd to see you again because
                                    you are so awesome person that i can't forget.</p>
                                    <br/>
                                    <p className="jumbotext">Breafly talking it's your opportunity to be with us
                                    via sharing your tools and instruments as long as you can do it!</p>
                                    <br/>
                                    <p className="jumbotext">Hoping we can be a good team to deal with your problems and see what will happens
                                    to you and to your family that we don't care of at all! :)</p>
                                </h5>
                            </div>
                            <div className="ml-5 pl-5 col-12 col-md-6">
                                    <Media src="tool_large.png"/>
                                    <Link to="/tools"><Button color="light" className="mt-5 pBtn">Pick up a tool</Button></Link>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container">
                    <h1 className="text-center text-dark">WHAT IS TOOL SHARING?</h1>
                    <hr className="hr1"/>
                    <h4 className="text-center text-dark">
                        Tool sharing is a service of renting tools, that our company is giving to you.
                        <br/>You can do whatever you want!
                    </h4>
                </div>
            </>
        );
}

export default Home;