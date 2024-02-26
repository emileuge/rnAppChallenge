import { PermissionsAndroid, Platform, Rationale } from 'react-native'
import RNFS from 'react-native-fs'
import * as ImagePicker from 'react-native-image-picker'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { CameraOptions } from 'react-native-image-picker'
import { ExtendedImagePickerResponse } from '../types/images'

export const formatData = (
  data: { key: string; value?: string; empty?: boolean }[],
  numColumns: number,
) => {
  const newData = data
  const numberOfFullRows = Math.floor(data.length / numColumns)
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    newData.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
    numberOfElementsLastRow++
  }

  return newData
}

export const moveAttachment = async (filePath: string, newFilepath: string) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'App Files Permission',
      message: 'App needs access to your storage ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  )
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    const newFolder = `${RNFS.PicturesDirectoryPath}/CameraLibApp`
    return new Promise((resolve, reject) => {
      RNFS.mkdir(newFolder)
        .then(() => {
          RNFS.moveFile(filePath, newFilepath)
            .then(() => {
              __DEV__ &&
                console.info(
                  'FILE MOVED',
                  filePath,
                  `${newFolder}/${newFilepath}`,
                )
              resolve(true)
            })
            .catch(error => {
              __DEV__ && console.error('moveFile error', error)
            })
        })
        .catch(err => {
          __DEV__ && console.error('mkdir error', err)
          reject(err)
        })
    })
  } else {
    __DEV__ && console.info('Files permission denied')
  }
}

export const requestPermission = async () => {
  try {
    const btn: Rationale = {
      title: 'Camera Photo Library App',
      message: 'It needs access to your camera to work',
      buttonPositive: 'Accept',
      buttonNegative: 'Cancel',
      buttonNeutral: 'Maybe Later',
    }
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        btn,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        __DEV__ && console.info('You can use the camera')
      } else {
        __DEV__ && console.info('Permission denied')
      }
    }
    if (Platform.OS === 'ios') {
      const granted = await request(PERMISSIONS.IOS.CAMERA)
      switch (granted) {
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
  } catch (err) {
    __DEV__ && console.warn(err)
  }
}

export const openCamera = async () => {
  let options: CameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
  }

  await requestPermission()

  ImagePicker.launchCamera(options, response => {
    __DEV__ && console.debug('Response = ', response)

    const res: ExtendedImagePickerResponse =
      response as unknown as ExtendedImagePickerResponse

    if (response.didCancel) {
      __DEV__ &&
        console.debug('User cancelled image picker by pressing back button')
    } else if (res.error) {
      __DEV__ && console.debug('ImagePicker Error: ', res.error)
    } else if (res.customButton) {
      __DEV__ &&
        console.debug('User selected custom button: ', res.customButton)
    } else {
      const source = { uri: res.uri }
      __DEV__ && console.debug('response', JSON.stringify(res))
    }
  })
}
