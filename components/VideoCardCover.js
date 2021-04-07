import React from 'react';
import { Image, ImageBackground, View, Text, TouchableOpacity} from 'react-native'
import { tailwind } from "@resources/tailwind"
import Svg, {
  Path
} from 'react-native-svg';

export default function VideoCard(props) {

  const EmptyVideoCardCover = () => {
      return (
          <View style={tailwind('h-48 w-32')} />
      )
  }

  const { video: { item } } = props
  const { thumbnailStatic, id } = item


  const LogoRibbon = require('@assets/images/logo-ribbon.png')
  return (id !== undefined)
    ? (
      <View style={tailwind('flex relative')}>
        <View style={[tailwind('absolute left-1 top-0  z-20')]}>
          <Image source={LogoRibbon} style={[tailwind('h-8 w-8'), { resizeMode: 'center' }]}/>
        </View>

        <ImageBackground source={thumbnailStatic} style={tailwind('h-48 w-32 relative')} />

      </View>
    )
    : (<EmptyVideoCardCover />)
}
