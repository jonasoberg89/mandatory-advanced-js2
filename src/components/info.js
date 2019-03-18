import React, { Component } from 'react';
import Rater from 'react-rater'
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom"
import 'react-rater/lib/react-rater.css'
class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            movie: props.match.params.id
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        this.source = axios.CancelToken.source();
        axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id,{cancelToken:this.source.token})
            .then(movie => {
                this.setState({
                    isLoaded: true,
                    items: movie.data,
                })
            }).catch(error => {
                console.error(error)
            });


    }
    componentWillUnmount(){
        this.source.cancel();
    }
    render() {
        const movie = this.state.items
        if (!this.state.isLoaded || this.state.items.length === 0) {
            return (
                <>
                    <Helmet>
                        <title>Info</title>
                    </Helmet>
                    <div className="container">
                        <h4 className="center">Loading...</h4>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <Helmet>
                        <title>Info</title>
                    </Helmet>
                    <div className="container info">
                        <h4 className="center">Info</h4>
                        <div className="post card">
                            <p className="right info-edit"><Link to={"/Edit/" + movie.id}>Edit</Link></p>
                            <div className="card-content ">
                                <h4>{movie.title}</h4>
                                <h6>Director: {movie.director}</h6>
                                <span><Rater total={5} interactive={false} rating={Number(parseFloat(movie.rating)).toFixed(1)} />({movie.rating})</span>
                                <p>Description:</p>
                                <p>{movie.description}</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}
export default Info