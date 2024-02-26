import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { enableScreens } from 'react-native-screens'
import { Text } from 'react-native'

import { Splash, Home, Detail } from './src/screens'

const Stack = createNativeStackNavigator()
enableScreens(true)

// @ts-ignore
Text.defaultProps = Text.defaultProps || {}
// @ts-ignore
Text.defaultProps.allowFontScaling = false

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
