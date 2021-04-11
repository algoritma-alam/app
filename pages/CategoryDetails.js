import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, Image, Text, ImageBackground, ScrollView, StatusBar } from 'react-native'
import { tailwind, getColor } from "@resources/tailwind"
import BackButtonX from '@components/BackButtonX';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import categories from '@resources/categories'
import videos from '@resources/videos'
import CategoryListingBlueprint from '@pages/blueprints/CategoryListingBlueprint';
import CategoryCover from '@components/CategoryCover';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import EmptyState from '../resources/icons/EmptyState';
import VideoCard from '@components/VideoCard'

export default function( { route, navigation } ) {

  const { slug } = route.params
  const category = categories.find(c => c.slug == slug)
  const videosWithCategory = videos.filter(v => v.categories.includes(slug))

  const totalVideos = videosWithCategory.length

  if( videosWithCategory.length != 0 ) {
    // quick & dirty solutions, should make a better one.

    if( (videosWithCategory.length / 3 % 1) != 0 ) {

      const additionalEmptyVideos = (videosWithCategory.length / 3 % 1).toFixed(2) > .6 ? 1 : 2;

      for(let i = 0; i < additionalEmptyVideos; i++) {
        videosWithCategory.push({__empty: true})
      }

    }

  }


  const { illustration, name } = category

  const LogoRibbon = require('@assets/images/logo-ribbon-medium.png')

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={tailwind('bg-brand-dark w-full h-full')}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[{ width: wp(100), height: hp(65), resizeMode: 'center' }, tailwind('absolute left-0 right-0 top-0 bg-brand-darker') ]}>
            <ImageBackground source={illustration} style={ tailwind('w-full h-full') }>
              <LinearGradient colors={['transparent', getColor('brand-dark opacity-80'), getColor('brand-dark')]} style={tailwind('absolute top-0  left-0 right-0 h-full w-full')}>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View style={[{ width: wp(90), marginHorizontal: wp(5)}, tailwind('h-full relative')]}>
            <View style={[tailwind('absolute inset-0  z-20  ')]}>
              <View style={tailwind('flex flex-row justify-between items-center')}>
                <Image source={LogoRibbon} style={[tailwind(' w-14 h-20'), {resizeMode: 'cover'}]} />
              </View>
            </View>

            <View style={tailwind('flex items-start h-full z-50')}>
              {
                (videosWithCategory.length > 0 )
                  ? (

                    <>
                      <View style={[tailwind('bg-brand'), { height: hp(40) }]} />
                      <View style={{ paddingBottom: wp(20) }}>
                        <Text style={tailwind('text-white z-20 font-black text-3xl')}>{ name.toUpperCase() }</Text>
                        <Text style={tailwind('text-white z-20 opacity-70 text-sm')}>{ `🍿 ${totalVideos} video` }</Text>
                        <View style={[tailwind('flex flex-row justify-between flex-wrap mt-5 w-full')]}>
                          {
                            videosWithCategory.map(video => {
                              return (
                                <VideoCard video={{ item: video }} />
                              )
                            })
                          }
                        </View>
                      </View>
                    </>
                  )
                  : (

                    <>
                      <View style={[tailwind('bg-brand'), { height: hp(50) }]} />
                      <View>
                        <Text style={tailwind('text-white z-20 font-black text-3xl')}>{ name.toUpperCase() }</Text>
                        <Text style={[tailwind('text-white z-20 opacity-70 mt-3 text-sm')]}>{ `Belum Ada Video 🙏` }</Text>
                      </View>
                    </>
                  )
              }
            </View>

          </View>

      </ScrollView>

      <View style={[{ width: wp(90), marginHorizontal: wp(5)}, tailwind('absolute right-0 flex items-center justify-end flex-row')]}>
        <BackButtonX style={tailwind('mt-12 z-50 ')} onPress={() => navigation.goBack()}/>
      </View>
    </View>

    </>
  )

}
