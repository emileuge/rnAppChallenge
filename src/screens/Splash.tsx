import React, { useEffect, useState, useContext, useRef } from 'react'
import {
  View,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native'
import { commonStyles, colors } from '../styles/index'
import { LogoWhite } from '../assets/icons'

export const Splash = ({ navigation }: { navigation: any }) => {
  const { width, height } = Dimensions.get('window')

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Home')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <View
        style={[
          commonStyles.container,
          commonStyles.centeredOnly,
          { backgroundColor: colors.splash },
        ]}>
        <View style={commonStyles.flexCenter}>
          <Image source={LogoWhite} style={commonStyles.splashLogo} />
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      </View>
    </>
  )
}
