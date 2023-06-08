import React from 'react'



function useAsync(fetch) {

    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setErrror] = React.useState(null) 
 

    const execute = async () => {
        setLoading(true)
        try {
            const res = await fetch() 
            // console.log(res)
            setData(res.data)
            setLoading(false)
        } catch (error) {
            setErrror(error)
        }
    }

    return {execute, data, loading, error}

}

export default useAsync
