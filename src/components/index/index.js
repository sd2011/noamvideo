import React from 'react';
import '../../css/index.css';
import './functions/index';

const Index = (props) => {
    return(
      <div>
        <div className="allBody">
          <div className="allMovies">
            <div className="column" key="1">{props.movies0}{props.movies1}</div>
            <div className="column" key="2">{props.movies1}{props.movies0}</div>
            <div className="column" key="3">{props.movies0}{props.movies1}</div>
          </div>
          <div className="call">
            <div className="email">
              <div>email: </div><div className="addres">   noamofer@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Index;
