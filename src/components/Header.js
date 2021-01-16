import React, {Component, useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse,
    NavItem, Button, Modal, ModalHeader, ModalBody,
    FormGroup, Form, Input, Label, Media, ButtonDropdown,
    DropdownToggle, DropdownMenu, DropdownItem, Toast, ToastBody, ToastHeader} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            dropdownOpen: false,
            showToastSuccess: false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleNav() {
        this.setState({isNavOpen: !this.state.isNavOpen});
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
        if (this.props.auth.isAuthenticated)
            this.setState({showToastSuccess: true});
        //alert(this.props.auth.isAuthenticated);
    }

    handleLogout() {
        this.props.logoutUser();
        if (!this.props.auth.isAuthenticated)
            this.setState({showToastSuccess: false});
    }

    toggleDropdown() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    render() {
        return (
            <>
                <Navbar expand="md" className="navb">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav}/>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <NavbarBrand href="/">
                            <img src="tool_logo.jpg" height="69" width="55" alt="toolsharing"/>
                        </NavbarBrand>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/tools">
                                    <span className="fa fa-gear fa-lg"></span> Tools
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/about">
                                    <span className="fa fa-info fa-lg"></span> About
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contacts">
                                    <span className="fa fa-address-card fa-lg"></span> Contacts
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <div className="ml-auto">
                            { this.props.auth.isAuthenticated ?
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                                    <DropdownToggle caret className="bg-warning">
                                        <span className="fa fa-user"/>
                                        &nbsp;{this.props.auth.user.username}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link to="/account" style={{textDecoration: 'none'}}>
                                                <span className="fa fa-user fa-lg"></span> My Account
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/wishlist" style={{textDecoration: 'none'}}>
                                                <span className="fa fa-heart fa-lg"></span> My Wishlist
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/rentedTools" style={{textDecoration: 'none'}}>
                                                <span className="fa fa-gear fa-lg"></span> My Rented Tools
                                            </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                                :
                                null
                            }
                        </div>
                        <Nav className="ml-1" navbar>
                            <NavItem>
                                { !this.props.auth.isAuthenticated ?
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-user-plus fa-lg"/>
                                    </Button>
                                    :
                                    null
                                }
                            </NavItem>
                            <NavItem className="ml-1">
                                    { !this.props.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fas fa-sign-in-alt fa-lg"></span>
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :                                  
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fas fa-sign-out-alt fa-lg"></span>
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                    }

                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
                </Navbar>

                <div className="pl-auto rounded">
                    <Toast isOpen={this.state.showToastSuccess}>
                        <ToastHeader>
                            Logging in
                        </ToastHeader>
                        <ToastBody className="bg-primary">
                            You have successfully loged in!
                        </ToastBody>
                    </Toast>
                </div>
            
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} className="text-dark">Sign up/Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username" className="text-dark">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password" className="text-dark">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check className="text-dark">
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Sign in</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Header;