import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 130 : 70,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  titleIcon: {
    width: 200,
    resizeMode: 'contain',
    position: 'absolute',
  },
  titleText: {
    width: 100,
    height: 45,
    position: 'absolute',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  menuBarContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuBarItem: {
    padding: 5,
  },
  leftMenuBarIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  leftIconSmallMargin: {
    marginLeft: 10,
  },
})
