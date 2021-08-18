import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ViewPost extends React.Component {
    constructor(props){
        super(props);
        this.deletePost = this.deletePost.bind(this);  
        this.onChangeComment = this.onChangeComment.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);  
        this.state = {
            post: {},
            comment: "",
            commentError: "",
            error: ""
        }
    }

    onChangeComment(e){
        this.setState({
            comment: e.target.value,
            commentError: "",
        })
    }

    onSubmit(e){
        e.preventDefault(); 

        let data = {content: this.state.comment};

        axios.post("/api/comments/"+this.props.match.params.id, data)

        .then(res => {
            let post = this.state.post;
            post.comments.push({
                _id: res.data._id,
                content: res.data.content,
                author: {_id: localStorage.getItem('_id')}
            });

            this.setState({
                post: post,
                commentError: '',
                comment: ''
            });
        })

        .catch(err => {
            this.setState({
                commentError: <blockquote>{err.response.data.message}</blockquote>
            });
        }); 
    }

    deletePost(){
        axios.delete("/api/posts/"+this.state.post._id)

        .then(res => {
            this.props.history.push('/');   
        })
    }

    componentDidMount(){
        let postId = this.props.match.params.id;
        axios.get('/api/posts/'+postId)

        .then(res => {
            this.setState({
                post: res.data,
                error: ""
            });
        })

        .catch(err => {
            this.setState({
                error: err.response.data.message
            });
        });
    }

    renderActions(){
        if(localStorage.getItem('token') && localStorage.getItem('_id') === this.state.post.author._id){
            return ( 
                <span>
                    <Link to={"/post/edit/"+this.state.post._id}>
                        <button className="btn btn-outline-danger mb-2 ml-2">edit</button>
                    </Link>
                    <button className="btn btn-outline-danger mb-2 ml-2" onClick={this.deletePost}>delete</button>
                </span>
            )
        }
    }
    
    renderComments(){
        let comments = <p>no comments yet!</p>
        if (this.state.post.comments.length) {
            comments = this.state.post.comments.map(comment => {
                return(
                    <p key={comment._id}>
                        <strong className="text-muted">{comment.author._id === localStorage.getItem('_id') ? "me" : comment.author.name}</strong>
                        <br/>
                        {comment.content}
                    </p>
                );
            });
        }

        return comments;
    }

    renderCommentForm(){
        if(!localStorage.getItem('token')){
            return (
            <p>please login so we can add your comment</p>
            // add a button for login and anthor one for signup if the client doesn't have an account.
            )
        }

        return (
            <div>
                <h6>add comment</h6>
                {this.state.commentError}
                <form onSubmit={this.onSubmit}>
                    <textarea value={this.state.comment} onChange={this.onChangeComment} className="form-control mb-2 mr-sm-2"></textarea>
                    <input className="btn btn-outline-danger mb-2 ml-2" type="submit" value="add"/>
                </form>
            </div>
        )
    }

    render(){
        if(this.state.error){
            return (<div className="container text-center"><h4>{this.state.error}</h4></div>)
        }

        if(!this.state.post.title){
            return (<div className="container text-center"><h1>...</h1></div>)
        }

        return (
            <div className="container pt-4">
                <div className="row">
                    <div className="col">
                        <h4>{this.state.post.title}</h4>
                        <h6 className="title">{this.state.post.author.name}</h6>
                        <p>{this.state.post.content}</p>
                        {this.renderActions()}
                        <hr/>
                        <h4>comments</h4>
                        {this.renderComments()}
                        {this.renderCommentForm()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewPost;