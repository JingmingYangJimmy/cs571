import { useState } from "react"

export default function BakedGood(props) {
   
    const [quality, setQuantity]=useState(0);

    const increasing =() => {
        setQuantity(previous => previous +1);
    };

    const decreasing = () => {
        if(quality >0 ){
            setQuantity(previous => previous -1);
        }
    }

    const feature ={
        backgroundColor : 'lightblue',
        fontWeight:'bold',
        padding : '14px',
        fontSize  : '20px'
    }
   
   
   return <div style={props.featured ? feature : {}}>
        <h2><strong>{props.name}</strong></h2>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <div>
            <button className="inline" 
            onClick={decreasing}
            disabled={quality <=0}
            >-</button>
            <p className="inline">{quality}</p>
            <button className="inline" onClick={increasing}>+</button>
        </div>
    </div>
}