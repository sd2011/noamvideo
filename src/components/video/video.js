import React, { Component} from 'react';
import Player from '@vimeo/player';
import Options from './options';
import '../../css/video.css';
class Video extends Component{
  constructor(props){
    super(props);

    this.state = {
      hidden: true,
      sharingHidden: true,
    }
    this.timeout = 0;
    this.player = false;
    this.over = false;
    this.noMove = this.onMove.bind(this);
    this.onOver  = this.onOver.bind(this);
    //this.keyPress = this.keyPress.bind(this);
    this.playing = true;
    this.firstVolume = false;
    this.keyPress = this.keyPress.bind(this);
  }


  componentDidMount(){
    this.player = new Player('iframe', {id:Number(this.props.movie.uri.replace("/videos/",'')), width: '640px'});
  document.addEventListener("keydown",(e) => {this.keyPress(e)});
  }

  componentWillUnmount(){
    this.player.destroy()
    document.removeEventListener('keydown',(e) => {this.keyPress(e)});
  }

  keyPress(e){
   e.keyCode === 27 && this.props.exit();
  }

  onOver(bool){
    clearTimeout(this.timeout);
    this.over = bool ? true : false;
  }

  onSharing(){
    this.state.sharingHidden && this.setState({sharingHidden: false});
  }


  onMove(e,hidden){
    clearTimeout(this.timeout);
    !this.over && !hidden && (this.timeout = setTimeout(() => {this.setState({hidden: true, sharingHidden:true });}, 3000));
    hidden && this.setState({hidden: false });
  }


  render(){
    console.log(this.player);
    const { hidden, sharingHidden } = this.state;
     //this.player && this.props.clicked && this.player.play();
    return(
        <div className={"showMovie " + (hidden ? "hidden" : "")}  onMouseMove={(e) =>this.onMove(e,hidden)} tabIndex="0" >
          <Options exit={this.props.exit} hidden={hidden} movie={ this.props.movie} share={() => this.onSharing()} sharingHidden={sharingHidden} over={() => this.onOver(true)} out={() => this.onOver(false)} />
          <div className="movieNow" id="iframe" tabIndex='1'  />
        </div>
    );
  }
}

export default Video;
