import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function PlayIcon(props) {

  const { circleStyle } = props

  return (
    <Svg
      width={59}
      height={59}
      viewBox="0 0 59 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#prefix__clip0)"
        stroke="#fff"
        strokeOpacity={0.9}
        strokeWidth={1.548}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          d="M29.5 58C45.24 58 58 45.24 58 29.5S45.24 1 29.5 1 1 13.76 1 29.5 13.76 58 29.5 58z"
          fill="#000"
          fillOpacity={0.5}
          {...circleStyle}
        />
        <Path d="M23 19l16 10.5L23 40V19z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h58.822v58.822H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default PlayIcon
