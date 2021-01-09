import React from 'react';
import {Card, CardTitle, CardText, CardImg, CardBody, Breadcrumb, BreadcrumbItem, Input, Row, FormGroup, Label, Button} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import {Link} from 'react-router-dom';

function fetching() {
    fetch('http://localhost:3001/tools')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            alert(JSON.stringify(myJson));
    });
}

function RenderToolItem({tool}) {
    return(
        <Card>
            <Link to={`/tools/${tool._id}`} style={{textDecoration: 'none'}}>
                <CardTitle className="text-warning"><h4>{tool.name}</h4></CardTitle>
                <CardBody className="">
                    <CardImg src={baseUrl + tool.image} alt={tool.name}/>
                    <CardText className="text-danger">{tool.description}</CardText>
                </CardBody>
            </Link>
        </Card>
    );
}

const Tools = (props) => {
    const tools = props.tools.map((tool) => {
        return (
            <div key={tool._id} className="col-12 col-md-5 m-1">
                <RenderToolItem tool={tool} />
            </div>
        );
    })

    //alert(fetching());
    //console.log(fetching());

    return (
        <>
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Tools</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3 className="text-dark">Tools</h3>
                        <hr className="bg-primary"/>
                    </div>
                </div>
                <div className="row">
                    {tools}
                </div>
            </div>
        </>
    );
}

export default Tools;