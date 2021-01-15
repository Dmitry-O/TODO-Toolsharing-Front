import React, {useState} from 'react';
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
        <Card className="border border-primary h-100">
            <Link to={`/tools/${tool._id}`} style={{textDecoration: 'none'}}>
                <CardTitle className="text-warning"><h5>{tool.name}</h5></CardTitle>
                <CardBody className="col-12">
                    <CardImg src={baseUrl + tool.image} alt={tool.name}/>
                    <span class="badge badge-danger"><h5>${tool.price}/day</h5></span>
                </CardBody>
            </Link>
        </Card>
    );
}

function Tools(props) {
    const [search, handleSearch] = useState("");
    
    let filteredTools = props.tools.filter((tool) => {
            return tool.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );
    const tools = filteredTools.map((tool) => {
        return (
            <div key={tool._id} className="col-12 col-md-3 mt-3">
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
                    <Input type="text"
                            value={search}
                            onChange={event => handleSearch(event.target.value)}
                            name="search"
                            className="text-dark m-auto col-md-3"
                            placeholder="Tool search"/>
                </div>
                <div className="row justify-content-center">
                    {tools}
                </div>
            </div>
        </>
    );
}

export default Tools;