import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

const tiles = ["A","B","C","D","E","F","G","H","A","B","C","D","E","F","G","H"];

/**
 * Shuffles an array.
 * Reference: https://javascript.info/task/shuffle
 */
function shuffle() {
  tiles.sort(() => Math.random() - 0.5);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isGameRestarted: false,
    };
     shuffle();
  }
  
  displays_tiles(){
    // shuffle()
    return tiles.map((tile,index) => {
      return (
            <button 
                id={index}
                className="button button-outline tiles"                
                key={index}
                onClick={()=> {
                  if(_.isEmpty(document.getElementById(index).innerHTML)){
                    document.getElementById(index).innerHTML = tile;
                  } else {
                    document.getElementById(index).innerHTML = "";
                  }
                }}
                type="button">
                  {undefined}
            </button>
        
      )
    })
  }

  // swap(_ev) {
  //    let state1 = _.assign({}, this.state, { left: !this.state.left });
  //   this.setState(state1);
  // }

  // hax(_ev) {
  //   alert("hax!");
  // }

  render() {
    // let button = <div className="column" onMouseMove={this.swap.bind(this)}>
    //   <p><button onClick={this.hax.bind(this)}>Click Me</button></p>
    // </div>;

    // let blank = <div className="column">
    //   <p>Nothing here.</p>
    // </div>;

    // if (this.state.left) {
    //   return <div className="row">
    //     {button}
    //     {blank}
    //   </div>;
    // }
    // else {
    //   return <div className="row">
    //     {blank}
    //     {button}
    //   </div>;
    // }
    if(this.state.isGameRestarted){
     
      // Restart gameboard
      // Restart the score (amount of clicks)
      // Randomize cards
      // Restart timer
    } else {
      return (
        <div id="grid" >
          {this.displays_tiles()}
        </div>

      )
    }
  }
}

