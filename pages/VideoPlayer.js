import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-custom-controls';
import { StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation';
import { tailwind, getColor } from '@resources/tailwind'
import { View, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import BackButtonX from '@components/BackButtonX';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { PlayButton, PauseButton } from '@resources/icons'

export default function({ route, navigation }) {

  const [ videoDuration, setVideoDuration ] = useState(0)
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ playerControlShown, showPlayerControl ] = useState(false)
  const [ isPaused, pauseVideo ] = useState(false)

  const { video: { video_url, title } } = route.params

  const player = useRef()

  const onBuffer = () => {
    console.log('buffering')
  }

  const videoError = () => {
    console.log('error')
  }

  const onVideoLoad = (meta) => {
    togglePlayerControl()
    setVideoDuration(meta.duration)
  }

  const onVideoProgress = (meta) => {
    setCurrentTime(Math.ceil(meta.currentTime))
  }

  const formatDuration = (duration) => {
    var sec_num = parseInt(duration, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
  }

  const configureVideoPlayer = () => {
    const initialOrientation = Orientation.getInitialOrientation();

    if( initialOrientation == 'PORTRAIT' ) {
      Orientation.lockToLandscape()
    }

  }

  const togglePlayerControl = () => {

    console.log(playerControlShown)

    if( playerControlShown && currentTime > 3 ) {
      return showPlayerControl(false)
    }

    showPlayerControl(true)

    setTimeout(() => showPlayerControl(false), 5000)

  }


  useEffect(() => {
    configureVideoPlayer()

    return () => {
      Orientation.lockToPortrait()
    }
  }, [])

  return (
    <>
          <Video
            source={{uri: video_url}}
            onBuffer={onBuffer}
            onError={videoError}
            onLoad={onVideoLoad}
            onProgress={onVideoProgress}
            paused={isPaused}
            progressUpdateInterval={1000}
            seekColor={ getColor('brand') }
            resizeMode="cover"
            volume={1}
            style={[tailwind('absolute bottom-0 top-0 left-0 right-0 bg-brand-dark')]} />


        {
          playerControlShown ?

              <TouchableWithoutFeedback
                onPress={() => togglePlayerControl()} >
                <LinearGradient
                  colors={[getColor('brand-dark'), getColor('brand-dark opacity-60'), getColor('brand-dark')]}
                  style={[tailwind(' w-full flex  justify-between h-full')]}>

                    <View style={[  tailwind('flex flex-row items-center justify-between'), { marginTop: hp(2.5), marginHorizontal: wp(10) }  ]}>
                      <Text style={ tailwind('text-white font-bold text-xl') }>{ title }</Text>
                      <BackButtonX style={tailwind('bg-transparent')} innerStyle={ tailwind('text-white opacity-100 font-extrabold') } onPress={() => navigation.goBack()}/>
                    </View>
                    <View style={[  tailwind('flex flex-row items-center justify-center'), { marginTop: hp(2.5), marginHorizontal: wp(10) }  ]}>
                      {
                        isPaused
                          ? <TouchableWithoutFeedback onPress={() => pauseVideo(false)}><PlayButton style={tailwind('text-white h-10 w-10')} /></TouchableWithoutFeedback>
                          : <TouchableWithoutFeedback onPress={() => pauseVideo(true)}><PauseButton style={tailwind('text-white h-10 w-10')} /></TouchableWithoutFeedback>
                      }
                    </View>
                    <View style={[  tailwind('flex items-center justify-between'), { marginBottom: hp(5), marginHorizontal: wp(5) } ]}>
                      <View style={[ tailwind('flex flex-row items-center justify-between'), {width: '100%'} ]}>
                        <View style={[ { width: '92%' } ]}>
                          <View style={[tailwind('absolute top-0 h-1 bg-white opacity-30 rounded-lg'), { width: '100%' }]} />
                          <View style={[{ width: `${ currentTime / videoDuration * 100}%` }, tailwind('flex flex-row items-center justify-between absolute top-0 ') ]}>
                            <View style={[tailwind('h-1 bg-brand rounded-lg'), { width: '100%' }]} />
                            <View style={[tailwind('absolute right-0 h-5 w-5 bg-brand rounded-full')]} />
                          </View>
                        </View>
                        <Text style={[  tailwind('text-white'), { width: '7%' }  ]}>{ formatDuration(videoDuration - currentTime) }</Text>
                      </View>
                    </View>
                </LinearGradient>
              </TouchableWithoutFeedback>
            :
              <TouchableWithoutFeedback
                onPress={() => togglePlayerControl()}
                style={[{ width: '100%', height: '100%' }, tailwind('')]} />
        }

    </>

  )

}
