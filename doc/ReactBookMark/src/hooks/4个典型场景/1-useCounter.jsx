import React, { useCallback } from 'react'



function useCounter() {
   const [count, setCount] = React.useState(0);

   // console.log(123)

    const increment = useCallback(() => { setCount(count => count + 1) },[])

    const decrement = useCallback(() => setCount(count => count - 1), [])
    

    const reset = useCallback(() => setCount(0), [])

    return { count, increment, decrement, reset }

}

export default useCounter
