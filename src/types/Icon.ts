import { ImageProps, ImageSourcePropType } from 'react-native'

export interface TIcon extends Omit<ImageProps, 'source'> {
  src: ImageSourcePropType
}
