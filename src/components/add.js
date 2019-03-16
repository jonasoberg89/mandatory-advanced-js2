import React, { Component } from 'react';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieValue: "",
            directorValue: "",
            descriptionValue: "",
            rating: 0,
            errortext: "",

        }
        this.handleChangeMovie = this.handleChangeMovie.bind(this);
        this.handleChangeDirector = this.handleChangeDirector.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRating = this.handleRating.bind(this);
    }
    handleChangeMovie(e) {
        this.setState({ movieValue: e.target.value })
    }
    handleChangeDirector(e) {
        this.setState({ directorValue: e.target.value })
    }
    handleChangeDescription(e) {
        this.setState({ descriptionValue: e.target.value })
    }
    handleRating(e) {
        this.setState({ rating: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: this.state.descriptionValue,
                director: this.state.directorValue,
                rating: this.state.rating,
                title: this.state.movieValue,

            })
        }).then((res) => {
            if (res.status === 201) {
                this.setState({
                    movieValue: "",
                    directorValue: "",
                    descriptionValue: "",
                    rating: 0,
                    errortext: ""
                })
            }
            else if (res.status === 400) {
                this.setState({
                    errortext: "Every field has to be filled in"
                })
            }
        })
    }
    render() {
        let rating = parseFloat(this.state.rating).toFixed(1);

        return (
            <div className="container">
                <h4 className="left">Add Movie</h4>
                <div className="row center">
                    <div className="col s12">
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s8">
                                    <input id="input_text"
                                        minLength="1"
                                        maxLength="40"
                                        type="text" data-length="20"
                                        value={this.state.movieValue}
                                        onChange={this.handleChangeMovie} />
                                    <label htmlFor="textarea1">Title</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <input id="input_text"
                                        minLength="1"
                                        maxLength="40"
                                        type="text"
                                        data-length="10"
                                        value={this.state.directorValue}
                                        onChange={this.handleChangeDirector} />
                                    <label htmlFor="textarea1">Director</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <textarea id="textarea2"
                                        className="materialize-textarea"
                                        minLength="1"
                                        maxLength="300"
                                        data-length="120"
                                        value={this.state.descriptionValue}
                                        onChange={this.handleChangeDescription} ></textarea >
                                    <label htmlFor="textarea1">Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <input className="rating" type="range" min="0" max="5" step="0.1" value={rating} onChange={this.handleRating} /><br />
                                    <span className="ratingNum"><Rater total={5} interactive={false} rating={Number(rating)} /> ({this.state.rating})</span><br /><br />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <span className="helper-text" data-error="wrong" data-success="right">{this.state.errortext}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <a href=" " onClick={this.handleSubmit} className="waves-effect waves-light btn-small ">Add Movie</a>
                                    <a href=" " onClick={(e) => { e.preventDefault(); this.props.history.push("/"); }} className="waves-effect waves-light btn-small right ">Cancel</a>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        )

    }

}
export default Add