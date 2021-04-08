import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-custom-controls';
import { TouchableWithoutFeedback, PanResponder } from 'react-native'
import Orientation from 'react-native-orientation';
import { tailwind, getColor } from '@resources/tailwind'
import { View, Text, Animated } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import BackButtonX from '@components/BackButtonX';
import { PlayButton, PauseButton } from '@resources/icons'
import Draggable from 'react-native-draggable';

export default function({ route, navigation }) {

  const PLAYER_HIDE_TIMEOUT = 5000;

  const [ videoDuration, setVideoDuration ] = useState(0)
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ playerControlShown, showPlayerControl ] = useState(false)
  const [ isPaused, pauseVideo ] = useState(false)
  const [ videoPanActive, setVideoPanActive ] = useState(false)

  const { video: { video_url, title } } = route.params

  // refs
  const videoPan = useRef(new Animated.ValueXY()).current;
  const player = useRef()
  const videoDurationRef = useRef()
  const videoPlayerControlTimeout = useRef()

  videoDurationRef.current = videoDuration

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

    updateVideoPan()
  }

  const updateVideoPan = () => {

    const position = (currentTime / videoDuration * 100)

    const panXOffset = position / 100 * (hp(90) / hp(100) * hp(90))

    videoPan.setOffset({x: panXOffset})

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

  const seekVideoProgress = (gestureState) => {
    const offsetLimit = hp(100)
    const moveOffset = (gestureState.moveX > offsetLimit) ? offsetLimit : gestureState.moveX;
    const progressPercent = moveOffset / hp(100) * 100
    const progressToVideoTime = progressPercent / 100 * videoDurationRef.current

    player.current.seek(progressToVideoTime)
  }

  const togglePlayerControl = () => {

    if( videoPlayerControlTimeout.current ) {
      clearTimeout(videoPlayerControlTimeout.current)
    }

    if( playerControlShown && currentTime > 3 ) {
      return showPlayerControl(false)
    }

    showPlayerControl(true)

    videoPlayerControlTimeout.current = setTimeout(() => showPlayerControl(false), PLAYER_HIDE_TIMEOUT)
  }

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        setVideoPanActive(true)
        clearTimeout(videoPlayerControlTimeout.current)
        videoPlayerControlTimeout.current = null
      },
      onPanResponderMove: (evt, gestureState) => {
        seekVideoProgress(gestureState)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        setVideoPanActive(false)
        videoPlayerControlTimeout.current = setTimeout(() => showPlayerControl(false), PLAYER_HIDE_TIMEOUT)
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    })
  ).current;


  useEffect(() => {
    configureVideoPlayer()

    return () => {
      Orientation.lockToPortrait()
    }
  }, [])

  return (
    <>
          <Video
            ref={player}
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
                onPress={() => togglePlayerControl()}>
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
                    <View style={[  tailwind('flex items-center justify-between'), { marginBottom: hp(5), marginHorizontal: wp(10) } ]} >
                      <View style={[ tailwind('flex flex-row items-center justify-between'), {width: '100%'} ]}>
                        <View style={[ { width: '91%' } ]}>
                          <View style={[tailwind('absolute top-0 h-1 bg-white opacity-30 rounded-lg'), { width: '100%' }]} />
                          <View style={[{ width: `${ currentTime / videoDuration * 100}%` }, tailwind('flex flex-row items-center justify-between absolute top-0 ') ]}>
                            <View style={[tailwind('h-1 bg-brand rounded-lg'), { width: '100%' }]} />
                            <Animated.View
                              style={[
                                tailwind(`absolute  ${videoPanActive ? 'h-5 w-5' : 'h-4 w-4'} bg-brand rounded-full`), {
                                transform: [{ translateX: videoPan.x }]
                              }]}
                              {...panResponder.panHandlers}
                            />
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
                style={[{ width: '100%', height: '100%' }, tailwind('')]}>
                <View style={[{ width: '100%', height: '100%' }, tailwind('')]} />
              </TouchableWithoutFeedback>
        }

    </>

  )

}
