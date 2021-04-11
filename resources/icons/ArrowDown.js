import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowDown(props) {
  return (
    <Svg
      viewBox="0 0 8 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.646 13.354a.5.5 0 00.708 0l3.182-3.182a.5.5 0 00-.708-.708L4 12.293 1.172 9.464a.5.5 0 10-.708.708l3.182 3.182zM3.5 5v8h1V5h-1z"
        fill="#fff"
      />
      <Path d="M4 2v2M4 0v1" stroke="#fff" />
    </Svg>
  )
}

export default ArrowDown
