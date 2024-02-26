import { ImagePickerResponse } from 'react-native-image-picker'

export interface ExtendedImagePickerResponse extends ImagePickerResponse {
  error?: any
  customButton?: any
  data?: any
  uri: string
  timestamp: string
  originalPath: string
  type: string
  height: number
  width: number
  id: string
  fileSize: number
  fileName: string
}

export type FlatListItem = {
  key: string
  value: string
  empty?: boolean
}

export type buttonPositive = {
  title: string
  message: string
}
