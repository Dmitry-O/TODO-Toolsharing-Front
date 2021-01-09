import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
//import { Loading } from './LoadingComponent';

function RenderWishlistItem({ tool, deleteWishlist }) {
    return(
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + tool.image} alt={tool.name} />
            </Media>
            <Media body className="ml-5 text-dark">
                <Media heading>{tool.name}</Media>
                <p>{tool.description}</p>
                <Button outline color="danger" onClick={() => deleteWishlist(tool._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>
        </Media>
    );
}

const Wishlist = (props) => {

    /*if (props.wishlist.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.favorites.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.favorites.errMess}</h4>
                </div>
            </div>
        )
    }*/
    if (props.wishlist) {

        const wishlist = props.wishlist.tools.map((tool) => {
            return (
                <div key={tool._id} className="col-12 col-md-6 mt-5">
                    <RenderWishlistItem tool={tool} deleteWishlist={props.deleteWishlist} />
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Wishlist</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>My Wishlist</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <Media list>
                        {wishlist}
                    </Media>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <h4>You have no tools in your Wishlist</h4>
                </div>
            </div>
        )
    }
}

export default Wishlist;