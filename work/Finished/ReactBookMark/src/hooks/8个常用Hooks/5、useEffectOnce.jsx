import { useEffect } from "react"

function useEffectOnce(cb) {
  useEffect(cb, [])
}


export default function OnceComponent() {
    useEffectOnce(() => alert("Hi"))

    return <div>
        123
    </div>
}