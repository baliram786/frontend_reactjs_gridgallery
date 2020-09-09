import React, { Component } from 'react'

export default class ImagePopup extends Component {
    render() {
        return (
            <div className="dialog">
                <div className="dialog_content">
                    <span className="close" onClick={this.props.toggle}>&times;</span>
                    <img alt="" src={this.props.url} width="350" height="350" />
                </div>
            </div>
        )
    }
}