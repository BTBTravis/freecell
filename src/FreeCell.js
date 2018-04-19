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

export default (services) => () => {

  let FreeCells = [[],[],[],[]];
  let ScoreCells = [[],[],[],[]];
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
  let cascades = [
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

  /**
   * Init fill of cascades with cards
   * @param {Array} expecting sub arrays to be {Object} with .max and .cards
   * @param {Array} cards { .name .suit }
   */
  let _fillcas = (cas, cards) => {
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


  return {
    initCascades: _fillcas(cascades,_shuffle(cards)),
    shuffledCards: _shuffle(cards)
  };




}
