import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, useWindowDimensions, Button, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import tailwind from 'tailwind-rn';
import { useResponsiveImageView } from 'react-native-responsive-image-view';
import videos from '../resources/videos'

import Svg, {
  Path
} from 'react-native-svg';

export default function RecomendedVideo({children}) {

  const LogoRibbon = require('../assets/images/logo-ribbon.png')

  const [ recomendedVideo, setRecomendedVideo ] = useState(videos[0])

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;


  useEffect(() => {

    setRecomendedVideo(videos[Math.floor(Math.random() * videos.length)])

  }, [])

  const { getViewProps, getImageProps } = useResponsiveImageView({ source: recomendedVideo.thumbnailStatic });

  const recomendedVideoThumbnailHeight = (windowHeight > 800) ? hp('70%') : hp('80%')


  const renderWatchedVideoCard = ({ item }) => {

    const { thumbnailStatic } = item


    return (
      <View style={tailwind('flex relative')}>
        <View style={[tailwind('absolute left-2 top-0  z-20')]}>
          <Image source={LogoRibbon} style={[tailwind('h-10 w-5'), { resizeMode: 'cover' }]}/>
        </View>

        <ImageBackground source={thumbnailStatic} style={tailwind('h-40 w-28 relative')}>
          <Svg style={[tailwind('w-16 h-16 absolute  inset-7')]}  viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M47.5 87.0833C69.3613 87.0833 87.0834 69.3613 87.0834 47.5C87.0834 25.6387 69.3613 7.91666 47.5 7.91666C25.6387 7.91666 7.91669 25.6387 7.91669 47.5C7.91669 69.3613 25.6387 87.0833 47.5 87.0833Z" fill-opacity="0.1" stroke="white" stroke-opacity="0.9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M39.5833 31.6667L63.3333 47.5L39.5833 63.3333V31.6667Z" stroke="white" stroke-opacity="0.9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </Svg>
          <View style={[tailwind('absolute bottom-0 w-full h-0.5 mb-7 z-30'), { backgroundColor: '#8E1013', width: Math.floor(Math.random() * 100) }]} />
          <View style={[tailwind('absolute bottom-0 w-full h-0.5 mb-7 z-20 bg-opacity-40'), { backgroundColor: '#fff' }]} />
          <View style={[tailwind('absolute bottom-0 w-full h-7 flex items-start justify-center px-2'), { backgroundColor: '#101010' }]}>
            <Text style={tailwind('text-white text-sm text-opacity-50')}> {Math.floor(Math.random() * 3) + 1 }j {Math.floor(Math.random() * 59)}m</Text>
          </View>
        </ImageBackground>

      </View>
    )
  }

  const renderVideoCard = ({ item }) => {

    const { thumbnailStatic } = item

    return (
      <View style={tailwind('flex relative')}>
        <View style={[tailwind('absolute left-2 top-0  z-20')]}>
          <Image source={LogoRibbon} style={[tailwind('h-10 w-5'), { resizeMode: 'cover' }]}/>
        </View>


        <ImageBackground source={thumbnailStatic} style={tailwind('h-40 w-28 relative')} />

      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#181818'}} style={{ backgroundColor: '#181818' }}  scrollEnabled={false}>
        <View style={{  alignItems: 'center', position: 'relative', marginBottom: windowHeight + (hp('50%')/hp('100%') * recomendedVideoThumbnailHeight) }}>
          <View style={[  styles.recomendedVideo, { height: recomendedVideoThumbnailHeight }  ]}>

            <View style={[tailwind('absolute inset-0 ml-5 z-20')]}>
              <Image source={LogoRibbon} style={[tailwind('w-12 h-24'), {resizeMode: 'cover'}]} />
            </View>

            <Image {...getImageProps()} />

            <View style={[tailwind('absolute bottom-0 left-0 right-0  flex items-center justify-center mt-2 ml-1 mr-1')]}>
              <Text style={[tailwind('text-white text-opacity-80 text-center font-bold'), { fontSize: 12 }]}>
                { recomendedVideo.tags.join('  •  ') }
              </Text>

              <TouchableOpacity activeOpacity={0.8} style={[tailwind('bg-white w-72 items-center  rounded-sm py-2 my-3 mb-4 '), { backgroundColor: '#8E1013' }]}>
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

            <View style={[tailwind('px-3 mt-5')]}>
              <Text style={tailwind('text-white font-bold')}>Lanjutkan Menonton untuk Mr Shohaib</Text>
              <FlatList
                nestedScrollEnabled={true}
                style={tailwind('mt-2 z-50')}
                horizontal
                data={videos}
                renderItem={renderWatchedVideoCard}
                ItemSeparatorComponent={() => <View style={{margin: 4, paddingHorizontal: 2}}/>}
              />

              <Text style={tailwind('text-white font-bold mt-2')}>Mitos Atau Fakta</Text>
              <FlatList
                style={tailwind('mt-2 z-20')}
                horizontal={true}
                data={videos.filter((video) => {
                  const { categories } = video
                  return categories.indexOf('mitos') >= 0;
                })}
                renderItem={renderVideoCard}
                ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
              />

              <Text style={tailwind('text-white font-bold mt-2')}>Episode Baru</Text>
              <FlatList
                style={tailwind('mt-2 z-20')}
                horizontal={true}
                data={videos}
                renderItem={renderVideoCard}
                ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
              />

              <Text style={tailwind('text-white font-bold mt-2')}>Kisah Tanah Jawa</Text>
              <FlatList
                style={tailwind('mt-2 z-20')}
                horizontal={true}
                data={videos.filter((video) => {
                  const { categories } = video
                  return categories.indexOf('kisah-jawa') >= 0;
                })}
                renderItem={renderVideoCard}
                ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
              />

              <Text style={tailwind('text-white font-bold mt-2')}>Kisah Perjalanan Simbah</Text>
              <FlatList
                style={tailwind('mt-2 z-20 pb-10')}
                horizontal={true}
                data={videos.filter((video) => {
                  const { categories } = video
                  return categories.indexOf('simbah') >= 0;
                })}
                renderItem={renderVideoCard}
                ItemSeparatorComponent={() => <View style={{margin: 4, paddingHorizontal: 4}}/>}
              />


            </View>

          </View>

        </View>

      </ScrollView>

      { children }
    </>

  )

}

const styles = StyleSheet.create({
  recomendedVideo: {
    borderColor: '#181818',
    borderWidth: 2,
    width: wp('100%'),
  },
  videoActions: {
    position: 'absolute',
    bottom: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
