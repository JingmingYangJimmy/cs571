import React from 'react';
import { Col } from 'react-bootstrap';

const SavedBuddySummary = ({ buddy, onUnselect, onAdopt }) => {
    const imageUrl = `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`;

    return (
        <Col xs={12} sm={6} md={4} lg={3} key={buddy.name}>
            <img src={imageUrl} alt={`The picture of ${buddy.name}`} style={{width: '150px'}} />
            <h2>{buddy.name}</h2>
            <button onClick={() => onUnselect(buddy.id)}>Unselect</button>
            <button onClick={() => onAdopt(buddy.id)}>Adopt</button>
        </Col>
    );
};

export default SavedBuddySummary;
