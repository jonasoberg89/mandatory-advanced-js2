import React, { Component } from 'react';
import Rater from 'react-rater'
import { Link } from "react-router-dom"
import 'react-rater/lib/react-rater.css' 

class Info extends Component {
    constructor(props){
      super(props);
      this.state = {
          items: [],
          isLoaded:false,
          movie:props.match.params.id
      }
    }
    componentDidMount(){
      fetch("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies")
        .then(res => res.json())
        .then(movies=>{
        for (let movie of movies){
        if(movie.id === this.state.movie){
          this.setState({
            isLoaded:true,
            items:movie,
            
          })
          console.log (this.state.items)
        }}
        })
        
        .catch(error=>{
          console.error(error)
        })
    }
    render() {
    const movie = this.state.items
    if (!this.state.isLoaded || this.state.items.length === 0) {
        return (
            <div className="container">
                <h4 className="center">Loading...</h4>
            </div>
        )
    } else {
        return (
            <div className="container">
            <h4 className="center">Info</h4>
                <div className="post card">
                <p className="right info-edit"><Link to={"/Edit/"+movie.id}>Edit</Link></p>
                    <div className="card-content ">
                    <h4>{movie.title}</h4>
                    <h6>Director: {movie.director}</h6>
                    <p><Rater total={5} interactive={false} rating={Number(parseFloat(movie.rating)).toFixed(1)}/>({movie.rating})</p>
                    <p>Description: {movie.description}</p>
                    </div>
                </div>
            </div>
            )
    }
}
}
export default Info