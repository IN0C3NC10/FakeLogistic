import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Track} from './views/_index'
import { css } from './assets/css/Style'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            title:'FAKE LOGISTIC',
            headerStyle:{backgroundColor:'#004aad'},
            headerTintColor:'#fff',
            headerTitleStyle:{fontWeight:'bold', alignSelf: 'center'}
           }}
          />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Track" component={Track} />
        {/* <Stack.Screen name="Restricted" component={Restricted} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


