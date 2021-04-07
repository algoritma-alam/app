import React, { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { tailwind } from "@resources/tailwind"
import { MoreIcon, MerchIcon, AlgoritmaAlamNoBackground, SearchIcon, HomeIcon } from "@resources/icons"
import NewHomePage from '@components/NewHomePage';
import { useNavigation } from '@react-navigation/native';


export default function FloatingMenu() {

  const navigation = useNavigation()

  const [ activeMenu, setActiveMenu ] = useState(0)

  const menuItems = [
    {
      text: 'Beranda',
      icon: HomeIcon,
      isMainMenu: true,
      screen: 'home',
    },
    {
      text: 'Merch',
      icon: MerchIcon,
      isMainMenu: false,
      screen: 'blueprint',
    },
    {
      text: 'Pencarian',
      icon: SearchIcon,
      isMainMenu: false,
      screen: 'home',
    },
    {
      text: 'Lainya',
      icon: MoreIcon,
      isMainMenu: false,
      screen: 'blueprint',
    },
  ]

  const activateAndNavigate = (index) => {

    setActiveMenu(index)

    const { screen } = menuItems[index]
    navigation.navigate(screen)

  }

  return (<>
      <View
        style={[tailwind(' border-t border-white border-opacity-30  absolute bottom-0 z-30  left-0 right-0 bg-brand-dark overflow-hidden '), { height: '8%'}]}
      >

      <View style={[ tailwind(''), { height: '100%' } ]}>
        <View style={[ tailwind('flex mx-7 items-start flex-row justify-between my-2')]}>

            {
              menuItems.map((menu, index) => {
                const { text, icon } = menu

                const RenderableIcon = icon

                return (index == activeMenu)
                  ?  <>
                        <View style={[ tailwind('flex my-1.5  items-center justify-center h-4/5') ]} key={index} >
                            <RenderableIcon style={ tailwind('text-white h-6 w-6 opacity-90') } />

                            <Text style={ tailwind('text-white opacity-90 text-xxs mt-1') }>{ text }</Text>
                        </View>
                      </>

                  : <>
                    <TouchableOpacity onPress={() => activateAndNavigate(index) } key={index}>
                      <View style={[ tailwind('my-1.5 flex  items-center justify-center h-4/5') ]}  >
                          <RenderableIcon style={ tailwind('text-white opacity-50 h-6 w-6') } />
                          <Text style={ tailwind('text-white opacity-50 text-xxs mt-1') }>{ text }</Text>
                      </View>
                    </TouchableOpacity>
                  </>

              })
            }

        </View>
      </View>


      </View>
    </>)
}
