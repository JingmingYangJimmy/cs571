import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from 'react';


function BadgerRegisterScreen(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleSignupPress = () => {
        if (!username || !password || !passwordRepeat) {
            Alert.alert("type all things");
            return;
        }
        if(password!==passwordRepeat){
            Alert.alert("not do match the code");
            return;
        }

        fetch('https://cs571.org/api/f23/hw9/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CS571-ID": "bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13",
                //  "credentials" : "include"
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                SecureStore.setItemAsync('token', data.token);
                props.handleSignup(username, password);
            }else{
                Alert.alert("can not sign up");
            }
        })
        .catch(()=>{
            Alert.alert("not okay");
        })
    }



    return (
    
    <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <TextInput 
        style={styles.container}
        onChangeText={setUsername}
        value={username}
        />
        <TextInput 
        style={styles.container}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        />
        <TextInput 
        style={styles.container}
        onChangeText={setPasswordRepeat}
        value={passwordRepeat}
        secureTextEntry={true}
        />
        <Button color="crimson" title="Signup" onPress={handleSignupPress} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerRegisterScreen;