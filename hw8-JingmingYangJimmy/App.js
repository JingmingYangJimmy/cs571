// import { StatusBar } from 'expo-status-bar';
// import BadgerNews from './src/components/BadgerNews';
import { NavigationContainer } from '@react-navigation/native';
import { PreferencesProvider } from './src/components/screens/PreferencesContext';
import BadgerTabs from './src/components/navigation/BadgerTabs'; 



const App =()=> {
  return (
    <PreferencesProvider>
       <NavigationContainer><BadgerTabs/></NavigationContainer>
      </PreferencesProvider>
  );
}

export default App;