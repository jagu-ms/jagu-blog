import React from 'react';

import axios from 'axios';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        if(!localStorage.getItem('token')){
            this.props.history.push('/login');
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            content: "",
            error: "",
        }
    }


    onChangeTitle(e){
        this.setState({
            title: e.target.value,
            error: ""
        });
    }

    onChangeContent(e){
        this.setState({
            content: e.target.value,
            error: ""
        });
    }

    onSubmit(e){
        e.preventDefault();

        let data = {
            title: this.state.title,
            content: this.state.content,
        }

        axios.post('/api/posts',data)

        .then(res => {
            
            this.props.history.push('/mine');
            
        })

        .catch(err => {
            this.setState({
                error: err.response.data.message
            });
        });
    }

    renderError(){
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        return (
            <div className=" container text-center  pt-2 ">
                <h4>create a blog</h4>
                {this.renderError()}
                <br/>
                <div> 
                    <form onSubmit={this.onSubmit}  >
                        <label  className="mb-2 mr-sm-2">title</label>
                        <br/>
                        <input 
                            type="text" 
                            value={this.state.title} 
                            onChange={this.onChangeTitle} 
                            className="form-control mb-2 mr-sm-2" 
                            placeholder="title" 
                        />
                        <label  className="mb-2 mr-sm-2">content</label>
                        <textarea value={this.state.content} 
                            onChange={this.onChangeContent} 
                            className="form-control mb-2 mr-sm-2" 
                            placeholder="write some content"
                        >
                        </textarea>
                        <button type="submit" 
                            className="btn btn-outline-danger mb-2"
                        >
                            create
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreatePost;