import React from "react"
import { Card, Button } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    const handleDelete=()=>{
        props.onDelete(props.messageId);
    }

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <p>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</p>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.isOwnMessage &&(
            <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
        )}
    </Card>
}

export default BadgerMessage;