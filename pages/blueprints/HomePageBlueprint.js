import React, { useState, useEffect } from 'react';
import {  View,SafeAreaView, StatusBar } from 'react-native'
import { tailwind } from "@resources/tailwind"
import VideoCardBlueprint from '@components/VideoCardBlueprint'
import WatchedVideoCardBlueprint from '@components/WatchedVideoCardBlueprint'

export default function( { children } ) {

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={ tailwind('flex relative h-full bg-brand-dark items-center pt-10') }>
        <View  style={[  tailwind('bg-brand-darker  mt-5 flex items-center justify-between flex-col') , { width: '90%', height: '50%' } ]}>

          <View style={[ { width: '100%' }, tailwind('mt-10 flex flex-row items-center justify-evenly') ]}>
            <View style={[  tailwind('bg-brand-darkest h-3 mb-2'), {width: '20%'}  ]} />
            <View style={[  tailwind('bg-brand-darkest h-3 mb-2'), {width: '20%'}  ]} />
            <View style={[  tailwind('bg-brand-darkest h-3 mb-2'), {width: '40%'}  ]} />
          </View>

          <View style={[{ width: '100%' }, tailwind('flex flex-col justify-end items-center')]}>
            <View style={[  tailwind('bg-brand-darkest h-6 mb-2'), {width: '80%'}  ]} />
            <View style={[ { width: '95%' }, tailwind('flex mb-2 flex-row items-center justify-evenly') ]}>
              <View style={[  tailwind('bg-brand-darkest h-2 '), {width: '10%'}  ]} />
              <View style={[  tailwind('bg-brand-darkest h-2 '), {width: '30%'}  ]} />
              <View style={[  tailwind('bg-brand-darkest h-2 '), {width: '25%'}  ]} />
              <View style={[  tailwind('bg-brand-darkest h-2 '), {width: '15%'}  ]} />
            </View>
            <View style={[  tailwind('bg-brand-darkest h-4 mb-10'), {width: '60%'}  ]} />
          </View>


        </View>
        <View  style={[  tailwind('bg-brand-darker  mt-3') , { width: '60%', height: '4%' } ]}/>

        <View style={[ { width: '95%' }, tailwind('flex mb-2 mt-5  flex-row items-center justify-between overflow-hidden') ]}>
          <WatchedVideoCardBlueprint />
          <WatchedVideoCardBlueprint />
          <WatchedVideoCardBlueprint />
          <WatchedVideoCardBlueprint />
        </View>

        <View style={[ { width: '95%' }, tailwind('flex mb-2 mt-5  flex-row items-center justify-between overflow-hidden') ]}>
          <VideoCardBlueprint />
          <VideoCardBlueprint />
          <VideoCardBlueprint />
          <VideoCardBlueprint />
        </View>
      </SafeAreaView>




      { children }
    </>
  )

}
