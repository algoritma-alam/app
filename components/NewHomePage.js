import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, View, Text, useWindowDimensions, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { tailwind } from "@resources/tailwind"
import {FlatList} from 'react-native-gesture-handler';
import videos from '@resources/videos'
import categories from '@resources/categories'
import Svg, {
  Path
} from 'react-native-svg';
import { useResponsiveImageView } from 'react-native-responsive-image-view';
import { AlgoritmaAlamNoBackground } from '@resources/icons'
import WatchedVideoCard from '@components/WatchedVideoCard';
import VideoCard from '@components/VideoCard';
import Orientation from 'react-native-orientation';
import FastImage from 'react-native-fast-image'


export default function( { navigation } ) {

  const LogoRibbon = require('../assets/images/logo-ribbon-medium.png')
  const RECOMMENDED_VIDEO_INDEX = Math.floor(Math.random() * videos.length)

  const [recommendedVideo, setRecomendedVideo] = useState(videos[RECOMMENDED_VIDEO_INDEX])
  const { _, getImageProps } = useResponsiveImageView({ source: recommendedVideo.thumbnailStatic });

  const windowHeight = hp(100)
  //const recommendedVideoHeight = ( windowHeight > 600 && windowHeight < 700 ) ? (windowHeight > 700 && windowHeight < 800) ? hp('90%') : hp('95%') : hp('70%')

  let recommendedVideoHeight = hp(100)

  if( windowHeight > 400 && windowHeight < 700 ) {
    recommendedVideoHeight = hp(95)
  }
  else if(windowHeight > 700 && windowHeight < 800) {
     recommendedVideoHeight = hp(80)
  }
  else
  {
     recommendedVideoHeight = hp(70)
  }

  const categoriesToRender = categories
    .map(category => {

      return { ...category, videos: videos.filter(v => v.categories.includes(category.slug)) }

    })
    .filter(category => category.videos.length > 0)


  const configureOrientation = () => {
    Orientation.lockToPortrait()
  }

  useEffect(() => {

    const RECOMMENDED_VIDEO_INDEX_REFRESHED = Math.floor(Math.random() * videos.length)
    setRecomendedVideo(videos[RECOMMENDED_VIDEO_INDEX_REFRESHED])

    configureOrientation()

  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={[ tailwind('bg-brand-darker'), {  height: hp(100) } ]}>

        <ScrollView bounces={false} contentContainerStyle={[ { paddingBottom: hp(10) }]}>
          <View style={[tailwind('absolute inset-0 ml-5 z-20 w-12 h-20')]}>
            <FastImage source={LogoRibbon} style={[tailwind('w-14 h-20'), {resizeMode: 'cover'}]} />
          </View>

          <View style={[{ width: wp(100), height: recommendedVideoHeight, resizeMode: 'center' }, tailwind('bg-brand-darker') ]}>

            <ImageBackground { ... getImageProps() }>

              <SafeAreaView style={[ tailwind('z-20 px-3'), { marginTop: '15%' }]}>
                <View style={ tailwind('flex flex-col  justify-between') }>
                  <View style={tailwind('h-1/2  flex flex-row justify-evenly items-start z-50  ml-16')}>
                    <TouchableOpacity hitSlop={{ bottom: 15, top: 15, left: undefined, right: undefined }} onPress={() => navigation.navigate('category-details', {slug: 'horor'})} activeOpacity={0.6}>
                      <Text style={ tailwind('text-white text-sm font-light') }>HOROR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={{ bottom: 15, top: 15, left: undefined, right: undefined }} onPress={() => navigation.navigate('category-details', {slug: 'jati-diri'})} activeOpacity={0.6}>
                      <Text style={ tailwind('text-white text-sm font-light') }>JATI DIRI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={{ bottom: 15, top: 15, left: undefined, right: undefined }} onPress={() => navigation.navigate('category-listing')} activeOpacity={0.6}>
                      <View style={ tailwind('flex items-center flex-row') }>
                        <View style={tailwind('rounded-full bg-brand w-1.5 h-1.5 mr-0.5')} />
                        <Text style={ tailwind('text-white text-sm font-light') }>KATEGORI</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={[tailwind('h-1/2 flex items-center flex-col justify-end ') ]} >

                    <Text style={[tailwind('text-white text-opacity-80 text-center font-bold'), { fontSize: 12 }]}>
                      { recommendedVideo.tags.join('  •  ') }
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.8} style={[tailwind('bg-white w-72 items-center  rounded-sm py-2 my-3 mb-4 '), { backgroundColor: '#8E1013' }]}
                      onPress={() => navigation.navigate('VideoPlayerModal', {video: recommendedVideo})}>
                      <View style={tailwind('flex flex-row items-center justify-center')}>
                          <View style={tailwind('w-1/2 h-4 ')}>
                            <Svg viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg"  style={[tailwind('ml-12'), { color: '#8E1013' }]}>
                              <Path d="M2.5174 2.75L23.566 14L2.5174 25.25V2.75Z" fill="white" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            </Svg>
                          </View>
                          <View style={tailwind('w-1/2 h-4')}>
                            <Text style={[tailwind('text-white -ml-2 font-bold')]}>Putar</Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </ImageBackground>



          </View>

          <View style={[ tailwind('px-3 mt-5 flex items-start justify-between')]}>
              <Text style={ tailwind('text-white font-bold text-sm') }>Lanjutkan menonton</Text>
              <FlatList
                style={tailwind('-mx-3 mt-2 z-50 mb-5')}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={videos}
                renderItem={(item) => <WatchedVideoCard video={item} />}
                ItemSeparatorComponent={() => <View style={{margin: 4, paddingHorizontal: 2}}/>}
                contentContainerStyle={tailwind('px-3')}
              />


              {
                categoriesToRender.map(c => {
                  return (
                    <>
                      <Text style={ tailwind('text-white font-bold text-sm') }>{ c.name }</Text>
                      <FlatList
                        style={tailwind('-mx-3 mt-2 z-50 mb-2')}
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={c.videos}
                        renderItem={(item) => <VideoCard style={{ width: wp(90/3.3) }} video={item} />}
                        ItemSeparatorComponent={() => <View style={{margin: 2, paddingHorizontal: 2}}/>}
                        contentContainerStyle={tailwind('px-3')}
                      />
                    </>
                  )

                })
              }

          </View>

        </ScrollView>

      </View>

    </>
  )

}
