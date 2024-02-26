import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  flexImageOuterContainer: {
    paddingTop: '5%',
  },
  flexImageInnerContainer: {
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
  },
  bigImage: {
    width: 250,
    height: 250,
  },
  imageFlexContainer: {
    flex: 1,
    marginVertical: 20,
  },
  imageFlexItem: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    // height: Dimensions.get('window').width / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
})
