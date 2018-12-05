import React from 'react';
import  Share  from "./share";


const Options = (props) =>{
  return(
    <div className="opAnDrop"
    onMouseOver={props.over} onMouseOut={props.out}>
      <div className={"options " + (props.hidden ? "back" : "")}>
        <div className="exit" onClick={props.exit}>
          <div className="line" style={{ transform: 'rotate(45deg)' }} >
            <div className="line" style={{ transform: 'rotate(-90deg)'}} />
          </div>
        </div>
        {/*<div className='share' onClick={props.share} movie={props.movie}>
          <div className="shareRight">
            <div className='circle cDown' />
            <div className="circle cUp" />
          </div>
          <div className="shareMiddle">
            <div className="line" style={{ transform: 'rotate(-35deg)'}} />
            <div className="line" style={{ transform: 'rotate(35deg)'}} />
          </div>
          <div className="shareLeft">
            <div className="circle" />
          </div>
        </div>*/}
      </div>
      <Share hidden={props.sharingHidden ? "back" : "forwards"} />
    </div>
  );
}

export default Options;
