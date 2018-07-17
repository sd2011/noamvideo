import React, { Component } from 'react';
import './css/index.css';
import Index from './components/index/index';
import Video from './components/video';

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
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
}

componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
}

handleScroll(){
  !this.state.scroll && this.setState({scroll: {padding: '0px', margin: '0px'}});
}


  renderMovies(num){
    const currentImages = Object.values(images).slice(num, num + 3);
    const names = Object.keys(images).slice(num, num + 3);
    const movies = currentImages.map((img, i) =>{
      const movie = names[i].replace('.png','');
      return (
        !this.state.onMovie[movie] ? (
        <div className="movie"
        onMouseOver={(e) => this.setState({onMovie:{[movie]: true}})}
        key={i}>
            <img src={ img } alt="video" />
        </div>
        )
        :
        (
        <div className="movie gif"
        onClick={(e) => this.setState({ movie:true,currentMovie: movie })}
        onMouseOut={(e) => this.setState({onMovie:{}})}
        key={i}>
          <div className="movieName"> {movie} </div>
          <img src={gifs[movie + ".gif"]}  alt="video" />
        </div>
        )
      )})
    return movies;
  }

  render() {
    const { movie, currentMovie, scroll } = this.state;
     return !movie ? (
      <div className="App">
        <div className="titleBackground">
          <div className="title" style={scroll && scroll}>
            <div className="name">
              Noam Ofer
            </div>
              <div className="editor">
                video editor bla bla bla bla bla bla bla
              </div>
          </div>
        </div>
         <Index movies0={this.renderMovies(0)} movies1={this.renderMovies(3)} />
        </div>
       )
      :
      (
        <Video exit={() => this.setState({movie:false})} movie={currentMovie} />
      )
  }
}

export default App;
