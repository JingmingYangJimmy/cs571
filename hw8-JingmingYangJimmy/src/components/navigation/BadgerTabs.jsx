import { Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import ArticleDetailScreen from  '../screens/ArticleDetailScreen';

const SomeNav = createBottomTabNavigator();
const detail=createStackNavigator();

function NewDetail(){
    return (
        <detail.Navigator>
            <detail.Screen name="Web"  component={BadgerNewsScreen} options={{ headerShown: false }}/>
            <detail.Screen name="anotherDetail" component={ArticleDetailScreen} options={{ title: 'Article' }}/>
        </detail.Navigator>
    )
}

function BadgerTabs(props) {
    return (
        // <NavigationContainer>
        <SomeNav.Navigator>
            <SomeNav.Screen name="News" component={NewDetail} />
            <SomeNav.Screen name="Preferences" component={BadgerPreferencesScreen} />
        </SomeNav.Navigator>
        // </NavigationContainer>
    )
}



export default BadgerTabs;