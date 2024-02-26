import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Switch,
  ActivityIndicator,
} from 'react-native'
import { commonStyles, cameraStyles, colors } from '../styles'
import Header from '../components/Header'
import { Settings } from '../config/Settings'
import * as ImagePicker from 'react-native-image-picker'
import { requestPermission } from '../helpers/imageHelpers'
import { RenderFromImageGallery } from '../components/RenderFromImageGallery'
import { RenderFromMemory } from '../components/RenderFromMemory'
import { ScrollFromMemory } from '../components/ScrollFromMemory'
import { ExtendedImagePickerResponse } from '../types/images'

export const Home = ({ navigation }: { navigation: any }) => {
  const [listData, setListData] = useState<
    { key: string; value: string; empty?: boolean }[]
  >([])
  const [showDirectoryImages, setShowDirectoryImages] = useState(false)
  const [scrollOrFlatlist, setScrollOrFlatlist] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    __DEV__ && console.info(listData)
  }, [listData])

  const onButtonPress = useCallback(
    async (type: string, options: ImagePicker.CameraOptions) => {
      if (type === 'capture') {
        await requestPermission()

        ImagePicker.launchCamera(options, response => {
          const res: ExtendedImagePickerResponse[] =
            response?.assets as unknown as ExtendedImagePickerResponse[]

          res?.map(item => {
            if (response.didCancel) {
              __DEV__ &&
                console.log(
                  'User cancelled image picker by pressing back button',
                )
            } else if (item.error) {
              __DEV__ && console.log('ImagePicker Error: ', item.error)
            } else if (item.customButton) {
              __DEV__ &&
                console.log('User selected custom button: ', item.customButton)
            } else {
              __DEV__ && console.log('response', JSON.stringify(res))
              setLoading(true)
              const data = listData
              data.push({ key: item.id, value: item.uri })
              setListData(data)
              // Optional for custom Folder -> moveAttachment(item.uri, item.id)
              __DEV__ && console.debug(listData)
              setLoading(false)
            }
          })
        })
      }
    },
    [],
  )

  return (
    <View style={[commonStyles.container, { backgroundColor: colors.home }]}>
      <Header
        onLeftMenuItem={() => {}} // navigation.toggleDrawer() -> If needed to add a menu
        navigationType={Settings.navigationTypes.subPage}
        hideLeftMenuItem
      />
      <View style={{ paddingTop: '15%' }}>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            style={[commonStyles.buttonOrange, commonStyles.centeredOnly]}
            onPress={() =>
              onButtonPress(actions[1]?.type, actions[1]?.options)
            }>
            <Text>{actions[1]?.title ?? ''}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[commonStyles.buttonOrange, commonStyles.centeredOnly]}
            onPress={() =>
              onButtonPress(actions[0]?.type, actions[0]?.options)
            }>
            <Text>{actions[0]?.title ?? ''}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            commonStyles.buttonOrange,
            commonStyles.centeredOnly,
            { marginTop: 10 },
          ]}
          onPress={() => setShowDirectoryImages(!showDirectoryImages)}>
          <Text>
            {showDirectoryImages
              ? 'Show from Temp Memory'
              : 'Show from Gallery'}
          </Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color={colors.white} />}
        {listData.length > 0 && !showDirectoryImages && (
          <Switch
            trackColor={{ false: '#767577', true: '#767577' }}
            thumbColor={scrollOrFlatlist ? '#f5dd4b' : '#ffffff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setScrollOrFlatlist(!scrollOrFlatlist)}
            value={scrollOrFlatlist}
          />
        )}
        {!showDirectoryImages && !scrollOrFlatlist && listData && (
          <RenderFromMemory
            data={[...listData]}
            onAction={item =>
              navigation.navigate('Detail', {
                imageSource: item.value,
                imagePath: item.key,
              })
            }
          />
        )}
        {showDirectoryImages && <RenderFromImageGallery />}
        {!showDirectoryImages && scrollOrFlatlist && listData && (
          <ScrollFromMemory
            data={listData}
            onAction={item =>
              navigation.navigate('Detail', {
                imageSource: item.value,
                imagePath: item.key,
              })
            }
          />
        )}
      </View>
    </View>
  )
}

interface Action {
  title: string
  type: 'capture'
  options: ImagePicker.CameraOptions
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    },
  },
]

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeExtra: true,
      presentationStyle: 'fullScreen',
    },
  })
}
