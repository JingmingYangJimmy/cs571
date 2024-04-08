import { Text, View, Image, Button, Alert } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import React, { useEffect, useState } from "react";


export default function BadgerBakery() {
    const [bakedGood,setBakedGood]=useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [basket, setBasket] = useState({});
   
    useEffect(()=>{
        fetch("https://cs571.org/api/f23/hw7/goods",{
            headers: {
                "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13"
            }
        })
        .then(res => res.json())
        .then(data=>{
            const goodsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
setBakedGood(goodsArray);

           
            let initialBasket = {};
            for (let good of goodsArray) {
              initialBasket[good.id] = 0;
            }
            setBasket(initialBasket);
          });
        
    },[])//avoid infinite loop

    const handlePrevious=()=>{
        setCurrentIndex(currentIndex-1);
    }

    const handleNext=()=>{
        setCurrentIndex(currentIndex+1);
    }

    const addToBasket=(id)=>{
        setBasket((previous)=>({
            ...previous,
            [id]:previous[id]+1
        }))
    }

    const removeFromBasket=(id)=>{
        setBasket((previous)=>({
            ...previous,
            [id]:Math.max(0,previous[id]-1)
        }))
    }

    const calculateTotal=()=>{
        return bakedGood.reduce((first,second)=>{
            const quantity=basket[second.id] ;
            const price=second.price ;
            return first+quantity * price;
        },0).toFixed(2);
    }

    const handlePlaceOrder =()=>{
        const  totalPrice=calculateTotal();
        const numberOfItems=Object.values(basket).reduce((first,second)=>first+second,0);
        Alert.alert(
            "Order Confirmed!",
            `Your order contains ${numberOfItems} items and costs $${totalPrice}!`
        );
    }


   const currentGood=bakedGood[currentIndex];

    return (
    <View>
        <Text>Welcome to Badger Bakery!</Text>
        <View>
            <Button
            title="Previous"
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            />
            <Button
            title="Next"
            onPress={handleNext}
            disabled={currentIndex >= bakedGood.length-1}
            />
        </View>
        {currentGood &&(
            <View key={currentGood.id}>
                <Image source ={{uri:currentGood.imgSrc}}  style={{ width: 200, height: 200 }}></Image>
                <Text>{currentGood.name}</Text>
                <Text></Text>
                <Text>${currentGood.price}</Text>
                <Text>You can order up to {currentGood.upperLimit === -1 ? 'Unlimited' : currentGood.upperLimit}</Text>
                <View>
                    <Button
                    title="-"
                    onPress={()=>removeFromBasket(currentGood.id)}
                    disabled={(basket[currentGood.id]===0)}
                    />
                    <Text>{basket[currentGood.id]}</Text>
                    <Button
                    title="+"
                    onPress={()=>addToBasket(currentGood.id)}
                    disabled={currentGood.upperLimit !==-1 &&basket[currentGood.id]>=currentGood.upperLimit}
                    />
                </View>
                <Text>Order Total: ${calculateTotal()}</Text>
                <Button
                title="Place Order"
                onPress={handlePlaceOrder}
                disabled={Object.values(basket).every(count => count === 0)}
                />
            </View>
        )}
     
    </View>);
}
