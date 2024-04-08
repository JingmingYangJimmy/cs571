import { useNavigate } from 'react-router-dom';
import React, { useEffect,useContext } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext'; 


export default function BadgerLogout() {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);


    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res =>{
            if(res.status===200){
                setLoginStatus(null);
                sessionStorage.removeItem('loginStatus');
                alert('You have been logged out!')
                navigate('/', { replace: true });//user can not use go back button to login interface
            }else{
                alert('error to logout');
            }
        }).catch(error=>{
            alert('some unexpected error occured')
        })
}, [setLoginStatus,navigate]);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
