import React from 'react';
import {Media, Breadcrumb, BreadcrumbItem, Progress} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import {Link} from 'react-router-dom';

function RenderRentedTool({rentedTool}) {
    const expiralTime = (expirationDate, numberOfDays) => {
        let daysLeft = (new Date(expirationDate).getTime() - new Date().getTime())/(1000*60*60*24);

        let percents;
        if (daysLeft >= numberOfDays)
            percents = 100;
        else 
            percents = (daysLeft * 100) / numberOfDays;

        return {
            progress: (100 - percents),
            daysLeft: daysLeft >= numberOfDays ? numberOfDays : daysLeft < 0 ? 0 : daysLeft
        };
    };
    
    return (
        <Media tag="li">
            <Link to={`/tools/${rentedTool.toolInfo._id}`} style={{textDecoration: "none"}}>
                <div className="row toolLink">
                    <Media left middle className="col-12 col-md-4">
                        <Media style={{height: "15rem", width: "15rem"}} object src={baseUrl + rentedTool.toolInfo.image} alt={rentedTool.toolInfo.name} />
                    </Media>
                    <Media body className="ml-2 col-12 col-md-8 text-dark row">
                        <div className="col-11">
                            <Media heading><h1>{rentedTool.toolInfo.name}</h1></Media>
                            <h5>{rentedTool.toolInfo.description}</h5>
                            <div className="row mt-5">
                                <h5 className="m-auto">Start date: {Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(rentedTool.startDate)))}</h5>
                                <h4 className="m-auto">Days left: {Math.floor(expiralTime(rentedTool.expirationDate, rentedTool.numberOfDays).daysLeft)}</h4>
                                <h5 className="m-auto">Expiraion date: {Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(rentedTool.expirationDate)))}</h5>
                            </div>
                            <Progress className="mt-1  border border-dark" value={expiralTime(rentedTool.expirationDate, rentedTool.numberOfDays).progress} color="primary"/>
                        </div>
                    </Media>
                </div>
            </Link>
        </Media>
    )
}

const RentedTools = (props) => {
    if (props.rentedTools) {

        const rentedTools = props.rentedTools.rentedTools.map((rentedTool) => {
            return (
                <div key={rentedTool._id} className="col-12 mt-5">
                    <RenderRentedTool rentedTool={rentedTool} />
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Rented Tools</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>My Rented Tools</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <Media list>
                        {rentedTools}
                    </Media>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <h4>You have no tools in your Rented Tools</h4>
                </div>
            </div>
        )
    }
}

export default RentedTools;