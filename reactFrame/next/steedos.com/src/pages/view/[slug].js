import React from 'react' 




export async function getStaticProps({ params }) {
  const { slug } = params
  console.log(slug)
}

export async function getStaticPaths() { 
  // ... await api.request()
  return {
    paths: [{params: {id: '1'}}, {params: {id: '2'}},],
    fallback: false
  }
}
  
export default class Slug extends React.Component {
  // console.log("Collection")


  render(){
    const { collection } = this.props;
    return (
      <>
        <main className="products-heading mb-20">

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-24 text-center"> 
            </div>
            
          </div>
        </main>
      </>
    )
  }
}
