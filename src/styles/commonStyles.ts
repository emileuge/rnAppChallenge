import { StyleSheet } from 'react-native'
import { colors } from './colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  centeredOnly: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  splashLogo: {
    height: 180,
    resizeMode: 'contain',
  },
  fullWidth: {
    width: '100%',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOrange: {
    backgroundColor: colors.ORANGE,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
  },
})
