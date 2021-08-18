import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            error: "",
            isLoading: true
        }
    }

    componentDidMount(){
        this.fetchPosts();
    }

    fetchPosts(){
        axios.get('api/posts')

        .then(res => {
            this.setState({
                posts: res.data,
                error:'',
                isLoading: false
            });
        })

        .catch(err => {
            this.setState({
                error: err.response.data.message,
                isLoading: false
            });
        });
    }

    render() {

        if(this.state.isLoading){
            return (<div className="container text-center"><h1>...</h1></div>)
        }

        if(this.state.error){
            return (<div className="container text-center"><h4>"{this.state.error}"</h4></div>)
        }

        if(this.state.posts.length < 1 ){
            return (<div className="container text-center"><h4>no blogs</h4></div>)
        }

        return this.state.posts.map(post => {
            return (
                <div className="container pt-4">
                    <div className="row">
                        <div className="col">
                            <h4>{post.title}</h4>
                            <h6 className="title">{post?.author?.name}</h6>
                            <p>{post.content.substr(0,50)}</p>
                            <Link to={"/post/view/"+post._id}><p className="text-secondary">more...</p></Link>
                            <hr className="border border-danger"/>
                        </div>
                    </div>
                </div>
            )
        });
    }
}

export default Home;