import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function TimesIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-x-circle"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M15 9l-6 6M9 9l6 6" />
    </Svg>
  )
}

export default TimesIcon
