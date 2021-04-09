import React from 'react';
import { Image, ImageBackground, View, Text, TouchableOpacity} from 'react-native'
import { tailwind } from "@resources/tailwind"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Svg, {
  Path
} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function VideoCard(props) {

  const { video: { item } } = props
  const { thumbnailStatic, id } = item

  const { style } = props

  const cardWidth  = style?.width ?? wp(86/3)
  const cardHeight = cardWidth * 1.5

  const navigation = useNavigation()

  const playVideo = () => {
    navigation.navigate('VideoPlayerModal', {video: item})
  }

  const EmptyVideoCard = () => {
      return (
          <View style={[tailwind(' relative'), { width: cardWidth, height: cardHeight }]} {...style}/>
      )
  }

  const LogoRibbon = require('@assets/images/logo-ribbon.png')
  return (id !== undefined)
    ? (
        <TouchableWithoutFeedback onPress={playVideo}>
          <View style={[tailwind('flex relative bg-brand-darker'), { width: cardWidth, marginBottom: hp(1), height: cardHeight }]} {...style}>
            <View style={[tailwind('absolute left-1 top-0  z-20')]}>
              <FastImage source={LogoRibbon} style={[tailwind('h-8 w-8'), { resizeMode: 'center' }]}/>
            </View>

            <FastImage source={thumbnailStatic} style={[tailwind(' relative w-full'), { height: cardHeight }]}  />

          </View>
        </TouchableWithoutFeedback>
    )
    : <EmptyVideoCard />
}
