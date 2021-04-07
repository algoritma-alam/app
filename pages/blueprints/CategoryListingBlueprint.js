import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, Image, Text, StatusBar } from 'react-native'
import { tailwind, getColor } from "@resources/tailwind"
import BackButtonX from '@components/BackButtonX';
import {FlatList} from 'react-native-gesture-handler';
import CategoryCoverBlueprint from '@components/CategoryCoverBlueprint';
import { useNavigation } from '@react-navigation/native';

export default function( { children } ) {

  const LogoRibbon = require('@assets/images/logo-ribbon-medium.png')

  const navigation = useNavigation()

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={tailwind('bg-brand-dark w-full h-full')}>
        <SafeAreaView style={[ tailwind('flex relative h-full pt-10'), { width: '90%', marginHorizontal: '5%' }]}>
          <View style={[tailwind('absolute inset-0  z-20  ')]}>
            <View style={tailwind('flex flex-row justify-between items-center w-full')}>
              <Image source={LogoRibbon} style={[tailwind('w-14 h-20'), {resizeMode: 'cover'}]} />
              <BackButtonX style={tailwind('mt-12')} onPress={() => navigation.goBack()}/>
            </View>

            <Text style={tailwind('text-white mt-5 font-bold text-3xl')}>KATEGORI</Text>
            <FlatList
              style={[tailwind('mt-5 z-50 mb-5 w-full')]}
              columnWrapperStyle={[tailwind('flex flex-row items-center justify-between  w-full mb-5')]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              data={[{}, {}, {}, {}]}
              renderItem={() => <CategoryCoverBlueprint />}
              keyExtractor={() => Math.random()}
            />

        </View>



      </SafeAreaView>
    </View>



      { children }
    </>
  )

}
