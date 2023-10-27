import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import Detail from '../../components/product/Detail.js'
import { getProduct, getProducts } from '../../lib/product'



export async function getStaticProps({ params, query }) {
  const { slug } = params
  const product = await getProduct(slug)

  if (!product) return { notFound: true }
  return {
    props: {
      product: product,
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

export async function getStaticPaths() {
  const products = await getProducts()
  const paths = products.map((product) => ({ params: { slug: product.slug } }))
  return { paths, fallback: 'blocking' }
}


// 收付款管理 - 管理、业务、财务一体化
// 资产管理 - 企业固定资产管理工具
// 采购管理 - 电子化管理企业采购流程
// 订单管理 - 销售活动后续订单管理
// TODO; https://www.steedos.com/products/asset
// TODO; https://www.steedos.cn/products/finance
export default function ProductDetail({ product }) {
  const router = useRouter()
  const { vid } = router.query
  console.log('ProductDetail')
  if (!product) {
    return { notFind: true }
  }

  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  const imageUrl = product.image
    ? process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL + `/api/files/images/${product.image}`
    : null

  return (
    <>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          title: product.name,
          description: product.description,
          url,
          images: [{ url: imageUrl, alt: product.name }],
        }}
        twitter={{
          cardType: seo.cardType || 'summary_large_image',
          site: seo.site || 'eggheadio',
          handle: seo.handle,
        }}
        canonical={canonicalUrl}
      />
      <Detail product={product} vid={vid}></Detail>
    </>
  )
}
