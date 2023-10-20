import * as React from "react";
import { SVGProps } from "react";
const GeometryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    viewBox="0 0 460 460"
    {...props}
  >
    <path
      d="m181.705 454.904 273.2-273.2C432.714 77.87 340.458 0 230 0 102.975 0 0 102.974 0 230c0 110.458 77.871 202.714 181.705 224.904z"
      style={{
        fill: "currentColor",
      }}
    />
    <path
      d="M460 230c0-16.568-1.767-32.721-5.096-48.296L403.2 130 56.8 330l124.904 124.904A230.837 230.837 0 0 0 230 460c127.026 0 230-102.975 230-230z"
      style={{
        fill: "currentColor",
      }}
    />
    <path
      d="m230 30-81.6 58.66L56.8 130v200l91.6 41.34L230 430l81.6-58.66L403.2 330l-10-100 10-100z"
      style={{
        fill: "#3d88c2",
      }}
    />
    <path
      d="M403.2 130v200L230 230z"
      style={{
        fill: "#12398f",
      }}
    />
    <path
      d="M403.2 330 230 430V230z"
      style={{
        fill: "#071e61",
      }}
    />
    <path
      d="M230 230v200L56.8 330z"
      style={{
        fill: "#1d54bd",
      }}
    />
    <path
      d="M230 30v200L56.8 130z"
      style={{
        fill: "#12b5ff",
      }}
    />
  </svg>
);
export default GeometryIcon;
