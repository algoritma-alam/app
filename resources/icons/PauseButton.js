import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PauseButton(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <Path d="M11 22H7V2h4v20zm6-20h-4v20h4V2z" />
    </Svg>
  )
}

export default PauseButton
