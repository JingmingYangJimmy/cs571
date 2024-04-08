import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from 'react-router-dom';



export default function BadgerRegister() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();//need to call it at the top level



    const handleSubmit =(e)=>{
        e.preventDefault();

        if(!username || !password){
            alert('You must provide both a username and password!');
            return;
        }
        if(password!==confirmPassword){
            alert('Your passwords do not match!');
            return;
        }
        fetch('https://cs571.org/api/f23/hw6/register',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: 'include',
            body: JSON.stringify({
                username:username,
                password:password
            })
        })
            .then(res =>{
                if (res.status === 200) {//if it succeed
                    return res.json();
                } if(res.status=== 409){
                    throw new Error('username existed')
                }
                else {
                    throw new Error('something else')
                }
            })
            .then(data => {
                alert('Registration was successful!');
                setLoginStatus({ isLoggedIn: true, username: username });
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                sessionStorage.setItem('loginStatus', JSON.stringify({ isLoggedIn: true, username: username }));
                navigate('/');
            })
            .catch(error =>{
                if(error.message === 'username existed'){
                    alert('That username has already been taken!');
                }else{
                    alert(error.message);
                }
            })
    }

    return <>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Label>Username</Form.Label>
            <Form.Control
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
                
            />
           
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"//obscure the password
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
            />

            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                
            />
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    </>
}
