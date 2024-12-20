"use client";

import { Theme } from "@/types";
import { useTheme } from "next-themes";
import { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  const { theme } = useTheme();

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        d="M434.931 227.069C428.207 184.032 390.897 151 346 151C329.11 151 312.88 155.673 298.803 164.389C277.387 128.397 238.832 106 196 106C129.833 106 76 159.833 76 226C76 226.41 76 226.835 76.015 227.245C33.49 234.408 0 271.483 0 316C0 365.629 41.371 406 91 406H421C470.629 406 512 365.629 512 316C512 271.103 477.968 233.793 434.931 227.069Z"
        fill={theme === Theme.Dark ? "black" : "white"}
      />
    </svg>
  );
}
