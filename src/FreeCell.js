let suits = [
  {
    name: 'hearts',
    symbol:'♥',
  },
  {
    name: 'clubs',
    symbol: '♣',
  },
  {
    name: 'spades',
    symbol: '♠',
  },
  {
    name: 'diamonds',
    symbol: '♦',
  }
];

// list of all possible cards 0 - 12 where 0 is ace, 11, is jack...
let cards = [].concat.apply([],
  suits.map(suit => {
    let suits_cards = [];
    for (var i = 0; i < 12; i++) {
      suits_cards.push({
        name: i,
        suit: suit.name
      });
    }
    return suits_cards;
  })
);

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
let _shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default class CardAPI {
  constructor() {
    this.freeCells = [
      {
        card: false
      },
      {
        card: false
      },

      {
        card: false
      },
      {
        card: false
      },
    ];
    this.scoreCells = [
      {
        name: 'hearts',
        card: false,
      },
      {
        name: 'clubs',
        card: false,
      },
      {
        name: 'spades',
        card: false,
      },
      {
        name: 'diamonds',
        card: false,
      }
    ];
    this.cascades = [
      {
        cards: [],
        max: 7
      },
      {
        cards: [],
        max: 7
      },
      {
        cards: [],
        max: 7
      },
      {
        cards: [],
        max: 7
      },
      {
        cards: [],
        max: 6
      },
      {
        cards: [],
        max: 6
      },
      {
        cards: [],
        max: 6
      },
      {
        cards: [],
        max: 6
      },
    ];
    this.cascades =  this._fillcas(this.cascades,_shuffle(cards));
    this.suits = suits.reduce((carry, suit) => {
      carry[suit.name] = suit;
      return carry;
    }, {});
  }

  addToScoreCells(i, card) {
    let cesId = this.cardToCascade(card);
    if(cesId !== false){ // check card is last in cascade
      let index = this.cascades[cesId].indexOf(card);
      if(index !== this.cascades[cesId].length - 1) return;
    }
    if(this.scoreCells[i].name !== card.suit) return; // only allow cards of same suit
    if (this.scoreCells[i].card === false && card.name !== 0) return; // allow ace if no card
    else if (this.scoreCells[i].card !== false && (card.name !== this.scoreCells[i].card.name + 1)) return; // only allow larger numbers
    // move card
    this.freeCells = this.freeCells.map(cell => { // remove card from free cell
      if(cell.card === card) cell.card = false;
      return cell;
    });
    this.cascades = this.cascades.map(ces => { // remove card from cascades
      let index = ces.indexOf(card);
      if(index !== -1){
        ces.splice(index, 1);
      }
      return ces;
    });
    this.scoreCells[i].card = card;
    console.log(this.stateToJson());
  }

  /*
   * add a card from a current cascade or freecell to a different cascade if rules allow
   * @pram {int} id of cascade being added to
   * @pram {Card} card to add to cascade
   */
  addToCascade(i, card) {
    let cesId = this.cardToCascade(card);
    let part;
    if(cesId !== false){ // check this cascade
      let index = this.cascades[cesId].indexOf(card);
      part = this.cascades[cesId].slice(index);
      let checkCard = (ecard, ces) => {
        let index = ces.indexOf(ecard);
        if(index < 0) return false; // if the card is not in the ces its not eligible
        if(index === ces.length - 1) return true; // if the card is last in the ces it is eligible
        let nextCard = ces[index + 1];
        if((nextCard.suit === 'hearts' || nextCard.suit === 'diamonds') && (ecard.suit === 'hearts' || ecard.suit === 'diamonds')) return false;
        if((nextCard.suit === 'clubs' || nextCard.suit === 'spades') && (ecard.suit === 'clubs' || ecard.suit === 'spades')) return false;
        if(nextCard.name !== ecard.name - 1) return false;
        return true;
      };

      let eligible = part.reduce((bool, partCard) => {
        if(bool) return checkCard(partCard, this.cascades[cesId]);
        else return bool;
      }, true);
      if(!eligible) return;

    } else { // check freecell
      let freeCellCards = this.freeCells.reduce((arr, cell) => {
        arr.push(cell.card);
        return arr;
      }, []);
      if(!freeCellCards.includes(card)) return;
    }

    if(!this.cascades[i]) return;
    let lastCard = this.cascades[i][this.cascades[i].length - 1];
    // knock out same color
    if((lastCard.suit === 'hearts' || lastCard.suit === 'diamonds') && (card.suit === 'hearts' || card.suit === 'diamonds')) return;
    if((lastCard.suit === 'clubs' || lastCard.suit === 'spades') && (card.suit === 'clubs' || card.suit === 'spades')) return;
    // knock out wrong number
    if(card.name !== lastCard.name - 1) return;

    // move card
    let add = card;
    this.freeCells = this.freeCells.map(cell => { // remove card from free cell
      if(cell.card === card) cell.card = false;
      return cell;
    });
    this.cascades = this.cascades.map(ces => { // remove card from cascades
      let index = ces.indexOf(card);
      if(index !== -1){
        add = ces.slice(index);
        ces.splice(index, add.length);
      }
      return ces;
    });
    this.cascades[i] = this.cascades[i].concat(add);
  }

  cardToCascade(card) {
    let numberedCas = this.cascades.map((ces, i) => {
      return {ces: ces, i: i};
    });
    return numberedCas.reduce((num, obj) => {
      return obj.ces.includes(card) && num === false ? obj.i : num;
    }, false);
  }

  addToFreeCell(i, card) {
    //if(this.freeCells[i].card) this.freeCells[i].card = false;

    if(this.freeCells[i].card) return; // check if free sell is occupied
    // check if card is last of a cascade
    let lastCards = [].concat.apply([],
      this.cascades.map(cas => {
        return cas.length > 0 ? cas[cas.length - 1] : [];
    }));
    if(! lastCards.includes(card)) return;
    // move card
    this.cascades = this.cascades.map(ces => {
      let index = ces.indexOf(card);
      if(index !== -1) ces.splice(index, 1);
      return ces;
    });
    this.freeCells[i].card = card;
  }


  /**
   * Init fill of cascades with cards
   * @param {Array} expecting sub arrays to be {Object} with .max and .cards
   * @param {Array} cards { .name .suit }
   */
  _fillcas (cas, cards) {
    let cardsClone = cards.slice(0);
    let filled = cas.reduce((carry, cas) => {
      let newCas = [];
      for (var i = 0; i < cas.max; i++) {
        if(carry.cards.length > 0) newCas.push(carry.cards.pop());
      }
      carry.cas.push(newCas);
      return carry;
    },{ cards: cardsClone, cas: [] });
    return filled.cas;
  };

  stateToJson () {
    return JSON.stringify({
      freeCells: this.freeCells,
      scoreCells: this.scoreCells,
      cascades: this.cascades
    });
  }
}
