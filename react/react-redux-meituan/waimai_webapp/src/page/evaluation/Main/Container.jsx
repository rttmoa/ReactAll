import React from 'react';
import Main from './Main.jsx';
import { hot } from 'react-hot-loader';






export default hot(module) (function Container() {
    return <Main />;
})





// class Container extends React.Component {
//     render() {
//         return <Main />;
//     }
// }
// export default hot(module) (Container);