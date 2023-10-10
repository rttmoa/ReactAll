import React from 'react'

import { castArray } from '../../utils/castArray'
import { formatDate } from '../../utils/formatDate'
import { wait } from '../../utils/wait'
import { tailwindVersion, require_tailwindVersion } from '../../utils/tailwindVersion'
import { loadImage } from '../../utils/loadImage'



// ? 访问 /view/utils
const Utils = () => {

  // console.log(castArray("sss"))
  // 处理时间; https://www.mianshigee.com/project/tinytime
  // console.log(formatDate('2023-06-12 21:21', '{h}:{mm}:{ss}:{a}')) // 9:21:00:PM
  // console.log(formatDate('2023-06-12 21:21', '{dddd}, {MMMM} {DD}, {YYYY}')) // Monday, June 12, 2023
  // console.log(wait(1000).then(res => console.log(res)))
  // console.log(tailwindVersion, require_tailwindVersion)

  // console.log(loadImage("https://devpress.csdnimg.cn/766cf9e7ab8b485cae0a88f7dbe1a86f.jpg").then(res => console.log(res)))


  return (
    <div>
      utils

    </div>
  )
}
export default Utils
