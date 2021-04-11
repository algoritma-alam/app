import React, { useCallback } from 'react';
import {  View, SafeAreaView, Image, Text, StatusBar, ImageBackground, TouchableWithoutFeedback, Linking, Platform } from 'react-native'
import { tailwind, getColor } from "@resources/tailwind"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image'

export default function( { children, navigation } ) {

  const LogoRibbon = require('@assets/images/logo-ribbon-long.png')
  const Pattern = require('@assets/images/blueprint-white-pattern.png')

  const openLinkHandler = useCallback( async () => {

    const url = "https://linktr.ee/Algoritmaalam.id"

    await Linking.openURL(url)

  })

  return (
    <>
      <StatusBar barStyle="light-content" />

        <View style={[tailwind('w-full h-full')]}>
          <ImageBackground source={Pattern}
            style={
                    {
                      width: '100%',
                      height: '100%',
                      backgroundColor: getColor('brand-dark')
                    }
                  }
            imageStyle={{ resizeMode: 'repeat', opacity: .3 }} >
            <SafeAreaView style={[ tailwind('flex relative h-full pt-10'), { width: wp(90), marginHorizontal: wp(5) }]}>
              <View style={[tailwind('absolute inset-0  z-20 ')]}>
                <View style={tailwind('flex flex-row justify-between items-center w-full')}>
                  <FastImage source={LogoRibbon} style={[tailwind(' w-16 h-32'), {resizeMode: 'cover'}]} />
                </View>
              </View>

              <View style={[tailwind(' w-full flex  justify-center z-50'), { marginVertical: hp(15), height: hp(60) }]}>
                <View style={[tailwind('w-full')]}>
                  <Text style={[tailwind(`text-white ${Platform.OS == 'ios' ? 'font-black' : 'font-bold'} text-6xl`)]}>Coming</Text>
                  <Text style={[tailwind(`-mt-5 text-white ${Platform.OS == 'ios' ? 'font-black' : 'font-bold'} text-6xl`)]}>soon...</Text>
                </View>
                <View style={[tailwind('w-full mt-2')]}>
                  <Text style={[tailwind('text-white font-light  text-sm')]}>Merch belum tersedia di versi Aplikasi saat ini,</Text>
                  <Text style={[tailwind('text-white font-light text-sm')]}>tapi kamu bisa mengunjungi <Text style={[tailwind('font-bold')]}>Official Store</Text> dengan</Text>
                  <TouchableWithoutFeedback onPress={openLinkHandler}>
                    <Text style={[tailwind('font-bold text-white underline')]}>Klik Disini</Text>
                  </TouchableWithoutFeedback>

                </View>
              </View>

            </SafeAreaView>
          </ImageBackground>
      </View>

    </>
  )

}
