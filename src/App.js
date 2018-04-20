import React, { Component } from 'react';
import './App.css';
import CardAPI from './FreeCell';

const cardAPI = new CardAPI();
const suits = cardAPI.suits;
const prettyNames = (num) => {
  switch (num) {
    case 10:
      return 'J';
    case 11:
      return 'Q';
    case 12:
      return 'K';
    case 1:
      return 'A';
    default:
      return num;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeCard: false};
  }
  handleScoreCellClick = (i) => {
    if(! this.state.activeCard) return; // if we don't have an active card do nothing
    cardAPI.addToScoreCells(i, this.state.activeCard);
    this.setState(prevS => ({
      scoreCells: cardAPI.scoreCells,
      activeCard: false
    }));
  }
  handleFreeCellClick = (i) => {
    if(! this.state.activeCard) return;
    cardAPI.addToFreeCell(i, this.state.activeCard);
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
    const freeCells = this.state.freeCells.map(function (cell, i) {
      return <FreeCell key={i} cell={cell} i={i} handleClick={this.handleFreeCellClick} handleCardClick={this.genSetActive} activeCard={this.state.activeCard} />
    }.bind(this));
    const scoreCells = this.state.scoreCells.map(function (cell, i) {
      return <ScoreCell key={i} cell={cell} i={i} handleClick={this.handleScoreCellClick} />
    }.bind(this));
    const cascades = this.state.cascades.map((cas, i) => <Cascade key={i} cards={cas} cardClick={this.genSetActive} activeCard={this.state.activeCard} />);
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
        <Welcome />
      </div>
    );
  }
}

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }
  handleClick = () => {
    this.setState(prevS => ({
      open: false,
    }));
  }
  render() {
    if(this.state.open){
      const suit = ['hearts', 'diamonds', 'spades', 'clubs'][Math.floor(Math.random() * 4)];
      const card = {
        name: Math.floor(Math.random() * 12),
        suit: suit
      };
      return <div className="welcome-wrapper">
        <div className="welcome">
        <div className="spinner">
        <Card card={card} pos="0" />
        </div>
        <p>Welcome</p>
        <button onClick={this.handleClick}>Start</button>
        </div>
        </div>
    } else return false;
  }
}

function ScoreCell(props) {
  const { i, handleClick, cell } = props;
  const card = cell.card ? <Card card={cell.card} pos="0" handleClick={(e) => handleClick(i, e)} />
                           : false;
  return <div className="cell scorecell" key={i} onClick={(e) => handleClick(i, e)}>
           { !cell.card ? <p className="bgtxt">{suits[cell.name].symbol}</p> : false }
           {card}
         </div>;
}

function FreeCell(props) {
  const { i, handleClick, handleCardClick, cell, activeCard } = props;
  const cardClick = handleCardClick(cell.card);
  const card = cell.card ? <Card card={cell.card} pos="0" handleClick={cardClick} active={cell.card === activeCard} />
               : false;
  return <div className="cell freecell" key={i} onClick={(e) => handleClick(i, e)} >
           { !cell.card ? <p className="bgtxt">freecell</p> : null }
           {card}
         </div>;
}

function Cascade(props) {
  let { cards, cardClick, activeCard  } = props;
  cards = cards.map((card, i) => {
    return <Card key={i} card={card} pos={i} handleClick={cardClick(card)} active={card === activeCard} />
  });
  return <div className="cascade">{cards}</div>;
}

function Card(props) {
  const { card, handleClick, pos, active  } = props;
  const cardStyle = {
    top: pos * 50
  };
  const redCardClass = card.suit === 'hearts' || card.suit === 'diamonds' ? 'red-card' : '';
  const activeClass = active ? 'active' : '';
  const classes = `${redCardClass} ${activeClass} card`;
  return <div onClick={handleClick} style={cardStyle} className={classes} >
          <div className="topLeft">
            <p>{prettyNames(card.name + 1)}</p>
            <p>{suits[card.suit].symbol}</p>
          </div>
          <div className="botRight">
            <p>{suits[card.suit].symbol}</p>
            <p>{prettyNames(card.name + 1)}</p>
          </div>
        </div>
};

export default App;
