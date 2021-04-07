import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlayButton(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <Path d="M3 22V2l18 10L3 22z" />
    </Svg>
  )
}

export default PlayButton
