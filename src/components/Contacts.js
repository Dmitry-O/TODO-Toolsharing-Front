import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import {Link} from 'react-router-dom';

const Contacts = () => {
    return (
        <div className="container">
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contacts</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h4>Rental Department</h4>
                            <address>
                                <i class="fas fa-map-marker-alt"></i> Address: TX, Texas, Third street, 52b <br/>
                                <i className="fa fa-phone"></i> +107 588 5555<br />
                                <i className="fa fa-fax"></i> +107 588 7412<br />
                                <i className="fa fa-envelope"></i><a href="mailto:tool.sharing@gmail.com"> tool.sharing@gmail.com</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h4>Service Department</h4>
                        <address>
                            <i class="fas fa-map-marker-alt"></i> Address: TX, Texas, Third street, 52a <br/>
                            <i className="fa fa-phone"></i> +107 588 4444<br />
                            <i className="fa fa-fax"></i> +107 588 3333<br />
                            <i className="fa fa-envelope"></i><a href="mailto:tool.sharing@gmail.com"> tool.sharing.service@gmail.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-12 mt-2">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                    <div className="row ml-auto mr-auto map-responsive mt-5 mb-5 border border-primary">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.4723964609543!2d30.44422059031689!3d50.4509273860205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc25a6329ae9%3A0xed96cf4fc88bd039!2zS3l5aXZzyrlreXkgRWtvbm9taWNobnl5IEluc3R5dHV0IE1lbmVkemhtZW50dSwg0LLRg9C70LjRhtGPINCh0LzQvtC70LXQvdGB0YzQutCwLCAzMS8zMywg0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1587499294832!5m2!1sru!2sua" width="600" height="450" frameborder="0" style={{border: 0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                </div>
        </div>
    );
}

export default Contacts;