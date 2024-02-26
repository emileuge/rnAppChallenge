import React from 'react'
import { Text, TextStyle, TouchableOpacity, View } from 'react-native'
import { ArrowLeftWhite, MenuIcon, LogoWhite, LogoTwo } from '../assets/icons'
import Icon from './Icon'
import { colors } from '../styles/colors'
import { Settings } from '../config/Settings'
import menuStyles from '../styles/menuStyles'

interface IHeaderProps {
  navigationType: string
  onLeftMenuItem?: () => void
  onRightMenuItem?: () => void
  onGiftCard?: () => void
  title?: string
  hideTitle?: boolean
  hideLeftMenuItem?: boolean
  customTitle?: TextStyle
}

const Header: React.FC<IHeaderProps> = props => {
  const leftMenuBarIcon =
    props.navigationType === Settings.navigationTypes.home
      ? MenuIcon
      : ArrowLeftWhite

  const getTitle = () => {
    if (props.hideTitle) return

    return props.title ? (
      <Text
        style={[menuStyles.titleText, props.customTitle && props.customTitle]}>
        {props.title}
      </Text>
    ) : (
      <Icon src={LogoWhite} style={menuStyles.titleIcon} />
    )
  }

  return (
    <View style={[menuStyles.container]}>
      <View style={menuStyles.content}>
        {getTitle()}
        <View style={menuStyles.menuBarContainer}>
          {props.hideLeftMenuItem !== true && (
            <TouchableOpacity
              style={menuStyles.menuBarItem}
              onPress={props.onLeftMenuItem}>
              <Icon
                src={leftMenuBarIcon}
                style={[
                  menuStyles.leftMenuBarIcon,
                  props.title ? { tintColor: colors.BLACK } : {},
                ]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default Header
