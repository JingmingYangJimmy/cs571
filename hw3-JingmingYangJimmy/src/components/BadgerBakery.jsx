import { useEffect, useState } from "react"
import BakedGood from "./BakedGood";
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState([]);
    const [isLoading, setIsLoading]= useState(true);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw3/all-baked-goods", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setBakedGoods(data);
            setIsLoading(false);
        })
    }, [])

    const featuredProduct=bakedGoods.find(backGood => backGood.featured);

    return <div style ={{backgroundColor : '#FFB6C1'}}>
        <h1>Badger Bakery</h1>
        <p>Welcome to our small-town bakery located in Madison, WI!</p>
        {
            isLoading ? 
            <p>Loading...</p> : 
            <p>Today's featured item is {featuredProduct.name} for ${featuredProduct.price}!</p>
        }
        <Container>
            <Row>
            {
                bakedGoods.map(bakedGood => {
                    return <Col key={bakedGood.name} xs={12} md={6} lg={4} xl={3}>
                        <BakedGood
                            name={bakedGood.name}
                            description={bakedGood.description}
                            price={bakedGood.price}
                            featured={bakedGood.featured}
                        />
                    </Col>
                })
            }
            </Row>
        </Container>
    </div>
}