import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, Image, Text, StatusBar } from 'react-native'
import { tailwind, getColor } from "@resources/tailwind"
import BackButtonX from '@components/BackButtonX';
import {FlatList} from 'react-native-gesture-handler';
import categories from '@resources/categories'
import videos from '@resources/videos'
import CategoryListingBlueprint from '@pages/blueprints/CategoryListingBlueprint';
import CategoryCover from '@components/CategoryCover';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image'

export default function( { children, navigation } ) {

  const categoriesWithVideos = categories.map((category) => {
    return {videos: videos.filter((v) => v.categories.includes(category.slug)), ...category}
  })

  const LogoRibbon = require('@assets/images/logo-ribbon-medium.png')
  const [ isCategoryLoaded, setCategoryLoaded ] = useState(false)

  useEffect(() => {
    const categoryTimer = setTimeout(() => setCategoryLoaded(true), 1500)

    return () => clearTimeout(categoryTimer)
  })

  return (
    <>
      <StatusBar barStyle="light-content" />

      {
        ! isCategoryLoaded
          ? <CategoryListingBlueprint />
          : (<>

          <View style={tailwind('bg-brand-dark w-full h-full')}>
            <SafeAreaView style={[ tailwind('flex relative h-full   pt-10'), { width: wp(90), marginHorizontal: wp(5) }]}>
              <View style={[tailwind('absolute inset-0  z-20  ')]}>
                <View style={tailwind('flex flex-row justify-between items-center w-full')}>
                  <FastImage source={LogoRibbon} style={[tailwind(' w-14 h-20'), {resizeMode: 'cover'}]} />
                  <BackButtonX style={tailwind('mt-12')} onPress={() => navigation.goBack()}/>
                </View>

                <Text style={tailwind('text-white mt-5 font-bold text-3xl')}>KATEGORI</Text>
                <FlatList
                  style={[tailwind('mt-5  z-50 mb-5 w-full ')]}
                  contentContainerStyle={{ paddingBottom: '10%' }}
                  columnWrapperStyle={[tailwind('flex flex-row items-center  justify-between  w-full'), {marginBottom: hp(5)}]}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                  data={categoriesWithVideos}
                  renderItem={(item) => (
                      <CategoryCover category={item} />
                  )}
                  keyExtractor={(item) => item.id}
                />

              </View>



          </SafeAreaView>
        </View>
        </>)
      }

      { children }
    </>
  )

}
