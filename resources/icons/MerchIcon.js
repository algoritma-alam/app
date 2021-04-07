import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MerchIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <Path d="M16 6V4a4 4 0 00-8 0v2H3v18h18V6h-5zM9 4c0-1.654 1.346-3 3-3s3 1.346 3 3v2H9V4zm10 18H5V8h3v1.5a.5.5 0 001 0V8h6v1.5a.5.5 0 001 0V8h3v14z" />
    </Svg>
  )
}

export default MerchIcon
