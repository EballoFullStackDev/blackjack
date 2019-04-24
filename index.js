const cardNumbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
const suits = ["spades", "hearts", "clubs", "diamonds"];
const cardsRemaining = document.getElementById("cardsRemaining");
let deck = [];
const hand = [];
let playerWonAmount = 0;
let dealerWonAmount = 0;
const playerCardImage = document.getElementById("playerCardImage");
const dealerCardImage = document.getElementById("dealerCardImage");




document.addEventListener("DOMContentLoaded", () => {
  resetDeck();
  displayRemainingCards();
  displayWinningAmounts();
});

document.getElementById("showCardsButton").addEventListener("click", () => {
  displayCards();
});

document.getElementById("resetButton").addEventListener("click", () => {
  resetDeck();
  displayRemainingCards();
  document.getElementById("showCardsButton").removeAttribute("disabled");
  document.getElementById("resetButton").setAttribute("disabled", true);
});

const displayCards = () => {
  const showPlayerCard = document.getElementById("playerCard");
  const showDealerCard = document.getElementById("dealerCard");

  const playerCard = deck.splice([Math.floor(Math.random() * deck.length)], 1);
  const dealerCard = deck.splice([Math.floor(Math.random() * deck.length)], 1);

  const { cardNumber: playerCardNumber, suit: playerSuit, image: pCardImage } = playerCard[0];
  const { cardNumber: dealerCardNumber, suit: dealerSuit, image: dCardImage } = dealerCard[0];

  const playerCardSuit = playerSuit[0].split("")[0].toUpperCase();
  const dealerCardSuit = dealerSuit[0].split("")[0].toUpperCase();
  
  const playerImage = playerCardNumber + playerCardSuit;
  const dealerImage = dealerCardNumber + dealerCardSuit;

  playerCardImage.setAttribute("src", pCardImage);
  dealerCardImage.setAttribute("src", dCardImage);

  showPlayerCard.innerHTML = `Player has the ${playerCardNumber} of ${playerSuit}`;
  showDealerCard.innerHTML = `Dealer has the ${dealerCardNumber} of ${dealerSuit}`;

  outcome(playerCard, dealerCard);
};

const outcome = (playerCard, dealerCard) => {
  const { cardNumber: playerCardNumber, suit: playerSuit } = playerCard[0];
  const { cardNumber: dealerCardNumber, suit: dealerSuit } = dealerCard[0];
  const result = document.getElementById("result");

  const playerCardValue = convertCardnumber(playerCardNumber);
  const dealerCardValue = convertCardnumber(dealerCardNumber);
  const playerSuitValue = checkSuit(playerSuit);
  const dealerSuitValue = checkSuit(dealerSuit);

  displayRemainingCards();

  if (deck.length === 0) {
    document.getElementById("showCardsButton").setAttribute("disabled", true);
    document.getElementById("resetButton").removeAttribute("disabled");
  }

  if (dealerCardValue == playerCardValue) {
    result.textContent = compareSuits(dealerSuitValue, playerSuitValue);
  } else if (dealerCardValue > playerCardValue) {
    result.textContent = `Dealer Wins`;
    dealerWonAmount += 1;
    displayWinningAmounts();
  } else {
    result.textContent = `Player Wins`;
    playerWonAmount += 1;
    displayWinningAmounts();
  }
};

const convertCardnumber = cardNumber => {
  switch (cardNumber) {
    case "A":
      return 14;

    case "K":
      return 13;

    case "Q":
      return 12;

    case "J":
      return 11;

    default:
      return parseInt(cardNumber);
  }
};

const checkSuit = suit => {
  switch (suit) {
    case "clubs":
      return 1;
    case "spades":
      return 2;
    case "hearts":
      return 3;
    case "diamonds":
      return 4;
  }
};

const compareSuits = (dealer, player) => {
  if (dealer > player) {
    dealerWonAmount += 1;
    displayWinningAmounts();
    return `Dealer Wins`;
  } else {
    playerWonAmount += 1;
    displayWinningAmounts();
    return `Player Wins`;
  }
};

const displayRemainingCards = () => {
  cardsRemaining.textContent = `${deck.length} remaining cards`;
};

const resetDeck = () => {
  deck = [];
  playerCardImage.setAttribute("src", "images/cards/Gray_back.jpg");
  dealerCardImage.setAttribute("src", "images/cards/Gray_back.jpg");

  cardNumbers.forEach(card => {
    suits.forEach(suit => {
      const split = suit.split("")[0].toUpperCase();
      deck.push({
        cardNumber: card,
        suit: suit,
        image: `images/cards/${card+split}.jpg`
      });
    });
  });
};

const displayWinningAmounts = () => {
  const dealerWonParagraph = document.getElementById("dealerWon");
  const playerWonParagraph = document.getElementById("playerWon");

  dealerWonParagraph.textContent = dealerWonAmount;
  playerWonParagraph.textContent = playerWonAmount;
};


