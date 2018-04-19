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

// list of all possible cards
let cards = [].concat.apply([],
  suits.map(suit => {
    let suits_cards = [];
    for (var i = 0; i < 13; i++) {
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
    this.count = 4;
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
        card:[],
      },
      {
        name: 'clubs',
        card:[],
      },
      {
        name: 'spades',
        card:[],
      },
      {
        name: 'diamonds',
        card:[],
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

  addToFreeCell(i, card) {
    console.log('i: ', i);
    console.log('card: ', card);
    //if(this.freeCells[i].card) this.freeCells[i].card = false;

    if(this.freeCells[i].card) return; // check if free sell is occupied
    // check if card is last of a cascade
    let lastCards = [].concat.apply([],
      this.cascades.map(cas => {
        return cas.length > 0 ? cas[cas.length - 1] : [];
    }));
    console.log('lastCards: ', lastCards);
    if(! lastCards.includes(card)) return;
    // move card
    this.cascades = this.cascades.map(ces => {
      let index = ces.indexOf(card);
      if(index != -1) ces.splice(index, 1);
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
}
