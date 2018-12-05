import React from 'react';
import '../../css/index.css';
import _ from 'lodash';

const Index = (props) => {
  const { onMobile , movies0 ,movies1, movies2 , size } = props;
  const column = onMobile ? "noColumn" : "column"

    return(
          <div className="allMovies">
            <div className={column} width={size < 700 ? "50%" : '33%'} key="1">{movies0}{size < 700 && (_.filter(movies1,(movie, key, obj) => key > obj.length / 2))}</div>
            {size > 700 && (<div className={column} width="33%" key="2">{movies1}</div>)}
            <div className={column} width={size < 700 ? "50%" : '33%'} key="3">{movies2}{size < 700 && (_.filter(movies1,(movie, key, obj) => key < obj.length / 2))}</div>
          </div>
    );
}

export default Index;
