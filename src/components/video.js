import React from 'react';
import '../css/index.css';
const Video = (props) =>{
  return(
      <div className="showMovie">
        <div className="exit" onClick={props.exit}>
          <div className="lineA">
            <div className="lineB" />
          </div>
        </div>
        <video width="90%" height="90%" margin="auto" controls>
          <source src={require(('../videos/' + props.movie + ".mp4"))} type="video/mp4" alt= "video" />
        </video>
      </div>
  );
}

export default Video;
