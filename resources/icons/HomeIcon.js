import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <Path d="M20 7.093V2h-3v2.093l3 3zM24 13L12 1 0 13h3v10h18V13h3zm-5 8H5V10.74l7-6.912 7 6.99V21zm-5-1h-4v-6h4v6z" />
    </Svg>
  )
}
export default HomeIcon
