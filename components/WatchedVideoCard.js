import React from 'react';
import { Image, ImageBackground, View, Text, TouchableOpacity} from 'react-native'
import { tailwind, getColor } from "@resources/tailwind"
import { PlayIcon } from '@resources/icons'
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function WatchedVideoCard({ video: { item } }) {

  const navigation = useNavigation()

  const { thumbnailStatic, id } = item

  const playVideo = () => {
    navigation.navigate('VideoPlayerModal', {video: item})
  }

  const LogoRibbon = require('@assets/images/logo-ribbon.png')
    return (
        <View style={[tailwind('flex bg-brand-darker'), { width: wp(87/3), marginBottom: hp(1) }]}>
          <View style={[tailwind('absolute left-2 top-0  z-20')]}>
            <Image source={LogoRibbon} style={[tailwind('h-8 w-8'), { resizeMode: 'center' }]}/>
          </View>

          <ImageBackground source={thumbnailStatic} style={tailwind('h-40 w-full flex items-center justify-center relative')}>
            <TouchableOpacity activeOpacity={.5} onPress={playVideo}>
              <PlayIcon style={ tailwind('h-5 w-5 ') } circleStyle={tailwind('bg-brand-dark')} />
            </TouchableOpacity>
            <View style={tailwind('absolute h-14 w-full top-0')}>
              <LinearGradient colors={[ getColor('brand-darker opacity-80'), 'transparent']} style={tailwind('absolute top-0  left-0 right-0 h-full w-full')} />
            </View>
          </ImageBackground>
          <View style={[tailwind('bg-brand-dark w-full h-9 -mt-4 flex items-start justify-center relative ')]}>
            <View style={[tailwind('w-full h-0.5 z-30 absolute top-0'), { backgroundColor: '#8E1013', width: Math.floor(Math.random() * 100) }]} />
            <View style={[tailwind('w-full h-0.5 z-20 bg-opacity-40 absolute top-0'), { backgroundColor: '#fff' }]} />
            <Text style={tailwind('text-white text-sm text-opacity-50 ml-1')}> {Math.floor(Math.random() * 3) + 1 }j {Math.floor(Math.random() * 59)}m</Text>
          </View>

        </View>
    )
}
