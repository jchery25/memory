import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Starter channel={channel} />, root);
}

let intialLetters = [{
  tile: "A",
  show: false,
  isDisabled: false
},{
  tile: "B",
  show: false,
  isDisabled: false
},{
  tile: "C",
  show: false,
  isDisabled: false
},{
  tile: "D",
  show: false,
  isDisabled: false
},{
  tile: "E",
  show: false,
  isDisabled: false
},{
  tile: "F",
  show: false,
  isDisabled: false
},{
  tile: "G",
  show: false,
  isDisabled: false
},{
  tile: "H",
  show: false,
  isDisabled: false
},{
  tile: "A",
  show: false,
  isDisabled: false
},{
  tile: "B",
  show: false,
  isDisabled: false
},{
  tile: "C",
  show: false,
  isDisabled: false
},{
  tile: "D",
  show: false,
  isDisabled: false
},{
  tile: "E",
  show: false,
  isDisabled: false
},{
  tile: "F",
  show: false,
  isDisabled: false
},{
  tile: "G",
  show: false,
  isDisabled: false
},{
  tile: "H",
  show: false,
  isDisabled: false
}]

// Client-Side state for Memory is:
// {
//    skel:  List of letter.
//    goodGuesses: Good guesses, letters match
//    badGuesses:  Bad guesses, letters does not match
//    score: Amount of clicks it took to complete the game
// }
class Starter extends React.Component {
  constructor(props) {
    super(props);
    
    this.channel = props.channel
    
    // this.state = { 
    //   tiles: intialLetters,
    //   guesses: 0,
    //   highestScore: 0,
    //   tilesToCompare: [],
    // };

    this.state = {
      tiles: [],
      guesses: 0,
      highestScore: 0,
    }

    this.channel
        .join()
        .receive("ok", this.got_view.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp); });
  }

  got_view(view) {
    console.log("new view", view);
    this.setState(view.game);
  }

  on_guess(ev){
    this.channel.push("guess", { tile: ev.target.value})
                .receive("ok", this.got_view.bind(this));
  }

  /**
   * Shuffles an array.
   * Reference: https://javascript.info/task/shuffle
   */

  restart() {
    this.shuffle();
    this.setState({
      tiles: [intialLetters],
      highestScore: this.state.guesses,
      tilesToCompare: [],
      guesses: 0
    })
  }

  // compareChoices(choiceOne,choiceTwo){
  //   if(choiceOne.tile == choiceTwo.tile){
  //     setTimeout(()=>{
  //       let newTiles = this.state.tiles.filter(tile => (tile.tile != choiceOne.tile));

  //       this.state.tiles = newTiles;
  //       this.state.guesses++;
  //     }, 100)

  //     } else {
  //       this.state.guesses++;
  //       this.setState({
  //         guesses: this.state.guesses
  //       })
  //   }

  //   setTimeout(() => {
  //     choiceOne.show = false;
  //     choiceOne.isDisabled = false;

  //     choiceTwo.show = false;
  //     choiceTwo.isDisabled = false;

  //     this.setState({
  //       tilesToCompare: [],
  //     })
  //   }, 1000)
  // }

  // displays_tiles() { 
  //   return this.state.tiles.map((tile,index) => { 
  //       return (
  //         <button key={index}
  //                 id={index}
  //                 disabled = {tile.isDisabled}
  //                 className="button button-outline tiles"
  //                 onClick={()=>{
  //                   if(this.state.tilesToCompare.length < 2){
  //                     this.state.tilesToCompare.push(tile);
                      
  //                     tile.show = !tile.show;
  //                     tile.isDisabled = true;
  //                   }

  //                   if(this.state.tilesToCompare.length === 2){
  //                     this.compareChoices(this.state.tilesToCompare[0],this.state.tilesToCompare[1]);
  //                   } 

                    

  //                   this.setState({
  //                     tiles: this.state.tiles,
  //                   }) 
                  
  //                 }}> {tile.show ? tile.tile : null} </button>
  //       )
  //   })
  // }


  render() {
      return (
        // <div className="game_layout">
        //     <p>Guesses: {this.state.guesses} | Highest Score: {this.state.highestScore}</p>  

        //     <div id="grid" >
        //       {this.displays_tiles()}
        //     </div>

        //     <div className="game_board">
        //       <button className="button" onClick={this.restart.bind(this)}>Reset Game</button>
        //     </div>
        // </div>
      <div className="game_layout">
          <Score guesses={this.state.guesses} highest={this.state.highestScore} />

          <Display tiles={this.state.tiles} channel={this.channel} view={this.got_view.bind(this)}/>

          <Restart restart={this.restart.bind(this)} />

      </div>
      );
    }
}

function Score(params){
  let {guesses, highest} = params;
  return(
    <div>
      <p>Guesses: {guesses} | Highest Score: {highest}</p>  
    </div>
  )
}

function Display(params){
  let {tiles, channel, view} = params;
  
  return(
    <div id="grid">
      {
        tiles.map((tile,index) => { 
          return (
            <button key={index}
                    className="button button-outline tiles"
                    value={tile.tile}
                    id={index}
                    onClick={()=> {
                      let test = channel.push("showTile", {key: index})
                                  .receive("ok", view);
                    }}> { tile.show ? tile.tile : null } </button>
          )
        })
      }
    </div>
  )
}

function Restart(params){
  let {restart} = params;
  return(
    <div className="game_board">
      <button className="button" onClick={restart}>Reset Game</button>
    </div>
  )
}


