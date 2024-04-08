import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from "react-native";
// import { ScrollView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import BadgerNewsItem from './BadgerNewsItem'; 
import { PreferencesContext } from './PreferencesContext';

function BadgerNewsScreen(props) {

    const  {preferences}  = useContext(PreferencesContext);
    const[articles,setArticles] = useState([]);

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw8/articles',{
            headers: {
                "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13"
            }
        })
          .then(response => response.json())
          .then(data => setArticles(data))
          .catch(error => console.error('Error fetching data: ', error));
      }, []);


    const filteration = articles.filter(article=>
            article.tags.every(tag=>preferences[tag] !==false)
        )
    return (
        <ScrollView>
            {filteration.length>0?(
                filteration.map(article =>(
                    <BadgerNewsItem key={article.id} article={article}/>
                ))):(
                    <Text>No more articles!</Text>
                )
            }  
        </ScrollView>
    )
}

export default BadgerNewsScreen;