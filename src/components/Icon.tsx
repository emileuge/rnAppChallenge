import React from 'react'
import { Image } from 'react-native'
import { TIcon } from '../types/Icon'

const Icon: React.FC<TIcon> = ({ src, ...props }) => {
  return <Image {...props} source={src} />
}

export default Icon
