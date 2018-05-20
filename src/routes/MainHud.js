import React, { Component } from 'react';

import Moment from 'react-moment';
import Todo from '../components/MainHud/Todo';
import Search from '../components/MainHud/Search'

function requireAll(r) { 
   r.keys().forEach(r); 
   let images = r.keys();
   images = images.map( path => "../images/backgrounds/" + path );
   return images;
}

let images = requireAll(require.context('../images/backgrounds/', true, /\.jpg$/));

let randomIndex = Math.floor(Math.random() * images.length) + 1;

var randomImgRef = require(`../images/backgrounds/${randomIndex}.jpg`);

class MainHud extends Component {
  render() {
    return (
      <div className="MainHud-bg" style={{backgroundImage: "url("+ randomImgRef +")"}} >
        <div id="mainhud-overlay">
          <div className="date-time">
            <Moment interval={30000} format="ddd / MMM / Y" id="date"/>
            <Moment interval={1000} format="h:mma" id="time"/>
          </div>

          <section id="left-section">
            <Todo />
          </section>

          <section id="mid-section">
            <div></div>
            <div id="search">
              <Search/>
            </div>
            <div id="nav"></div>
          </section>

          <section id="right-section">

          </section>
        </div>
      </div>
    );
  }
}

export default MainHud;