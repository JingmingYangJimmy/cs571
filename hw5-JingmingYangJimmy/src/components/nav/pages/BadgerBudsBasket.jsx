import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import SavedBuddySummary from '../../SavedBuddySummary';

export default function MyBasket(props) {
    const buddies = useContext(BadgerBudsDataContext);
    const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
    const savedBuddies = buddies.filter(buddy => savedCatIds.includes(buddy.id));

    const handleUnselect = (id) => {
        const updatedSavedCatIds = savedCatIds.filter(savedId => savedId !== id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));
        
        
        alert(`${buddies.find(buddy => buddy.id === id).name} has been removed from your basket!`);
    
        
        window.location.reload();
    };
    

    const handleAdopt = (id) => {
       
        if (!sessionStorage.getItem('adoptedCatIds')) {
            sessionStorage.setItem('adoptedCatIds', JSON.stringify([]));//record it first
        }
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds'));
        adoptedCatIds.push(id);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));
        
        
        const updatedSavedCatIds = savedCatIds.filter(savedId => savedId !== id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));//update
        
        alert(`${buddies.find(buddy => buddy.id === id).name} has been adopted!`);
        
        window.location.reload();
    };
    

    return (
        <div>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>
            {savedBuddies.length === 0 ? (
            <p>You have no buds in your basket!</p>
        ) : (
            <Row>
                {savedBuddies.map((buddy) => (
                    <SavedBuddySummary 
                        key={buddy.name} 
                        buddy={buddy} 
                        onUnselect={handleUnselect}
                        onAdopt={handleAdopt}
                    />
                ))}
            </Row>)}
        </div>
    );
}
