import React, {useState} from 'react';
import {Label, Input, Button, InputGroup, Col, Row} from 'reactstrap';

const Account = (props) => {
    var user = props.account;
    const [values, handleChange] = useState({firstname: user.firstname, lastname: user.lastname, email: user.email, telnum: user.telnum, username: user.username});

    const handleSave = (values) => {
        alert(JSON.stringify(values));
        props.putAccount(values);
        handleChange({firstname: values.firstname, lastname: values.lastname, email: values.email, telnum: values.telnum, username: values.username});
        window.location.reload();
    };    

    const handleCancel = () => {
        handleChange({firstname: user.firstname, lastname: user.lastname, email: user.email, telnum: user.telnum, username: user.username});
    };

    const container = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center'
    }

    return (
        <div className="mt-3 container" style={container}>
            <div className="col-5">
                <Row className="row form-group text-dark">
                    <Label htmlFor="firstname" md={4}>First Name</Label>
                    <Col md={8}>
                        <Input type="text" id="firstname" name="firstname"
                            placeholder="First Name"
                            className=""
                            value={values.firstname}
                            onChange={event => handleChange({firstname: event.target.value, lastname: values.lastname, email: values.email, telnum: values.telnum, username: values.username})}
                        />
                    </Col>
                </Row>
                <Row className="row form-group text-dark">
                    <Label htmlFor="lastname" md={4}>Last Name</Label>
                    <Col md={8}>
                        <Input type="text" id="lastname" name="lastname"
                            placeholder="Last Name"
                            className=""
                            value={values.lastname}
                            onChange={event => handleChange({firstname: values.firstname, lastname: event.target.value, email: values.email, telnum: values.telnum, username: values.username})}
                        />
                    </Col>
                </Row>
                <Row className="form-group text-dark">
                    <Label htmlFor="email" md={4}>Email</Label>
                    <Col md={8}>
                        <Input type="text" id="email" name="email"
                            placeholder="Email"
                            className=""
                            value={values.email}
                            onChange={event => handleChange({firstname: values.firstname, lastname: values.lastname, email: event.target.value, telnum: values.telnum, username: values.username})}
                        />
                    </Col>
                </Row>
                <Row className="form-group text-dark">
                    <Label htmlFor="telnum" md={4}>Tel. num</Label>
                    <Col md={8}>
                        <Input type="text" id="telnum" name="telnum"
                            placeholder="Tel. num"
                            className=""
                            value={values.telnum}
                            onChange={event => handleChange({firstname: values.firstname, lastname: values.lastname, email: values.email, telnum: event.target.value, username: values.username})}
                        />
                    </Col>
                </Row>
                <Row className="form-group text-dark">
                    <Label htmlFor="username" md={4}>Username</Label>
                    <Col md={8}>
                        <Input type="text" id="username" name="username"
                            placeholder="Username"
                            className=""
                            disabled
                            value={values.username}
                            onChange={event => handleChange({firstname: values.firstname, lastname: values.lastname, email: values.email, telnum: values.telnum, username: event.target.value})}
                        />
                    </Col>
                </Row>
                
                <Row className="form-group justify-content-center mt-3">
                    <Button color="secondary" className="mr-3" onClick={() => handleCancel(values)}>
                        Cancel
                    </Button>
                    <Button color="primary" className="ml-3" onClick={() => handleSave(values)}>
                        Save Changes
                    </Button>
                </Row>
            </div>
        </div>
    );
};

export default Account;