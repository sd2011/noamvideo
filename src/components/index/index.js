import React from 'react';
import '../../css/index.css';
import './functions/index';

const Index = (props) => {
    return(
      <div className="App">
        <div className="titleBackground">
          <div className="title">
            <div className="name">
              Noam Ofer
            </div>
            <div className="editor">
              video editor bla bla bla bla bla bla bla
            </div>
          </div>
        </div>
        <div className="allBody">
          <div className="allMovies">
            <div className="movies">{props.movies}</div>
            <div className="movies">{props.movies}</div>
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
