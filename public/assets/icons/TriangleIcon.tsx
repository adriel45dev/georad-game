import * as React from "react";
import { SVGProps } from "react";
const TriangleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M14.174 2.229c-.968-1.639-3.38-1.639-4.347 0L.34 18.302C-.658 19.993.636 22 2.514 22h18.973c1.877 0 3.17-2.007 2.173-3.698L14.174 2.23Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default TriangleIcon;
