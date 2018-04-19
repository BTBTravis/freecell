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
  + Using click selection in intrest of time
- [X] Cannot move card to illegal position
- [X] It must include some kind of JSON I/O. Show us how you would use JSON for external data.
  + FreeCell class includes a stateToJson method, state is console logged on scoring a card
- [X] All the source code and assets must be uploaded to public GitHub/Bitbucket account
