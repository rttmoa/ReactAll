
import React, { memo ,useEffect} from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter} from 'react-router-dom'
import Sider from './Sider'





export default memo(withRouter(function AllComponent(props) {
    console.log('props.route', props.route)
    console.log("props.location", props.location)
    
    useEffect(() => {
        if(props.location.pathname === '/'){
            props.history.push('/home')
        }
    }, [props.history, props.location.pathname])

    return (
        <div>
            <Sider />
            <div className="content">
                {renderRoutes(props.route.routes)}
            </div>
           
        </div>
    )
}))
