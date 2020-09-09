import React, { Component } from 'react'

export default class DemoComponent extends Component {

    render() {
        return (
            <div onClick={this.props.onClick} >
                {this.props.item.slug_type}
                < br />
                <img alt="" src={this.props.item.thumbnail} width="150" height="150" />
            </div >
        )
    }

}