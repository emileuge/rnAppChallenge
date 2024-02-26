import React from 'react'
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import { commonStyles, colors, cameraStyles } from '../styles'
import Header from '../components/Header'
import { Settings } from '../config/Settings'
import * as ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'

export const Detail = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const { imageSource, imagePath } = route.params

  const options: ImagePicker.ImageLibraryOptions = {
    selectionLimit: 0,
    mediaType: 'photo',
  }

  return (
    <View style={[commonStyles.container, { backgroundColor: colors.detail }]}>
      <Header
        onLeftMenuItem={() => navigation.goBack()}
        navigationType={Settings.navigationTypes.subPage}
        hideLeftMenuItem={false}
      />
      <ScrollView>
        <View
          key={imageSource}
          style={[cameraStyles.imageContainer, { paddingTop: 50 }]}>
          <Image
            resizeMode="cover"
            resizeMethod="scale"
            style={cameraStyles.bigImage}
            source={{ uri: imageSource }}
          />
          <Text style={{ fontSize: 20, paddingTop: 20, paddingBottom: 20 }}>
            Where is it located?
          </Text>
          <Text
            style={{
              width: '90%',
              textAlign: 'center',
            }}>
            {`${RNFS.PicturesDirectoryPath}/${imagePath}`}
          </Text>
          <TouchableOpacity
            onPress={() =>
              ImagePicker.launchImageLibrary(options, response => {
                console.log(response)
              })
            }
            style={{
              padding: 20,
              backgroundColor: 'rgba(0,0,0,0.3)',
              marginTop: 20,
            }}>
            <Text style={{ fontWeight: '700' }}>Open Photo Location</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
