import React, { useState, useEffect } from 'react';
import {  View, Image, ImageBackground, Text} from 'react-native'
import { tailwind, getColor } from "@resources/tailwind"
import { LinearGradient } from 'expo-linear-gradient';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image'

export default function({ category: { item } }) {

  const navigation = useNavigation()

  const { name, slug, illustration }  = item

  const categoryClickedHandler = () => {
    navigation.navigate('category-details', {slug: slug})
  }

  return (
      <View style={[tailwind('rounded-lg relative bg-brand-darker  flex  justify-end overflow-hidden'), {width: wp('44%'), height: hp('35%')}]}>
        <TouchableWithoutFeedback onPress={categoryClickedHandler}>
          <FastImage source={illustration}  style={tailwind('w-full h-full')}>
            <LinearGradient colors={['transparent', getColor('brand-dark opacity-80'), getColor('brand-darker')]} style={tailwind('absolute top-0  left-0 right-0 h-full w-full')}>
              <View style={[ tailwind('absolute bottom-0 w-full'), { height: '40%', paddingBottom: '8%' } ]}>
                <View style={[ tailwind('flex justify-end h-full'), { width: '95%', paddingHorizontal: '5%' } ]}>
                  <Text numberOfLines={1} style={ tailwind('text-white font-bold text-lg') }>{ name.toUpperCase() }</Text>
                  <Text numberOfLines={1} style={ tailwind('text-white font-light opacity-70 text-xs') }>{item.videos.length > 0 ? `${item.videos.length} video` : 'Belum ada video'}</Text>
                </View>
              </View>
            </LinearGradient>
          </FastImage>
        </TouchableWithoutFeedback>
      </View>
  )
}
