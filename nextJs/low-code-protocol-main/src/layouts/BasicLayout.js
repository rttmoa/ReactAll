import { Footer } from '@/components/Footer'        //-->  引入Footer组件






/**--- 基本布局 - 未渲染 ---**/
export function BasicLayout({ children }) {
  // console.log(children)

  return (
    <>
      <main className="max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">{children}</main>
      <Footer />
    </>
  )
}
