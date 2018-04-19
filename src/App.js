import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardAPI from './FreeCell';


const cardAPI = new CardAPI();
console.log('cardAPI: ', cardAPI);

const suits = cardAPI.suits;
console.log('suits: ', suits);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeCard: false};
  }
  handleFreeCellClick = (i) => {
    console.log("freecell");
    console.log('i: ', i);
    if(! this.state.activeCard) return;
    cardAPI.addToFreeCell(i, this.state.activeCard);
    console.log('cardAPI: ', cardAPI);
    this.setState(prevS => ({
      freeCells: cardAPI.freeCells,
      activeCard: false
    }));
  }
  genSetActive = (card) => () => {
    if(this.state.activeCard) {
      let casId = cardAPI.cardToCascade(card);
      cardAPI.addToCascade(casId, this.state.activeCard);
      this.setState(prevS => ({
        cascades: cardAPI.cascades,
        activeCard: false
      }));
    }
    else {
      this.setState(prevS => ({
        activeCard: card,
      }));
    }
  };

  componentWillMount() {
    this.setState(prevS => ({
      freeCells: cardAPI.freeCells,
      scoreCells: cardAPI.scoreCells,
      cascades: cardAPI.cascades
    }));
  }
  //<button onClick={this.handleAdd}>Add</button>
  render() {
    const freeCells = this.state.freeCells.map(function(cell, i) {
      return <FreeCell cell={cell} i={i} handleClick={this.handleFreeCellClick} handleCardClick={this.genSetActive} />
    }.bind(this));
    const scoreCells = this.state.scoreCells.map((cell, i) => <div className="cell scorecell" key={i}><p className="bgtxt">{suits[cell.name].symbol}</p></div>);
    const cascades = this.state.cascades.map((cas, i) => <Cascade cards={cas} cardClick={this.genSetActive} activeCard={this.state.activeCard} />);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FreeCell</h1>
        </header>
        <div className="game-area">
          <div className="status-bar"><p>10:00 | 3 moves</p></div>
          <div className="top-field">
            <div className="freecells">{freeCells}</div>
            <div id="top-btns">
              <button>New Game</button>
              <button>Undo</button>
            </div>
            <div className="scorecells">{scoreCells}</div>
          </div>
          <div className="main-field">
            {cascades}
          </div>
          <div className="bot-field"></div>
        </div>
      </div>
    );
  }
}


//<Card card={cellcard} pos={i} handleClick={props.cardClick(card)}  />
function FreeCell(props) {
  const { i, handleClick, handleCardClick, cell } = props;
  const cardClick = handleCardClick(cell.card);
  const card = cell.card ? <Card card={cell.card} pos="0" handleClick={cardClick} />
               : false;
  return <div className="cell freecell" key={i} onClick={(e) => handleClick(i, e)} >
           { !cell.card ? <p className="bgtxt">freecell</p> : null }
           {card}
         </div>;
}

function Cascade(props) {
  let { cards, cardClick, activeCard  } = props;
  cards = cards.map((card, i) => {
    return <Card card={card} pos={i} handleClick={cardClick(card)} active={card == activeCard} />
  });
  return <div className="cascade">{cards}</div>;
}

function Card(props) {
  const { card, handleClick, pos, active  } = props;
  const cardStyle = {
    top: pos * 50
  };
  const redCardClass = card.suit == 'hearts' || card.suit == 'diamonds' ? 'red-card' : '';
  const activeClass = active ? 'active' : '';
  const classes = `${redCardClass} ${activeClass} card`;
  return <div onClick={handleClick} style={cardStyle} className={classes} >
          <div className="topLeft">
            <p>{card.name}</p>
            <p>{suits[card.suit].symbol}</p>
          </div>
          <div className="botRight">
            <p>{suits[card.suit].symbol}</p>
            <p>{card.name}</p>
          </div>
        </div>
};

export default App;
