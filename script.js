// ==================================================
// Global Variables
// ==================================================

let playersTurn = 1; // matches with starting instructions
const player1CardArray = [];
const player2CardArray = [];
let canClick = true;

// create a global array for # of cards to draw
const numOfCards = [];
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const gameInfo = document.createElement('div');
let cardContainer;

// ==================================================
//  Helper Functions
// ==================================================

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

// makeDeck helper functionss
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbols = ['♥', '♦️', '♣', '♠'];
  const suitColours = ['red', 'red', 'black', 'black'];

  // Loop over the suits
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbols[suitIndex];
    const currentColour = suitColours[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // Create a new card with the current name
      // suit, and rank, colour, displayName, and suitSymbol
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        colour: currentColour,
        displayName,
        suitSymbol: currentSuitSymbol,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// createCard function
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add(cardInfo.suit, cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;
  console.log(name.innerText);

  const card = document.createElement('div');
  card.classList.add('card', 'whiteBackground');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const deck = shuffleCards(makeDeck());

// create a function to compare the ranks of the cards from the input cardArray
const compareCardsRankDiff = (cardArray) => {
  // loop through cardArrays to keep finding the minRank and maxRanks
  let minRank = 1000;
  let maxRank = 0;
  for (let i = 0; i < cardArray.length; i += 1) {
    if (cardArray[i].rank < minRank) {
      minRank = cardArray[i].rank;
    }
    if (cardArray[i].rank > maxRank) {
      maxRank = cardArray[i].rank;
    }
  }

  const rankDiff = Math.abs(maxRank - minRank);

  return rankDiff;
};

// ===================================================
//  Player Action Callbacks functions
// ==================================================

// player 1's turn to draw the card
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = '';
    setTimeout(() => {
    // create a loop
      for (let i = 0; i < numOfCards.length; i += 1) {
        // setTimeout for player1 to draw the cards

        // Pop player 1's first card metadata from the deck
        const player1Card = [];
        player1Card[i] = deck.pop();
        player1CardArray.push(player1Card[i]);

        // Create card element from card metadata
        const cardElement = [];
        cardElement[i] = createCard(player1Card[i]);

        // Append the card element to the card container
        cardContainer.appendChild(cardElement[i]);
      }

      // Switch to player 2's turn
      playersTurn = 2;
      canClick = true;
    }, 2000);
  }
};

// player 2's turn to draw the card
const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    setTimeout(() => {
    // create a loop to generate no.of cards according to user input
      for (let i = 0; i < numOfCards.length; i += 1) {
        // Pop player 2's card metadata from the deck
        const player2Card = [];
        player2Card[i] = deck.pop();
        player2CardArray.push(player2Card[i]);

        // Create card element from card metadata
        const cardElement = [];
        cardElement[i] = createCard(player2Card[i]);

        // Append card element to card container
        cardContainer.appendChild(cardElement[i]);
      }

      // change canClcik back to true
      canClick = true;

      // Switch to player 1's turn
      playersTurn = 1;

      // Determine and output winner
      if (
        compareCardsRankDiff(player1CardArray)
        > compareCardsRankDiff(player2CardArray)
      ) {
        output('player 1 wins');
      } else if (
        compareCardsRankDiff(player1CardArray)
        < compareCardsRankDiff(player2CardArray)
      ) {
        output('player 2 wins');
      } else {
        output('tie');
      }
    }, 2000);
  }
};

// initiate game function
const initGame = () => {
  // creating a container element for the cards
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  // create an input option for user to choose how many cards to draw
  const cardNumInput = document.createElement('input');
  cardNumInput.setAttribute('id', 'player-box');
  cardContainer.appendChild(cardNumInput);
  cardNumInput.placeholder = '# of cards to draw?';

  // create a submit option for user to confirm no. of cards to draw
  const submitBtn = document.createElement('button');
  submitBtn.innerText = 'submit';
  submitBtn.setAttribute('id', 'submit-button');
  cardContainer.appendChild(submitBtn);

  // create a helper function to store user input on # of cards to draw
  const numOfCardsDraw = () => {
    numOfCards.length = document.getElementById('player-box').value;
    console.log('s');
  };

  // create an eventListener
  submitBtn.addEventListener('click', numOfCardsDraw);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);
  player1Button.setAttribute('class', 'player-button');

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);
  player2Button.setAttribute('class', 'player-button');

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

// call the function to initate the game
initGame();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Comfortable Versions (High/Low card)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Each player can draw multiple cards each

// Each player will compare the rank in the cards he drew

// winner is the one who has the greatest difference in rank b/w the his highest and lowest card

// change the CSS to display each player's card in a row
