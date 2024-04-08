// BadgerBudSummary.jsx
import React ,{useState} from 'react';
import { Col,Carousel } from 'react-bootstrap';


const BadgerBudSummary = ({ buddy }) => {
    const imageUrl = `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`;
    const [showDetails, setShowDetails]=useState(false);

    const press =()=>{
        setShowDetails(!showDetails);
    };
    
    const age =(month)=>{
        const year=Math.floor(month/12);
        const remains = month%12;
        if(year===0 && remains===0) return `${month} month(s) old`
        if(year>0 && remains ===0) return `${year} year(s) old`
        if(year===0) return `${month} month(s) old`
        return `${year} year(s) and ${remains} month(s) old`

    }

    const handleSave = () => {
       
        
        if (!sessionStorage.getItem('savedCatIds')) {
            sessionStorage.setItem('savedCatIds', JSON.stringify([]));//record it first
        }
    
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) ;
    
        
        savedCatIds.push(buddy.id);
    
        
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));//save

        alert(`${buddy.name} has been added to your basket!`);
        
        
        window.location.reload(); 
    };


    // const renderCarousel = () => (
    //     <Carousel>
    //         {buddy.imgIds.map(id => (
    //             <Carousel.Item key={id}>
    //                 <img
    //                     className="d-block w-100"
    //                     src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${id}`}
    //                     alt={`A picture of ${buddy.name}`}
    //                 />
    //             </Carousel.Item>
    //         ))}
    //     </Carousel>
    // );
    
    
    return (
        <Col xs={12} sm={6} md={4} lg={3} key={buddy.name}>
            {showDetails ? (
                <Carousel>
                    {buddy.imgIds.map(id => (
                        <Carousel.Item key={id}>
                            <img
                                className="d-block w-100"
                                src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${id}`}
                                alt={`A picture of ${buddy.name}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <img src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`} alt={`The picture of ${buddy.name}`} style={{width: '150px'}} />
            )}
            <h2>{buddy.name}</h2>
            {showDetails && (
                <>
                    <p>{buddy.gender}</p>
                    <p>{buddy.breed}</p>
                    <p>{age(buddy.age)}</p>
                    {buddy.description && <p>Description: {buddy.description}</p>}
                </>
            )}
            
            <button onClick={press}>{showDetails ? 'Show Less' : 'Show More'}</button>
            <button onClick={handleSave}>Save</button>
        </Col>
    );
};

export default BadgerBudSummary;
