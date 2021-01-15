import React, {useState} from 'react';
import {baseUrl} from '../shared/baseUrl';
import {Link} from 'react-router-dom';
import {Card, CardImg, CardBody, CardTitle, 
    CardText, CardImgOverlay, Button, Breadcrumb, 
    BreadcrumbItem, Modal, ModalHeader, ModalBody,
    Table, Input, Label, InputGroup, Row, Col} from 'reactstrap';
import {discounts} from '../shared/discounts';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
//const minLength = (len) => (val) => (val) && (val.length >= len);
//const isNumber = (val) => !isNaN(Number(val));
//const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function RenderTool({tool, wishlist, postWishlist, postRentedTools, user}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    
    const [values, handleSubmit] = useState({numberOfUnits: 1, numberOfDays: 1, totalAmount: 0, toolInfo: {}, startDate: '', expirationDate: ''});

    const toggle = () => setModalOpen(prevState => !prevState);
    const toggle2 = () => setModal2Open(prevState => !prevState);

    const handlePurchase = () => {
        if (values.numberOfDays <= 0)
            alert("Expiration Date must be greater than Start Date!");
        else {
            if (user.firstname && user.lastname && user.email && user.telnum && user.username) {
                //alert(JSON.stringify(values));
                postRentedTools(values);
            }
            else setModal2Open(true);
        }
        
    };

    function minDate(start) {
        var date = start === '' ? ('0' + new Date().getDate()).slice(-2) : ('0' + new Date(start).getDate()).slice(-2);
        var first = new Date().getUTCFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + "-" + ('0' + new Date().getDate()).slice(-2);
        var second = new Date().getUTCFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (+date+1);
        return {
            firstMin: first,
            secondMin: second
        };
    };

    return (
        <div className="toolDetail container">
            <div className="row">
            <Card className="border border-dark col-12 col-md-6">
                <CardTitle className="text-primary"><h4>{tool.name}</h4></CardTitle>
                <CardImg top src={baseUrl + tool.image} alt={tool.name} />
                <div className="row justify-content-center mb-3">
                    <Button outline color="primary" onClick={() => wishlist ? console.log('Already added to wishlist') : postWishlist(tool._id)}>
                        {wishlist ?
                            <span className="fa fa-heart"></span>
                            : 
                            <span className="fa fa-heart-o"></span>
                        }
                    </Button>
                    <Button className="ml-2 bg-success" onClick={toggle}>Get this tool</Button>
                    <span class="badge badge-danger ml-2"><h5>${tool.price}/day</h5></span>
                </div>
            </Card>
            <div className="col-12 col-md-6">
                {tool.description}
            </div>
            </div>
            <Modal isOpen={modalOpen} toggle={toggle}>
                <ModalHeader className="text-dark">
                    Renting the tool
                </ModalHeader>
                <ModalBody className="text-dark">
                    <h4>Tool name: {tool.name}</h4>
                    <InputGroup>
                        <Label htmlFor="startDate" className="col-4">Start Date</Label>
                        <Input name="startDate" type="date" className="col-4 ml-2"
                            min={minDate(values.startDate).firstMin}
                            value={values.startDate}
                            onFocus={event => event.target.blur()}
                            onChange={event => {
                                let days = (new Date(values.expirationDate).getTime() - new Date(event.target.value).getTime())/(1000*60*60*24);
                                handleSubmit({numberOfUnits: values.numberOfUnits, numberOfDays: days, totalAmount: values.totalAmount, toolInfo: values.toolInfo, startDate: event.target.value, expirationDate: values.expirationDate})
                                }}/>
                    </InputGroup>
                    <InputGroup className="mt-2">
                        <Label htmlFor="expirationDate" className="col-4">Expiration Date</Label>
                        <Input name="expirationDate" type="date" className="col-4 ml-2"
                            value={values.expirationDate}
                            min={minDate(values.startDate).secondMin}
                            onFocus={event => event.target.blur()}
                            onChange={event => {
                                let days = (new Date(event.target.value).getTime() - new Date(values.startDate).getTime())/(1000*60*60*24);
                                handleSubmit({numberOfUnits: values.numberOfUnits, numberOfDays: days, totalAmount: values.totalAmount, toolInfo: values.toolInfo, startDate: values.startDate, expirationDate: event.target.value})
                                }}/>
                    </InputGroup>
                    <InputGroup className="mt-2">
                        <Label htmlFor="numberOfUnits" className="col-4">Number of Units</Label>
                        <Input name="numberOfUnits" type="number" defaultValue="1"
                            min={1} max={50} className="col-2 ml-5" value={values.numberOfUnits}
                            onChange={event => {
                                let days = (new Date(values.expirationDate).getTime() - new Date(values.startDate).getTime())/(1000*60*60*24);
                                handleSubmit({numberOfUnits: +event.target.value, numberOfDays: days, totalAmount: discounts(+event.target.value, days, tool.price) * +event.target.value, toolInfo: tool, startDate: values.startDate, expirationDate: values.expirationDate});
                                }}/>
                    </InputGroup>
                    Num of days {values.numberOfDays ? values.numberOfDays : ''}
                    
                    <h4>Initial price ${tool.price}/1 unit</h4>
                    <h4>Price with Discounts ${discounts(values.numberOfUnits, 
                        (new Date(values.expirationDate).getTime() - new Date(values.startDate).getTime())/(1000*60*60*24),
                        tool.price)}/1 unit</h4>
                    <h4>Total Amount ${discounts(values.numberOfUnits, 
                        (new Date(values.expirationDate).getTime() - new Date(values.startDate).getTime())/(1000*60*60*24),
                        tool.price) * values.numberOfUnits}</h4>
                    <div className="row justify-content-center">
                        <Button color="danger mr-1" onClick={toggle}>Cancel</Button>
                        <Button color="success ml-1" onClick={handlePurchase}>Purchase</Button>
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={modal2Open} toggle={toggle2}>
                <ModalBody>
                    <h3 className="text-dark text-center">
                        At first you have to give us all information to create an order
                        Please, fill in your account info
                    </h3>
                    <div className="row justify-content-center mt-3">
                        <Link to="/account" style={{textDecoration: "none"}}>
                            <Button color="primary">
                                Go to My Account
                            </Button>
                        </Link>
                    </div>
                </ModalBody>
            </Modal>
        </div>    
    );
}

