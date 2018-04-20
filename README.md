## [https://btbtravis.github.io/freecell/](https://btbtravis.github.io/freecell/)

The project was created as part of a Technical Challenge from [NGX Interactive](http://ngxinteractive.com/)

### Goal: Create and implementation of classic Windows solitaire card game FreeCell 

**Progress**
- [X] 4 “free cell” positions at top.
- [X] 4 “foundation” position to move cards to complete the game
- [X] 8 cascade columns
- [X] Welcome Screen
- [X] Play screen
- [ ] End screen
  + I have yet to win a game ha but when I do I will build this out
- [X] Follow logic/rules of the classic game
- [X] Random deal to lay out cards in starting cascade columns
- [ ] Clicking on “open” card in a column, will move to open ‘freecell’ if one is available
  + Currently clicking selects a card and then clicking again places the card
- [ ] Ability to drag a single card to new legal position
  + Currently you move cards into legal positions via clicking to select then clicking to place
  + Dragging is a v2 feature
- [X] Cannot move card to illegal position
- [X] It must include some kind of JSON I/O. Show us how you would use JSON for external data.
  + FreeCell class includes a stateToJson method, state is console logged on scoring a card
- [X] All the source code and assets must be uploaded to public GitHub/Bitbucket account

**Issues**
- [ ] [No empty cascades allowed currently](https://github.com/BTBTravis/freecell/issues/1)


**Tech highlights**
+ js object destructuring. [Example in App.js](https://github.com/BTBTravis/freecell/blob/master/src/App.js#L141)
+ business logic separate from the view. [FreeCell.js](https://github.com/BTBTravis/freecell/blob/master/src/FreeCell.js)
+ held off bringing in state management library. No redux or mobx just react.

**Possible Imporvments**
+ unit tests for FreeCell.js
+ good opportunity for generative testing *Ex. try moving every card to every possible location*
+ adding [prop-types](https://www.npmjs.com/package/prop-types) would improve stability
+ add [react dnd](https://github.com/react-dnd/react-dnd) for dragging interaction

