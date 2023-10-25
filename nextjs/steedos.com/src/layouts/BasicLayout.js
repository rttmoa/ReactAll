import { Footer } from '@/components/Footer'




  
export function BasicLayout({ children }) { // !可能未使用此组件哦
  console.log("/layouts Funtion BasicLayout () {}")
  return (
    <>
      <main className="max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">{children}</main>
      <Footer />
    </>
  )
}
