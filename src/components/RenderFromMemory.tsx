import React from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { cameraStyles } from '../styles'
import { formatData } from '../helpers/imageHelpers'

interface IMemoryProps {
  data: any
  customColumns?: number
  onAction: (item: { key: string; value: string }) => void
}

export const RenderFromMemory: React.FC<IMemoryProps> = props => {
  const numColumns = props.customColumns ?? 3 // Can be managed from settings as well or as parameter

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => props.onAction(item)}>
        <Image
          resizeMode="cover"
          resizeMethod="scale"
          style={[cameraStyles.image]}
          source={{ uri: `file://${item.value}` }}
        />
      </TouchableOpacity>
    )
  }
  return (
    <FlatList
      data={formatData([...props.data], numColumns)}
      keyExtractor={item => item.key}
      renderItem={renderItem}
      numColumns={numColumns}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 400,
        paddingTop: 30,
        justifyContent: 'center',
      }} // For smooth scrolling
    />
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
})
