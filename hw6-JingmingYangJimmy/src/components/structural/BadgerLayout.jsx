import React, { useState,useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout(props) {

    // TODO @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.

    const checkLoggedIn=()=>{
        const record=sessionStorage.getItem('loginStatus');
        return record ? JSON.parse(record) : null;
    }
    const [loginStatus, setLoginStatus] = useState(checkLoggedIn)
    const navigate = useNavigate();


    useEffect(()=>{
        if(loginStatus){//if it is true
            sessionStorage.setItem('loginStatus', JSON.stringify(loginStatus));
        }else{
            sessionStorage.removeItem('loginStatus');
        }

    },[loginStatus]);

    const handleLogout=()=>{
        setLoginStatus(null);
        sessionStorage.removeItem('loginStatus');
        navigate('/');
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {loginStatus ? (<Nav.Link onClick={handleLogout} as={Link} to="logout">Logout</Nav.Link>):(
                               <>
                               <Nav.Link as={Link} to="login">Login</Nav.Link>
                                <Nav.Link as={Link} to="register">Register</Nav.Link>
                                </>
                        )
                        }
                        
                        <NavDropdown title="Chatrooms">
                            {
                                props.chatrooms.map(chatroom =>{
                                    return <NavDropdown.Item as={Link}  to={`/chatrooms/${chatroom}`}
                                    key={chatroom} >{chatroom}
                                    </NavDropdown.Item>
                                })
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;