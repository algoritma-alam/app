import React, { useState, useEffect } from 'react';
import {  View, SafeAreaView, TextInput, Text, TouchableWithoutFeedback, FlatList, Keyboard, useWindowDimensions, Platform, Blueprint, StatusBar } from 'react-native'
import { tailwind, getColor } from "@resources/tailwind"
import VideoCardBlueprint from '@components/VideoCardBlueprint'
import VideoCardCover from '@components/VideoCardCover'
import VideoCard from '@components/VideoCard'
import { SearchIcon } from '@resources/icons'
import videos from '@resources/videos'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function({ navigation }) {

    const [ searchQuery, setSearchQuery ] = useState(null)

    const height = useWindowDimensions().height
    const containerPadding = height * 1.3

    const [ addAdditionalHeight, setAdditionalHeight ] = useState(false)
    const keyboardWillHideHandler = () => setAdditionalHeight(false)
    const keyboardWillShowHandler = () => setAdditionalHeight(true)

    useEffect(() => {
        Keyboard.addListener("keyboardWillHide", keyboardWillHideHandler);
        Keyboard.addListener("keyboardWillShow", keyboardWillShowHandler);
        Keyboard.addListener("keyboardDidHide", keyboardWillHideHandler);
        Keyboard.addListener("keyboardDidShow", keyboardWillShowHandler);

        // cleanup function
        return () => {
        Keyboard.removeListener("keyboardWillShow", keyboardWillShowHandler);
        Keyboard.removeListener("keyboardWillHide", keyboardWillHideHandler);
        Keyboard.removeListener("keyboardDidShow", keyboardWillShowHandler);
        Keyboard.removeListener("keyboardDidHide", keyboardWillHideHandler);
        };
    })

    const SearchResult = () => {

        const [ resultReady, setResultReady ] = useState(false)

        const resultVideos = videos.filter(v => v.title.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1)

        if( resultVideos.length != 0 ) {
            // quick & dirty solutions, should make a better one.
            const additionalEmptyVideos = (resultVideos.length / 3 % 1).toFixed(2) > .6 ? 1 : 2;

            for(let i = 0; i < additionalEmptyVideos; i++) {
                resultVideos.push({__empty: true})
            }
        }


        const ResultDescriptor = () => {
            return (resultVideos.length < 1 && resultReady)
                ? (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={[ tailwind('w-full ') ]}>
                            <Text style={ tailwind('text-white font-semibold') }>Video nya enggak ada...  🥺</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
                : (

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={ tailwind('flex flex-row items-start') }>
                        <Text style={ tailwind('text-white font-semibold') }>
                            Hasil pencarian untuk
                        </Text>
                        <Text style={ tailwind('mx-2 text-white font-bold') }>{`"${searchQuery}"`}</Text>
                    </View>
                </TouchableWithoutFeedback>
                )
        }

        useEffect(() => {
            const searchTimer = setTimeout(() => setResultReady(true), 1500)

            return() => clearTimeout(searchTimer)
        }, [])

        return (
            <>

            <View style={[ { width: '95%' }, tailwind('flex mb-2 mt-5  flex-col  justify-between ') ]}>

                <ResultDescriptor />

                { resultReady
                       ? <FlatList
                            style={[tailwind('mt-5 z-50 mb-5')]}
                            columnWrapperStyle={[tailwind('flex flex-row items-center justify-between  w-full mb-1')]}
                            contentContainerStyle={{ paddingBottom: '50%' }}
                            numColumns={3}
                            data={resultVideos}
                            renderItem={(item) => (
                                <View><VideoCard style={{ width: wp(93/3) }}  video={item} /></View>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                       : <FlatList
                            style={[tailwind('mt-5 z-50 mb-5')]}
                            columnWrapperStyle={[tailwind('flex flex-row items-center justify-between  w-full mb-1')]}
                            numColumns={3}
                            data={videos}
                            renderItem={(item) => (
                                <VideoCardBlueprint style={{ width: wp(93/3) }}/>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                }


            </View>

        </>
        )

    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={ tailwind(`flex relative h-full bg-brand-dark items-center `) }>
                <SafeAreaView  style={[  tailwind(`bg-brand-darker flex justify-end items-center `) , { width: '100%', height:  '15%' } ]}>
                    <View style={[{width: '95%'}, tailwind('flex flex-row ')  ]}>
                        <View
                            style={[ tailwind('bg-brand-darkest h-10 rounded-l-lg flex items-center justify-center'), { width: '10%' } ]}
                        >
                            <SearchIcon style={tailwind('text-white text-sm h-5 w-5 opacity-60')}/>
                        </View>
                        <TextInput
                            style={[ tailwind('bg-brand-darkest  px-2 mb-5  h-10 rounded-r-lg text-white text-opacity-60 '), { width: '90%' } ]}
                            onChangeText={(q) => setSearchQuery(q)}
                            value={searchQuery}
                            placeholder="Cari Video"
                            placeholderTextColor={getColor('white opacity-40')}
                        />
                    </View>
                </SafeAreaView>

                {
                    searchQuery
                        ? <SearchResult />
                        : <TouchableWithoutFeedback onPress={Keyboard.dismiss}><View style={{height: '80%', width: '100%'}} /></TouchableWithoutFeedback>
                }

            </View>

        </>
    )

}
