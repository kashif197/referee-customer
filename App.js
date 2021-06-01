import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

import FirstScreen from './screens/FirstScreen'
import LoginScreen from './screens/LoginScreen'
import OfferScreen from './screens/OffersScreen'
import ProfileScreen from './screens/ProfileScreen'
import RequestSupport from './screens/RequestSupport'
import SupportScreen from './screens/SupportScreen'
import ScanScreen from './screens/ScanScreen'
import LoginContextProvider from './contexts/LoginContext';
import MyOffers from './screens/MyOffers'
import ReferralScreen from './screens/ReferralScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: '#2ec4b6'}}>
      <Tab.Screen
        name="Offers"
        component={OfferScreen}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Icon name="md-basket" type="ionicon" color= {color} />
            );
          }
        }}
      />
      <Tab.Screen
        name="My Offers"
        component={MyOffers}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Icon name="color-wand-outline" type="ionicon" color={color} />
            );
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Icon name="md-person" type="ionicon" color={color} />
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <LoginContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="First" component={FirstScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="RequestSupport" component={RequestSupport} />
            <Stack.Screen options={{ headerShown: false }} name="Support" component={SupportScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Scan" component={ScanScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Referral" component={ReferralScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Offers" component={MyTabs}
            // options={{
            //   headerRight: () => (
            //     <Avatar
            //       rounded
            //       source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14GgLQAod-ufw4w9xEig-YCQT-SFJahNGzuprDhIusg=s96-c' }}
            //       size={40}
            //       containerStyle={{ marginRight: 15 }}
            //     />
            //   )
            // }}

            />
            {/* <Stack.Screen options={{ headerShown: false }} name="Create" component={CreateProfile} />
              <Stack.Screen options={{ headerShown: false }} name="Email" component={EmailScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
               */}
            {/*<Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen options={{ headerShown: false }} name="Support" component={SupportScreen} /> */}

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </LoginContextProvider>

  );
}
