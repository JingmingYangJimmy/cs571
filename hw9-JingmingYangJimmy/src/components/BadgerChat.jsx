import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from "react-native";

import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';

//Homepage
const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch('https://cs571.org/api/f23/hw9/chatrooms', {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
      "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13"
    },
  })
  .then(response =>response.json())
  .then(data => {
   setChatrooms(data);
  })
  .catch(() => {
    Alert.alert("somehting wrong");
  });
  }, []);



  function handleLogin(username, password) {
    fetch('https://cs571.org/api/f23/hw9/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
      "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13",
    },
    body: JSON.stringify({ username,password}),})
  .then(response =>response.json())
  .then(data => {
    if (data !==undefined) {
      SecureStore.setItemAsync('token',data.token).then(() => {
      setIsLoggedIn(true); 
      // NavigationContainer.navigate('Main');
      });
    } else {
    Alert.alert("fail");
    }
  })
  .catch(() => {
    Alert.alert("somehting wrong");
  });
  }

  function handleSignup(username, password) {
    fetch('https://cs571.org/api/f23/hw9/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13",
      },
      body: JSON.stringify({ username,password}),})
    .then(response =>response.json())
    .then(data => {
        SecureStore.setItemAsync('token',data.token);
        setIsLoggedIn(true); 
    })
    .catch(() => {
      Alert.alert("somehting wrong");
    });
   
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map((chatroom, index) => (
               <ChatDrawer.Screen key={index} name={chatroom} options={{title : chatroom}}>
                {() => <BadgerChatroomScreen name={chatroom} isLoggedIn={isLoggedIn}/>}
              </ChatDrawer.Screen>
            ))
          }

        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} />
  }
}