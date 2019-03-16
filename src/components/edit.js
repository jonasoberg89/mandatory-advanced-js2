import React, { Component } from 'react';
import Rater from 'react-rater'
// import 'react-rater/lib/react-rater.css'

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            movie: props.match.params.id,
            movieValue: "",
            directorValue: "",
            descriptionValue: "",
            rating: 0,
            error: false,
        }
        this.onDelete = this.onDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMovie = this.handleChangeMovie.bind(this);
        this.handleChangeDirector = this.handleChangeDirector.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleRating = this.handleRating.bind(this);
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        fetch("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id)
            .then(res => res.json())
            .then(movie => {
                this.setState({
                    isLoaded: true,
                    items: movie,

                })
            }).catch(error => {
                console.error(error)
                this.setState({ error: true })
            });


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
        e.preventDefault()
        return fetch("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + this.state.movie, {
            method: 'DELETE'
        }).then(response =>
            response.json().then(json => {
                return json;
            }, this.props.history.push("/"))
        ).catch(error => {
            console.error(error)
        });
    }
    handleChange(e) {
        e.preventDefault()
        fetch("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + this.state.items.id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.items),
        }).catch(error => {
            console.error(error)

        }).then((res) => {
            if(res.status === 400) {
                this.setState({
                    errortext: "Every field has to be filled in"
                })
            }
            else{
                this.setState({
                    errortext: ""
                })
                this.props.history.push("/")
            }
            
        })

            
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
                <div className="container">
                    <h4 className="">Edit Movie</h4>
                    <div className="row col s12 center">
                        <form className="col s12 ">
                            <div className="row">
                                <div className="input-field col s8">
                                    <input id="input_text"
                                        minLength="1"
                                        maxLength="40"
                                        type="text" data-length="20"
                                        value={data.title}
                                        onChange={this.handleChangeMovie} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <input id="input_text"
                                        type="text"
                                        minLength="1"
                                        maxLength="40"
                                        data-length="10"
                                        value={data.director}
                                        onChange={this.handleChangeDirector} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <textarea id="textarea2"
                                        className="materialize-textarea"
                                        minLength="1"
                                        maxLength="300"
                                        autoFocus={true}
                                        data-length="110"
                                        value={data.description}
                                        onChange={this.handleChangeDescription} ></textarea >
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
            )
        }
    }
}
export default Edit