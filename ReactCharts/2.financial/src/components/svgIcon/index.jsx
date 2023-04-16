import React, { memo } from "react";
import styles from "./index.scss";




const customCache = new Set();

const SvgIcon = memo(({ className = "", icon = "" }) => {

  return (
    <svg className={`${styles.svgIcon} ${className}`} aria-hidden='true'>
      <use xlinkHref={`#${icon}`} />
    </svg>
  );
});
SvgIcon.createFromIconfontCN = options => {
  const { scriptUrl } = options;
  // console.log("customCache", customCache)

  if (typeof scriptUrl === "string" && scriptUrl.length && !customCache.has(scriptUrl)) {
    const script = document.createElement("script");
    script.setAttribute("src", scriptUrl);
    script.setAttribute("data-namespace", scriptUrl);
    customCache.add(scriptUrl);
    document.body.appendChild(script);
  }
};
export default SvgIcon;
