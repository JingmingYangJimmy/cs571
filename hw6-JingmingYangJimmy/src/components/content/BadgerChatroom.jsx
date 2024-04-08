import React, { useEffect, useState, useContext } from "react"
import { Form, Button, Col,Row,Container,Pagination } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


export default function BadgerChatroom(props) {
    const [loginStatus,setLoginStatus] = useContext(BadgerLoginStatusContext);
    const [messages, setMessages] = useState([]);
    const [activePage, setActivePage] = useState(1); 
    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState(''); 

    const handleDeleteMessage=(messageId)=>{
        const pageNumber = activePage;
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${messageId}`,{
            method: 'DELETE',
            headers:{
                "X-CS571-ID": CS571.getBadgerId()
                
            },
            credentials: 'include'
           
    }).then(response =>{
        if(!response.ok){
            throw new Error('can not delete');
        }
        return response.json();
    }).then(data=>{
        alert("Successfully deleted the post!");
        loadMessages(activePage)
    }).catch((error)=>{
        alert('something unexpected happened')
    });
  
    };
   
    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("You must provide both a title and content!");
            return;}
            const pageNumber = activePage;

        
            fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${pageNumber}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CS571-ID": CS571.getBadgerId()
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: title,
                    content: content,
                })
        })
        .then(response =>{
            if(response.status!==200){
                throw new Error('can not post things');
            }
            return response.json();
        })
        .then(data=>{
            alert("Successfully posted!");
            setTitle(''); 
            setContent('');
            loadMessages(pageNumber);
        }).catch((error)=>{
            alert("something run to post")
        })     
        }

    const loadMessages = (pageNumber) => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${pageNumber}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };



    useEffect(()=>{
        loadMessages(activePage);
    },[props,activePage]);

    const handlePageClick=(pageNumber)=>{
        setActivePage(pageNumber);
    }

    const paginationItems=[];
    for(let number=1;number<5;number++){
        paginationItems.push(
            <Pagination.Item key={number} active={number === activePage} onClick={()=>handlePageClick(number)}>
                {number}
            </Pagination.Item>
        )
    }

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    // useEffect(loadMessages, [props]);

    return <div className="container-fluid">
        <h1 className="responsive-text">{props.name} Chatroom</h1>
       {loginStatus ? (
            <Form onSubmit={handlePostSubmit}>
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                    />
                <Form.Label>Post Content</Form.Label>
                <Form.Control
                type="text"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                    />
                <Button variant="primary" type="submit">
                    Create Post
                </Button>
            </Form>
       ) :(
        <p>You must be logged in to post!</p>
    )}
        {
            messages.length > 0 ?
                <>
                <Container className="container-fluid">
                    {     
                         <Row >{
                            messages.map((message,index)=>(
                     
                                <Col  xs={12} sm={6} md={4} lg={3} key={index}>
                                    <BadgerMessage  
                                    title={message.title}
                                    poster={message.poster} 
                                    content={message.content} 
                                    created={message.created}
                                    messageId={message.id}
                                    
                                    // isOwnMessage={message.poster===JSON.parse(sessionStorage.getItem("loginStatus")).username}
                                    isOwnMessage={message.poster === (sessionStorage.getItem("loginStatus") && JSON.parse(sessionStorage.getItem("loginStatus")).username)}

                                    onDelete={handleDeleteMessage}//pass the function to the child
                                    />
                                </Col>
                            ))
                         }
                         </Row>   
                    }
                     </Container>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination className="justify-content-left">{paginationItems}</Pagination>
    </div>

}
