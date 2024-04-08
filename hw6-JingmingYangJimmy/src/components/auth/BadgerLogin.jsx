import React, {useRef,useContext} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();



    const handleSubmit =(e) =>{
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            alert('You must provide both a username and password!');
            return;
        }

        fetch('https://cs571.org/api/f23/hw6/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: 'include',
            body:JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } if(res.status=== 401){//unauthorized
                throw new Error('Incorrect username or password!');
            }
            else {
                throw new Error('something unexpected happened')
            }})
        .then((data)=>{
            alert('Login was successful!');
            setLoginStatus({ isLoggedIn: true, username: username });
            sessionStorage.setItem('loginStatus', JSON.stringify({ isLoggedIn: true, username: username }));
            navigate('/');
        })
        .catch((error)=>{
            alert(error.message);
        })
    }

    return <>
        <h1>Login</h1>
        
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="usernameInput">Username</Form.Label> 
                <Form.Control type="text" id="usernameInput" ref={usernameRef}/>
                <Form.Label htmlFor="passwordInput">Password</Form.Label>
                <Form.Control type="password" id="passwordInput" ref={passwordRef}/>
                <Button variant="primary" type="submit"  className="mt-4">Login</Button>
            </Form>   
    </>
}
