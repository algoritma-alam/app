import React from 'react';
import {  View } from 'react-native'
import { tailwind } from "@resources/tailwind"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function VideoCardBlueprint({style}) {

    const cardWidth  = style?.width ?? wp(86/3)
    const cardHeight = cardWidth * 1.5

    return (
        <View style={[tailwind('h-48 w-32  bg-brand-darker'), { width: cardWidth, height: cardHeight }]} {...style}/>
    )
}
