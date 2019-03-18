import React, { Component } from 'react';
import Rater from 'react-rater'
import axios from "axios";
import { Helmet } from "react-helmet";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            movie: props.match.params.id,
            error: false,
        }
        this.onDelete = this.onDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMovie = this.handleChangeMovie.bind(this);
        this.handleChangeDirector = this.handleChangeDirector.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleRating = this.handleRating.bind(this);

        this.textareaRef = React.createRef();
        this.titleRef = React.createRef();
        this.directorRef = React.createRef();

    }
    componentDidMount() {
        this.source = axios.CancelToken.source();
        let id = this.props.match.params.id;
        axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id,{cancelToken:this.source.token})
            .then(movie => {
                this.setState({
                    isLoaded: true,
                    items: movie.data,
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error: true })
            });
    }
    componentWillUnmount(){
        this.source.cancel();
    }
    handleChangeMovie(e) {
        this.setState({
            items: {
                ...this.state.items,
                title: e.target.value,
            }
        });
    }
    handleChangeDirector(e) {
        this.setState({
            items: {
                ...this.state.items,
                director: e.target.value,
            }
        });
    }
    handleChangeDescription(e) {
        this.setState({
            items: {
                ...this.state.items,
                description: e.target.value,
            }
        });
    }
    handleRating(e) {
        this.setState({
            items: {
                ...this.state.items,
                rating: e.target.value,
            }
        });
    }
    onDelete(e) {
        e.preventDefault();
        let id = this.props.match.params.id;
         axios.delete("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id,{cancelToken:this.source.token}) 
        .then(() => {
            this.props.history.push("/");
        })
        .catch(error => {
            console.error(error)
        })
    }
    handleChange(e) {
        e.preventDefault()
        let id = this.props.match.params.id;
        axios.put("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, this.state.items,{cancelToken:this.source.token}) 
        .then((res) => {console.log(res)
            if (res.status === 400) {
                this.setState({
                    errortext: "Every field has to be filled in"
                })
            }
            else {
                this.setState({
                    errortext: ""
                })
                this.props.history.push("/")
            }
        })
    }
    componentDidUpdate(){
        window.M.textareaAutoResize(this.textareaRef.current);
        window.M.updateTextFields(this.titleRef.current);
        window.M.updateTextFields(this.directorRef.current);
    }
    render() {
        const data = this.state.items;
        let rating = parseFloat(data.rating).toFixed(1);

        if (!this.state.isLoaded || this.state.items.length === 0) {
            return (
                <div className="container">
                    <h4 className="center">Loading...</h4>
                </div>
            )
        }
        else if (this.state.error) {
            return (
                <div className="container">
                    <h4 className="center">movie with the supplied id does not exist.</h4>
                </div>
            )
        }
        else {
            return (
                <>
                    <Helmet>
                        <title>Edit</title>
                    </Helmet>
                    <div className="container">
                        <h4 className="">Edit Movie</h4>
                        <div className="row col s12 center">
                            <form className="col s12 ">
                                <div className="row">
                                    <div className="input-field col s8">
                                        <input id="input_text"
                                            minLength="1"
                                            ref={this.titleRef}
                                            maxLength="40"
                                            type="text" data-length="20"
                                            value={data.title}
                                            onChange={this.handleChangeMovie} />
                                            <label htmlFor="textarea1">Title</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s8">
                                        <input id="input_text"
                                            type="text"
                                            minLength="1"
                                            ref={this.directorRef}
                                            maxLength="40"
                                            data-length="10"
                                            value={data.director}
                                            onChange={this.handleChangeDirector}/>
                                            <label htmlFor="textarea1">Director</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s8">
                                        <textarea id="textarea2"
                                            className="materialize-textarea"
                                            minLength="1"
                                            maxLength="300"
                                            data-length="110"
                                            value={data.description}
                                            ref={this.textareaRef}
                                            onChange={this.handleChangeDescription} ></textarea >
                                            <label htmlFor="textarea1">Description</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s8">
                                        <input className="rating" type="range" min="0" max="5" step="0.1" value={rating} onChange={this.handleRating} /><br />
                                        <span className="ratingNum"><Rater total={5} interactive={false} rating={Number(rating)} /> ({rating})</span><br /><br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s8">
                                        <span className="helper-text" data-error="wrong" data-success="right">{this.state.errortext}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <a href=" " onClick={this.handleChange} className="waves-effect waves-light btn-small ">Save Changes</a>
                                        <a href=" " className="waves-effect waves-light btn-small right " onClick={this.onDelete}>Delete</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default Edit