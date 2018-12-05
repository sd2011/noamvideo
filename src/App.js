import React, { Component } from 'react';
import './css/app.css';
import Index from './components/index/index';
import Video from './components/video/video';

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
      scroll:0,
      width: 10000,
    }
    this.onMobile= ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;
    this.handleScroll = this.handleScroll.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.clicked = false;
  }


  componentDidMount() {
    fetch("/videos")
    .then(res => res.json())
    .then(vimeo => this.setState({vimeo}));
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.updateSize)
}



componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.updateSize);
    document.body.style.overflowY = null;
}

handleScroll(){

  this.state.scroll !==1 && (window.scrollY > 35 && (this.setState({scroll:1 , title: "titleScroll", name: "nameScroll"})));
  this.state.scroll !==2 && (window.scrollY < 6 && (this.setState({scroll: 2, title: "titleScrollUp", name: "nameScrollUp"})));
}

updateSize(){
  this.setState({width: window.innerWidth});
}


  renderMovies(start, finish){
    const amount = (i) => {if( i >= start && i < finish){return true}}
    const currentVimeo = this.state.vimeo.filter((video, i) => images[video.uri.replace("/videos/",'') + '.png'] && amount(i));
    const movies = currentVimeo.map((video, i ) =>{
      return (
        !this.state.onMovie[video.name] ? (
        <div className="movie"
        onMouseEnter={() => this.setState({onMovie:{[video.name]: true}})}
        key={video.name}>
            {this.onMobile && (<div className="movieTitle">{video.name}</div>)}
          <img src={ images[video.uri.replace("/videos/",'') + '.png']} alt="video" />
        </div>
        )
        :
        (
        <div className="movie gif"
        onClick={() => {this.clicked = true;this.setState({ movie:true,currentMovie: video})}}
        onMouseLeave={() => this.setState({onMovie:{}})}
        key={video.name}>
          <div className="movieName"> {video.name} </div>
          <img src={gifs[video.uri.replace("/videos/",'')+ ".gif"]}  alt="video" />
        </div>
        )
      )})
    return movies;
  }

  renderTitle(show){
    const {  scroll, title, name } = this.state;
    return(
      <div className={show ?"titleBackground" : null}>
        <div className={show ? (scroll === 0 ? "title" : title) : "title"} >
          <div className={show ? (scroll === 0 ? "name" : name) : "name"} >
            Noam Ofer
          </div>
            <div className="editor">
              video editor bla bla bla bla bla bla bla
            </div>
        </div>
      </div>
    )
  }

  render() {
    const { movie, currentMovie, transform ,vimeo,width } = this.state;
    if( !vimeo){return <div />}
    document.body.style.overflowY = this.state.movie ? "hidden" : "scroll";
     return (
       <div className="all">
        {movie && (  <Video exit={() => this.setState({movie:false})} movie={currentMovie} transform={transform} clicked={this.clicked} />)}
        <div className="App" >
          {this.renderTitle(true)}
          <div className="scrollHeight">
            {this.renderTitle(false)}
          </div>
          <Index
           movies0={this.renderMovies(0,vimeo.length / 4 * 3 )}
           movies1={this.renderMovies(vimeo.length / 4 * 3 , vimeo.length / 4 * 3.5)}
           movies2={this.renderMovies(vimeo.length / 4 * 3.5 , vimeo.length)}
           onMobile={this.onMobile}
           size={width} />
          <footer className="call">
            <div className="email">
              <div>email: </div><a href='mailto: stom96@gmail.com'>   noamofer@gmail.com</a>
            </div>
          </footer>
        </div>
        </div>
       )
  }
}

export default App;
