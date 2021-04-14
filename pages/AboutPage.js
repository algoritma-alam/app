import React, { useState, useEffect, useCallback } from 'react';
import {  View, SafeAreaView, Image, Text, StatusBar, ImageBackground, TouchableWithoutFeedback, Linking, ScrollView, Platform } from 'react-native'
import { tailwind, getColor } from "@resources/tailwind"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'
import TypeWriter from 'react-native-typewriter'
import { YoutubeIcon, FacebookIcon, InstagramIcon, ArrowDown, SignatureSimbah } from '@resources/icons'


export default function( { children, navigation } ) {

  const AlgoritmaAlamLogo = require('@assets/images/logo-white.png')
  const AlgoritmaAlam     = require('@assets/images/about/algoritma-alam.png')
  const Simbah            = require('@assets/images/about/simbah.png')

  const [ selectedQuote, setSelectedQuote ] = useState(0)

  const quotesMbah = [
    "Nak, jika ingin bahagia, kamu harus berdamai dengan penderitaan",
    "Manusia yang tangguh bukan yang selalu menang dan mengalah pada pertempuran melainkan mereka yang mampu mengendalikan diri dan stabil menjaga kesadaran",
    "Ternyata Kekurangan adalah keberuntungan yang malang, dan kelebihan adalah kemalangan yg beruntung",
    "Jagad amung ana ing cokro panggilingan, tan ana purbo tan ana wusanane",
    "Ndonyane Kakean Wong pinter nganti podo lali karo kautaman",
    "Semua Musibah sesungguhnya adalah berkah bagi mereka yang mampu melewatinya."
  ]

  const openLinkHandler = useCallback( async (to) => {

    const instagram = "https://www.instagram.com/algoritma_alam/"
    const youtube   = "https://www.youtube.com/channel/UC8tZzPPYspzb2fEi0e8udXA"
    const facebook  = "https://www.facebook.com/profile.php?id=100063679443499"

    switch(to) {
      case 'instagram':
        await Linking.openURL(instagram)
        break
      case 'youtube':
        await Linking.openURL(youtube)
        break
      case 'facebook':
        await Linking.openURL(facebook)
        break
    }


  })

  useEffect(() => {
    setSelectedQuote(
      Math.floor(Math.random() * quotesMbah.length)
    )
  })

  return (
    <>
      <StatusBar barStyle="light-content" />

        <View style={[tailwind('w-full h-full bg-brand-dark')]}>
          <ScrollView
            pagingEnabled
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >

          <View style={[{ height: hp(100) }, tailwind('bg-brand') ]}>
            <SafeAreaView style={[tailwind('flex  justify-center  z-50 '), { height: hp(100) }]}>

                <View style={[{ paddingHorizontal: wp(5), paddingVertical: hp(5) }]}>
                  <Text style={[tailwind('text-white text-5xl font-black'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                    Algoritma Alam.
                  </Text>

                  <Text style={[tailwind('text-white text-2xl '), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                    Channel keilmuan yang menyajikan cara menggali sastra leluhur, menangkap pesan pesan tersembunyi dari kisah sejarah, mitos mistis ataupun legenda, dengan dibungkus sebuah cerita dongeng.
                  </Text>

                  <TypeWriter typing={1} maxDelay={18} fixed={true} style={[tailwind('text-white text-2xl  mt-3'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                    Dengan tujuan untuk mengembalikan manusia <Text style={tailwind('font-bold')}>Indonesia</Text> seutuhnya.
                  </TypeWriter>
                </View>

                <View style={[{ paddingHorizontal: wp(5), paddingBottom: hp(10) }]}>
                  <Text style={[tailwind('text-white text-xl font-light'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>@algoritma_alam</Text>
                  <View style={[ tailwind('flex flex-row items-center w-full -mx-1 mt-2')]}>
                    <TouchableWithoutFeedback onPress={() => openLinkHandler('youtube')} >
                      <YoutubeIcon  style={tailwind('w-6 h-6 text-white mx-1')}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => openLinkHandler('facebook')} >
                      <FacebookIcon style={tailwind('w-6 h-6 text-white mx-1')}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => openLinkHandler('instagram')} >
                      <InstagramIcon style={tailwind('w-6 h-6 text-white mx-1')}/>
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                <View style={[{ paddingHorizontal: wp(5), paddingBottom: hp(10) }, tailwind('absolute bottom-0 flex flex-row items-center justify-between  w-full')]}>
                  <ArrowDown style={[tailwind('w-5 h-8 text-white mx-2 opacity-70')]}/>
                  <FastImage source={AlgoritmaAlamLogo} style={[tailwind('w-20 h-12'), { marginRight: wp(5) } ]}/>
                </View>


            </SafeAreaView>
          </View>


          <View style={{ height: hp(100) }}>
            <FastImage source={AlgoritmaAlam} style={{ height: hp(100) }}>
              <LinearGradient
                colors={[getColor('brand-darker'), getColor('brand-dark opacity-50'), getColor('brand-dark')]}
                style={[tailwind('absolute top-0  left-0 right-0 h-full w-full'), { height: hp(100) }]}>
                    <SafeAreaView style={[tailwind(` w-full  flex  h-full justify-start  z-50 ${hp(100) > 700 ? 'mt-11' : ''}`), { height: hp(100), paddingHorizontal: wp(5), paddingVertical: ( hp(100) > 700 ) ? hp(10) : hp(4) }]}>
                        <FastImage source={AlgoritmaAlamLogo} style={tailwind('w-20 h-12')}/>
                        <View style={[{ marginTop: hp(1) }]}>
                          <Text style={[tailwind('text-white text-xl'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                            Kita semua kebetulan hidup pada jaman materialistis, manusia dituntut untuk mengikuti kebenaran menurut akal, atau yang kami sebut <Text style={tailwind('font-bold')}>"ilmu barat"</Text>
                          </Text>
                        </View>

                        <View style={[{ marginTop: hp(2) }]}>
                          <Text style={[tailwind('text-white text-xl'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                            Jaman digital teknologi yang super maju demi memudahkan kehidupan manusia, namun dibalik semua itu, kami melihat sebuah krisis nilai, karena secara otomatis, manusia jadi berpemikiran pragmatis
                          </Text>
                        </View>

                        <View style={[{ marginTop: hp(2) }]}>
                          <Text style={[tailwind('text-white text-xl'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                            Kami khawatir gerusan "ilmu barat" tanpa sadar, teknologi sedang menanam candu, hukum sedang menggerus etika, kecerdasan menggerogoti nilai, logika membutakan hati, hasil sedang menciderai proses, ognum sedang menjauhkan agama dari budi, duniawai sedang menutup pintu surga  <Text style={tailwind('text-white font-black')}>dan manusia sedang membunuh tuhan-nya.</Text>
                          </Text>
                        </View>

                        <View style={[{ marginTop: hp(2), alignSelf: 'center' }]}>
                          <Text style={[tailwind('text-white text-2xl'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                            - Algoritma Alam -
                          </Text>
                        </View>

                    </SafeAreaView>
                </LinearGradient>
              </FastImage>
            </View>


            <View style={{ height: hp(100) }}>
              <FastImage source={Simbah} style={{ height: hp(100) }}>
                <LinearGradient
                  colors={[getColor('brand-darker'), getColor('brand-dark opacity-50'), getColor('brand-dark')]}
                  style={[tailwind('absolute top-0  left-0 right-0 h-full w-full'), { height: hp(100) }]}>
                      <SafeAreaView style={[tailwind(' w-full h-full  z-50 '), { height: hp(100), paddingHorizontal: wp(5), paddingVertical: hp(10) }]}>
                        <View style={[tailwind('absolute bottom-0 w-full flex flex-row items-end '), { marginBottom: hp(10), width: wp(100), paddingHorizontal: wp(5) }]}>
                            <View>
                              <Text style={[tailwind('text-white text-2xl'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                                {`${quotesMbah[selectedQuote]}`}
                              </Text>

                              <Text style={[tailwind('text-white text-2xl'), { fontFamily: Platform.OS == 'ios' ? 'Caveat' : 'caveat' }]}>
                                - Simbah
                              </Text>

                              <SignatureSimbah style={[tailwind('text-white w-32 h-32')]} />
                            </View>
                        </View>

                      </SafeAreaView>
                  </LinearGradient>
                </FastImage>
              </View>
          </ScrollView>

      </View>

    </>
  )

}
