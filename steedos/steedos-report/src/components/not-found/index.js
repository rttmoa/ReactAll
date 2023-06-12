import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './index.css';
class NotFound extends Component {
    render() {
        return (
            <Status code={404}>
                <div>
                    <h1>Sorry, can’t find that.</h1>
                </div>
            </Status>
        );
    }
}

function Status({ code, children }) {
    return (
        <Route
            render={({ staticContext }) => {
                if (staticContext) staticContext.status = code;
                return children;
            }}
        />
    );
}

export default NotFound;
