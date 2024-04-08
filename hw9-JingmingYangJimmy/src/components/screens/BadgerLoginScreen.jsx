import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';


function BadgerLoginScreen(props) {
    const navigation=useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegisterPress = () => {
        setIsRegistering(true); 
    };

    const handleLoginPress = () =>{

        
        if(username && password){
            fetch('https://cs571.org/api/f23/hw9/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13",
                    // "credentials" : "include"
                    
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.token !== undefined){///////
                    SecureStore.setItemAsync('token', data.token)
                    handleLogin(username,password);
                    // navigation.navigate()
                }
                else{
                    Alert.alert("!");
                }
            })
            .catch(()=>{
                Alert.alert("can not fetch");
            })
        }
    }

    return (
    
    <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <TextInput 
        style={styles.container}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        />
        <TextInput
            style={styles.container}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
        />
        <Button color="crimson" title="Login" onPress= {
            handleLoginPress
        } />

        <Button color="grey" title="Signup" onPress={handleRegisterPress    } />
    </View>  );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerLoginScreen;