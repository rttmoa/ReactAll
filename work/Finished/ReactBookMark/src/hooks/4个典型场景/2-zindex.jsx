import React from 'react'
import useAsync from './2-useAsync'


function UserList() { 
    // const [users, setUsers] = React.useState([])
    // const [loading, setLoading] = React.useState(false)
    // const [error, setErrror] = React.useState(null) 
    // const fetchUser = async () => {
    //     setLoading(true)
    //     try {
    //         // setTimeout(async () => { }, 2000)
    //         const res = await fetch("https://reqres.in/api/users/")
    //         const json = await res.json()
    //         console.log(json)
    //         setUsers(json.data)
    //         setLoading(false)
    //     } catch (error) {
    //         setErrror(error)
    //     } 
    // }

    // 使用封装的 useAsync
    const {execute: fetchUser, data: users, loading, error} = useAsync(async () => {
        const res = await fetch("https://reqres.in/api/users/")
        const json = await res.json()
        return json
    })
     

    return <div className="user-list">
        <button onClick={fetchUser} disabled={loading}>{loading ? "Loading..." : "show Users"}</button>
        {error && <div style={{color: "red"}}>Failed:{String(error)}</div>}
        <br />
        <ul>
            {users && users.length > 0 && users.map(user => <li key={user.id}>{user.first_name}</li>)}
        </ul>
    </div>
}

export default UserList