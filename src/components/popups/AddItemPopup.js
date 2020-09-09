import React, { Component } from 'react'
import axios from "axios";

export default class AddItemPopUp extends Component {

    state = {
        title: "",
        thumbnail: "",
        isError: false,
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitInfo = (e) => {
        e.preventDefault();
        // alert("form submitted " + this.state.title);

        var position = this.props.position
        var title = this.state.title
        var thumbnail = this.state.thumbnail

        var url = `http://localhost:8000/cards`
        // alert(url)

        var fields = new FormData()
        fields.append('position', position)
        fields.append('title', title)
        fields.append('thumbnail', thumbnail)

        axios
            ({
                method: "POST", 
                url : url, 
                data: fields, 

            })
            .then(response => {
                console.log(response.data)
                this.props.trigger(response.data)
            })
            .catch(err => {
                alert(err.message)
            })

        this.props.toggle()
    }

    render() {
        return (
            <div className="dialog">
                <div className="dialog_content">
                    <span className="close" onClick={this.props.toggle}>&times;</span>
                    <form onSubmit={this.submitInfo}>
                        <h3>New Card Information</h3>
                        <cite>New Position : {this.props.position}</cite><br />
                        <label for="title">Title</label><br />
                        <input type="text" name="title" placeholder="Title" onChange={this.handleInput} value={this.state.title} />
                        <br />
                        <label for="thumbnail">Thumbnail <cite>(Must be a URL)</cite></label><br />
                        <input type="text" name="thumbnail" placeholder="Thumbnail URL" onChange={this.handleInput} value={this.state.thumbnail} />
                        <br /><br />
                        <input type="submit" value="Add New" />
                    </form>
                </div>
            </div>
        )
    }
} 