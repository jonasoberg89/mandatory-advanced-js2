import React, { Component } from 'react';
import Rater from 'react-rater'
import { Helmet } from "react-helmet";
import axios from "axios";
import 'react-rater/lib/react-rater.css'
import { Link } from "react-router-dom"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            search: "",
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.source = axios.CancelToken.source();
        axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies", { cancelToken: this.source.token })
            .then(
                (res) => {
                    console.log(res);
                    this.setState({
                        isLoaded: true,
                        data: res.data,
                    })
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    componentWillUnmount() {
        this.source.cancel();
    }
    handleSearch(e) {
        this.setState({ search: e.target.value })
    }
    render() {
        let filterList = this.state.data.filter(
            (movie) => {
                return movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                    || movie.director.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
        if (!this.state.isLoaded) {
            return (
                <div className="container home">
                    <h4 className="center">Loading...</h4>
                </div>
            )
        }
        else if (this.state.data.length === 0) {
            return (
                <div className="container home">
                    <h4 className="center">No movies on the server...</h4>
                </div>
            )
        }
        else {
            return (
                <>
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                    <div className="container home">
                        <div className="row searchField">
                            <div className="input-field">
                                <input id="input_text"
                                    autoComplete="off"
                                    minLength="1"
                                    maxLength="40"
                                    type="text" data-length="20"
                                    value={this.state.movieValue}
                                    onChange={this.handleSearch} />
                                <label htmlFor="textarea1">Search</label>
                            </div>
                        </div>
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Director</th>
                                    <th>Raiting</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterList.map(movie => {
                                    return (
                                        <tr key={movie.id}>
                                            <td><Link to={"/Info/" + movie.id} >{movie.title}</Link></td>
                                            <td>{movie.director}</td>
                                            <td><Rater total={5} interactive={false} rating={(parseFloat(movie.rating)).toFixed(1)} />({movie.rating})</td>
                                            <td><Link to={"/Edit/" + movie.id}>Edit</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )
        }

    }
}

export default Home;