import React, { useContext } from 'react';
import BadgerBudSummary from '../../BadgerBudSummary';
import { Row } from 'react-bootstrap';

import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext'; 



export default function BadgerBudsAdoptable(props) { //website

    const buddies = useContext(BadgerBudsDataContext);
   
    const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
    const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];

    const availableBuddies = buddies.filter(buddy => !savedCatIds.includes(buddy.id)&& !adoptedCatIds.includes(buddy.id));//both are excluded

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {availableBuddies.length === 0 ? (
            <p>No buds are available for adoption!</p>
        ) : (
        <Row>
        {availableBuddies.map((buddy) => (
                <BadgerBudSummary key={buddy.name} buddy={buddy} />
            ))}
        </Row>)}
    </div>
}