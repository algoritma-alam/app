import React, { useState, useEffect } from 'react';
import { Animated, ScrollView, View, Text, SafeAreaView, useWindowDimensions, StatusBar } from 'react-native'
import { tailwind } from "@resources/tailwind"
import { withAnchorPoint } from 'react-native-anchor-point';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function HomePageV2({ children }) {

    const getTransform = (width, height) => {
        let transform = {
            transform: [{ rotateX: '270deg' }],
        };
        return withAnchorPoint(transform, { x: 0, y: 0 }, { width: width, height: height });
    };

    const categoryWidth = parseInt(wp('5%'))

    return (
        <>
            <StatusBar barStyle="light-content" />

            <View style={ tailwind('flex relative h-full bg-brand-dark') }>
                <SafeAreaView style={[ tailwind('w-full flex items-start justify-center'), { height: '15%' }]}>
                    <Text style={[ tailwind('ml-5 text-4xl font-semibold text-white') ]}>Video Terbaru</Text>
                </SafeAreaView>
                <View >
                    <ScrollView contentContainerStyle={[tailwind('h-full w-full')]} style={ tailwind('bg-brand w-1/5') }>
                        <View style={tailwind('bg-brand flex justify-center')}>

                            <Animated.View style={ [tailwind('') ]}>
                                <Text style={ [tailwind('text-white w-full '), {
                                    transform: [
                                        { translateX: -categoryWidth / 2 },
                                        { rotate: '270deg' },
                                        { translateX: categoryWidth / 2 }
                                    ],
                                    width: 40
                                }]}>Video Terbaru</Text>
                            </Animated.View>

                            <Animated.View style={ [tailwind('') ]}>
                                <Text style={ [tailwind('text-white w-full '), {
                                    transform: [
                                        { translateX: -categoryWidth / 2 },
                                        { rotate: '270deg' },
                                        { translateX: categoryWidth / 2 }
                                    ],
                                    width: 40
                                }]}>Video Terbaru</Text>
                            </Animated.View>

                        </View>
                    </ScrollView>
                </View>
            </View>



            { children }
        </>
    )

}
