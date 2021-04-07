import React, { useState, useEffect } from 'react';
import {View, TouchableOpacity, Text, Keyboard} from 'react-native';
import 'react-native-gesture-handler';
import { MoreIcon, MerchIcon, SearchIcon, HomeIcon } from "@resources/icons"
import { tailwind } from "@resources/tailwind"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function({ state, descriptors, navigation}) {
  const [ showTab, setShowTab ] = useState(true)
  const keyboardWillHideHandler = () => setShowTab(true)
  const keyboardWillShowHandler = () => setShowTab(false)

  const screenHeight = hp(100)
  const tabHeight    = screenHeight > 600 ? hp('9%') : hp('10%')

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

  return (

      <View
        style={[tailwind(` border-t border-white border-opacity-30 ${showTab ? 'bottom-0' : '-bottom-64 hidden'}  absolute  z-30  left-0 right-0 bg-brand-dark overflow-hidden `), { height: tabHeight}]}
      >

      <View style={[ tailwind(''), { height: '100%' } ]}>
        <View style={[ tailwind('flex mx-7 items-start flex-row justify-between my-2')]}>

          {state.routes.map((route, index) => {

            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const icons = {
              'home': HomeIcon,
              'merch': MerchIcon,
              'search': SearchIcon,
              'more': MoreIcon,
            }

            const Active = () => {

              const RenderableIcon = icons[route.name]

              return (
                <View style={[ tailwind('flex my-1.5  items-center justify-center h-4/5') ]} >
                  <RenderableIcon style={ tailwind('text-white h-6 w-6 opacity-90') } />

                  <Text style={ tailwind('text-white opacity-90 text-xxs mt-1') }>{ label }</Text>
                </View>
              )
            }

            const Inactive = () => {
              const RenderableIcon = icons[route.name]
              return (
                <TouchableOpacity onPress={onPress} >
                  <View style={[ tailwind('my-1.5 flex  items-center justify-center h-4/5') ]}  >
                    <RenderableIcon style={ tailwind('text-white opacity-50 h-6 w-6') } />
                    <Text style={ tailwind('text-white opacity-50 text-xxs mt-1') }>{ label }</Text>
                  </View>
                </TouchableOpacity>
              )
            }

            return isFocused ? <Active /> : <Inactive />;

          })}
        </View>
      </View>

    </View>
    )
}
