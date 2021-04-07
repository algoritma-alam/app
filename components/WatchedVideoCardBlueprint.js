import React from 'react';
import {  View } from 'react-native'
import { tailwind } from "@resources/tailwind"

export default function WatchedVideoCardBlueprint() {

    return (
        <View style={[  tailwind('bg-brand-darker h-40 w-28 mr-2 relative') ]}>
            <View style={ tailwind('absolute bottom-0 h-5 w-full bg-brand-darkest') } />
        </View>
    )
}
