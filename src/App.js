import React, { Component } from 'react';
import './css/index.css';
import _ from 'lodash';
import Index from './components/index/index';

function importAll(r){
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./pics', false, /\.png$/));
const gifs = importAll(require.context('./gifs', false, /\.gif$/));

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      movie: false,
      currentMovie:"",
      onMovie:{},
    }
  }

  renderMovies(){
    console.log(this.state.onMovie);
    const movies = _.map(images, (img, i) =>{const movie = i.replace('.png',''); return (
      <div>
        {this.state.onMovie[movie] ?
        (<div className="movieName"> {movie} </div>)
        :
        (<div className="movieHide"/>)}
        <div className="movie"
         onClick={(e) => this.setState({movie:true,currentMovie:e.target.src})}
         onMouseOver={(e) => this.setState({onMovie:{[movie]: true}})}
         onMouseOut={(e) => this.setState({onMovie:{}})}
         key={i}
        >
          <img src={!this.state.onMovie[movie] ? img : gifs[movie + ".gif"]} alt="video" />
        </div>
      </div>
    )})
    return movies;
  }

  render() {
    const { movie, currentMovie } = this.state
    return !movie ?
    <Index movies={this.renderMovies()} />
    :
      (<div>

        <div className="showMovie"><img src={currentMovie} alt="video" /></div>
      </div>
    );
  }
}

export default App;
