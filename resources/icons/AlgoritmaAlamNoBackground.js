import React from 'react'
import { Image } from 'react-native'
import * as theImage from '@assets/images/algoritma-alam-no-bg.png'

function AlgoritmaAlamNoBackground(props) {
  return (

  <Image
    source={ require('../../assets/images/logo-white.png') }
    {...props}

    />

  )
}

export default AlgoritmaAlamNoBackground
