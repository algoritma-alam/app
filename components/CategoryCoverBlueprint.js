import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, Image} from 'react-native'
import { tailwind } from "@resources/tailwind"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function() {
  return (
    <View style={[tailwind('h-64 rounded-lg bg-brand-darker flex overflow-hidden justify-end'), {width: wp('44%'), height: hp('35%')}]}>
      <View style={[tailwind('w-full h-full bg-brand-darkest mb-5')]} />
      <View style={[tailwind('flex flex-col justify-end'), {width: '100%', height: '40%', paddingBottom: '8%'}]}>
        <View style={[tailwind('  bg-brand-darkest h-4'), {width: '85%', marginLeft: '5%'}]}/>
        <View style={[tailwind('  bg-brand-darkest h-2 mt-1'), {width: '60%', marginLeft: '5%'}]}/>
      </View>
    </View>
  )
}
