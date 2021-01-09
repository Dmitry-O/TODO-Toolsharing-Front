import React from 'react';
import {Jumbotron, Button, Media} from 'reactstrap';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <>
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
                                    <p className="jumbotext">Hoping we can be a good team to lead your problems and see what will happens
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
}

export default Home;