import React from 'react'
import { useEffect, useState } from 'react'
import RNFS, { ReadDirItem } from 'react-native-fs'
import { FlatList, Image, Platform, Text, View } from 'react-native'
import { cameraStyles } from '../styles'
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions'

export const RenderFromImageGallery: React.FC<{}> = props => {
  const [files, setFiles] = useState<ReadDirItem[]>()

  const getFileContent = async (path: string) => {
    const reader = await RNFS.readDir(path)
    setFiles(reader)
  }

  const checkResult = (result: string) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        )
        break
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        )
        break
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible')
        break
      case RESULTS.GRANTED:
        console.log('The permission is granted')
        break
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore')
        break
    }
  }

  const requestPermission = async () => {
    const photoLib = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
    checkResult(photoLib)
    const mediaLib = await request(PERMISSIONS.IOS.MEDIA_LIBRARY)
    checkResult(mediaLib)
  }

  const getImages = async () => {
    if (Platform.OS === 'ios') {
      await requestPermission()
    }
    getFileContent(RNFS.PicturesDirectoryPath)
  }

  useEffect(() => {
    getImages()
  }, [])

  const Item = ({
    name,
    isFile,
    path,
  }: {
    name: string
    isFile: boolean
    path: string
  }) => {
    return (
      <>
        {isFile && (
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 5,
              marginBottom: 10,
              margin: 20,
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={[cameraStyles.image, { alignSelf: 'center', width: 310 }]}
              source={{ uri: `file://${path}` }}
            />
            <Text style={{ padding: 20 }}>
              <Text style={{ fontWeight: '700' }}>Name:</Text> {name}
            </Text>
          </View>
        )}
      </>
    )
  }
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View>
        <Item name={item.name} path={item.path} isFile={item.isFile()} />
      </View>
    )
  }
  return (
    <FlatList
      data={files}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 300 }}
    />
  )
}