const ToolDetails = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/tools'>Tools</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.tool.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row col-12 justify-self-center">
                <RenderTool tool={props.tool} wishlist={props.wishlist}
                postWishlist={props.postWishlist} postRentedTools={props.postRentedTools}
                user={props.account}/>
            </div>
            <div className="row">
                <div className="table-responsive bg-light border border-dark mt-5">
                    <Table striped>
                        <thead class="thead-dark">
                            <tr>
                                <th>Number of units</th>
                                <th>1 Day+/unit</th>
                                <th>1 Week+/unit</th>
                                <th>1 Month+/unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>${discounts(1, 1, props.tool.price)}</td>
                                <td>${discounts(1, 7, props.tool.price)}</td>
                                <td>${discounts(1, 30, props.tool.price)}</td>
                            </tr>
                            <tr>
                                <th>2-5</th>
                                <td>${discounts(2, 1, props.tool.price)}</td>
                                <td>${discounts(2, 7, props.tool.price)}</td>
                                <td>${discounts(2, 30, props.tool.price)}</td>
                            </tr>
                            <tr>
                                <th>6-10</th>
                                <td>${discounts(6, 1, props.tool.price)}</td>
                                <td>${discounts(6, 7, props.tool.price)}</td>
                                <td>${discounts(6, 30, props.tool.price)}</td>
                            </tr>
                            <tr>
                                <th>11-50</th>
                                <td>${discounts(11, 1, props.tool.price)}</td>
                                <td>${discounts(11, 7, props.tool.price)}</td>
                                <td>${discounts(11, 30, props.tool.price)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ToolDetails;