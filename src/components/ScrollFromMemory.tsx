import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import { cameraStyles } from '../styles'

interface IMemoryProps {
  data: { key: string; value: string }[]
  onAction: (item: { key: string; value: string }) => void
}

export const ScrollFromMemory: React.FC<IMemoryProps> = props => {
  return (
    <ScrollView style={cameraStyles.flexImageOuterContainer}>
      {props.data.map((item: { key: string; value: string }) => (
        <View
          key={item.key}
          style={{ padding: 5, justifyContent: 'center', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => props.onAction(item)}>
            {item.value && (
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={[
                  cameraStyles.image,
                  { width: Dimensions.get('window').width - 50 },
                ]}
                source={{ uri: item.value }}
              />
            )}
          </TouchableOpacity>
        </View>
      ))}
      <View style={{ paddingBottom: 300 }}></View>
    </ScrollView>
  )
}
