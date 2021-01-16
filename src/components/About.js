import React from 'react';
import {CardHeader, Card, CardBody, Table} from 'reactstrap';

const About = () => {
    return (
        <div className="container">
            <h1>About</h1>

            <div className="row justify-content-center">
                <div className="col-12 col-md-5 mr-1">
                    <h3>What do we do?</h3>
                    
                    <h5>Our company proposes to clients at first a new understadning
                        of usage items. This time you don't have to buy a tool that you'll
                        use just for one time and then it'll lie collecting dust on the shelf.
                        Insted you just can rent a tool for a term you need it and this will be cheaper
                        than pay the full amount and then this tool will take up the entire space in your garage.
                    </h5>
                </div>
                <div className="col-12 col-md-5 ml-1">
                <Card>
                    <CardHeader className="bg-primary text-white">
                        Facts at a Glance
                    </CardHeader>
                    <CardBody>
                        <dl class="row">
                            <dt className="col-6">Started</dt>
                            <dd className="col-6">3 Feb. 2020</dd>
                            <dt className="col-6">Major Stake Holder</dt>
                            <dd className="col-6">HK Fine Foods Inc.</dd>
                            <dt className="col-6">Last Year's Turnover</dt>
                            <dd className="col-6">$1,250,375</dd>
                            <dt className="col-6">Employees</dt>
                            <dd className="col-6">40</dd>
                        </dl>
                    </CardBody>
                </Card>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <h1>This table shows our discount system</h1>
                <div className="table-responsive bg-light border border-dark">
                    <Table striped>
                        <thead class="thead-dark">
                            <tr>
                                <th>Number of units</th>
                                <th>1 Day+/each unit</th>
                                <th>1 Week+/each unit</th>
                                <th>1 Month+/each unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>0%</td>
                                <td>10%</td>
                                <td>20%</td>
                            </tr>
                            <tr>
                                <th>2-5</th>
                                <td>5%</td>
                                <td>15%</td>
                                <td>25%</td>
                            </tr>
                            <tr>
                                <th>6-10</th>
                                <td>15%</td>
                                <td>25%</td>
                                <td>35%</td>
                            </tr>
                            <tr>
                                <th>11-50</th>
                                <td>25%</td>
                                <td>35%</td>
                                <td>45%</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <h1 className="mt-5">Our achievments</h1>
            <div className="mt-3 row justify-content-center" style={{textAlign: "justify"}}>
                <div className="mr-5 p-1 bg-danger rounded-circle text-center border border-dark" style={{width: "11%", display: "inline-block", textAlign: "left"}}>
                    <h2 className="mt-2 text-light font-weight-bold">
                        5+
                        <br/>
                    </h2>
                    <h5 className="text-light">
                        years in the
                        <br/>
                        market
                    </h5>
                </div>
                <div className="ml-5 mr-5 p-1 bg-warning rounded-circle text-center border border-dark" style={{width: "11%", display: "inline-block", textAlign: "left"}}>
                    <h2 className="mt-2 text-light font-weight-bold">
                        10+
                        <br/>
                    </h2>
                    <h5 className="text-light">
                        business
                        <br/>
                        partners
                    </h5>
                </div>
                <div className="ml-5 mr-5 p-1 bg-success rounded-circle text-center border border-dark" style={{width: "11%", display: "inline-block", textAlign: "left"}}>
                    <h2 className="mt-2 text-light font-weight-bold">
                        +7K
                        <br/>
                    </h2>
                    <h5 className="text-light">
                        new clients
                        <br/>
                        last year
                    </h5>
                </div>
                <div className="ml-5 p-1 bg-primary rounded-circle text-center border border-dark" style={{width: "11%", display: "inline-block", textAlign: "left"}}>
                    <h2 className="mt-2 text-light font-weight-bold">
                        $1 mil.
                        <br/>
                    </h2>
                    <h5 className="text-light">
                        dollars per
                        <br/>
                        1 month
                    </h5>
                </div>
            </div>
        </div>
    )
};

export default About;