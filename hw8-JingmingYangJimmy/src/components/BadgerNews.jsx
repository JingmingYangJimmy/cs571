import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { PreferencesProvider } from './src/components/screens/PreferencesContext';
import BadgerTabs from './navigation/BadgerTabs';


export default function BadgerNews(props) {

  // Just a suggestion for Step 4! Maybe provide this to child components via context...
  // const [prefs, setPrefs] = useState({});

  return (
    <PreferencesProvider>
      <NavigationContainer>
        <BadgerTabs />
      </NavigationContainer>
      </PreferencesProvider>
  );
}