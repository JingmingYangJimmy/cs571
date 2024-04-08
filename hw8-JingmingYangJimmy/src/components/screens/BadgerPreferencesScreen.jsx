import { Text, View, Switch } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { ScrollView } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { PreferencesContext } from './PreferencesContext';


function BadgerPreferencesScreen(props) {

    const { preferences, setPreferences } = useContext(PreferencesContext);
    const [remainingTags, setremainingTags] = useState([]);

    useEffect(() => {
        // Fetch the articles and extract unique tags
        fetch('https://cs571.org/api/f23/hw8/articles', {
            headers: {
                "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13"
            }
        })
          .then(response => response.json())
          .then(data=>{
            const tags = [...new Set(data.flatMap(article => article.tags))];
            setremainingTags(tags);
            
                setPreferences(Object.fromEntries(tags.map(tag => [tag, true])));
              
            ///
            // setPreferences(Object.fromEntries(tags.map(tag => [tag, true])));
            

          });
          
    }, []);



    const toggleSwitch = (tag) => {
        setPreferences(prevPreferences => ({...prevPreferences, [tag]: !prevPreferences[tag]
        }));
    };


    return (
        <ScrollView>
            {remainingTags.map((tag) =>(
                <View key={tag} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <Text>{tag}</Text>
                    <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={"#f4f3f4"}
                    onValueChange={() => toggleSwitch(tag)}
                    value={ preferences[tag]}
                    />
                </View>
            ))}
        </ScrollView>
    )
}

export default BadgerPreferencesScreen;