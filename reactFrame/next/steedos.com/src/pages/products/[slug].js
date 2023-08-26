import { useRouter } from 'next/router'
import {NextSeo} from 'next-seo'
import Detail from '../../components/product/Detail.js'
import { getProduct, getProducts } from '../../lib/product';

export async function getStaticProps({params, query}) {
  const { slug } = params;
  const product = await getProduct(slug)

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product: product
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

export async function getStaticPaths() {
  const products = await getProducts();

  // Get the paths we want to pre-render based on posts
  // FIXME: Server Error：  Error: Invalid `paths` value returned from getStaticPaths in /[blog_slug]/[post_slug].`paths` must be an array of strings or objects of shape { params: [key: string]: string }
  const paths = products.map((product) => ({ params: { slug: product.slug } }))
  console.log('Building Products...');
  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}




// TODO: 产品  ->  什么是低代码? / 平台介绍 / 技术架构 / 十大引擎
export default function ProductDetail({product}){
  const router = useRouter();
  const {vid} = router.query;
  console.log("ProductDetail")
  if(!product){
    return {notFind: true}
  }

  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  const imageUrl = product.image?process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL + `/api/files/images/${product.image}` : null

  return (
    <>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          title: product.name,
          description: product.description,
          url,
          images: [{url: imageUrl,alt: product.name},],
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
