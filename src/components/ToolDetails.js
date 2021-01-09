import React from 'react';
import {baseUrl} from '../shared/baseUrl';
import {Link} from 'react-router-dom';
import {Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay, Button, Breadcrumb, BreadcrumbItem} from 'reactstrap';

function RenderTool({tool, wishlist, postWishlist}) {
    return (
        <div className="toolDetail">
             <Card>
                <CardImg top src={baseUrl + tool.image} alt={tool.name} />
                <CardImgOverlay>
                    <Button outline color="primary" onClick={() => wishlist ? console.log('Already added to wishlist') : postWishlist(tool._id)}>
                        {wishlist ?
                            <span className="fa fa-heart"></span>
                            : 
                            <span className="fa fa-heart-o"></span>
                        }
                    </Button>
                </CardImgOverlay>
                <CardBody>
                    <CardTitle>{tool.name}</CardTitle>
                    <CardText>{tool.description}</CardText>
                </CardBody>
            </Card>
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
            <div className="row col-12 col-md-6 m-1 justify-self-center">
                <RenderTool tool={props.tool} wishlist={props.wishlist} postWishlist={props.postWishlist}/>
            </div>
        </div>
    );
}

export default ToolDetails;