import React, { Component } from 'react'

export default class Top extends Component {
    render() {
        return (
            <div className="top">
                <div onClick={() => window.location.replace('/')}>
                    Chiqish
                </div>
            </div>
        )
    }
}
