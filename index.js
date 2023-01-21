/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    console.log(games.length);
    games.forEach(game => {
      const gameCard = document.createElement("div");
      const info = `
        <img class="game-img" src="${game.img}" alt="${game.name}">
        <h3>${game.name}</h3>
        ${game.description}
        <br><br>
        Backers: ${game.backers}
        `
      gameCard.classList.add("game-card");
      gameCard.innerHTML = info;
      gamesContainer.appendChild(gameCard);
    })
}

addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((total, game) => {
  return total + game.backers;
}, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => {
  return total + game.pledged;
}, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => {
      return game.pledged < game.goal;
    });
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => {
      return game.pledged >= game.goal;
    });
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");
const nbrUnfundedGames = GAMES_JSON.filter(game => {
  return game.pledged < game.goal;
}).length;
const isPluralGames = nbrUnfundedGames === 1 ? "game" : "games";
const displayStr = `A total of ${totalContributions.toLocaleString()} has been raised
  for ${GAMES_JSON.length} games. Currently, ${nbrUnfundedGames} ${isPluralGames} remain unfunded. We need your help 
  to fund these amazing games!`;
const helpParagraph = document.createElement("p");
helpParagraph.innerHTML = displayStr;
descriptionContainer.appendChild(helpParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...otherGames] = sortedGames;
const {name: firstGameName} = firstGame;
const {name: secondGameName} = secondGame;

const firstGameTitle = document.createElement("h3");
firstGameTitle.innerHTML = firstGameName;
firstGameContainer.appendChild(firstGameTitle);

const secondGameTitle = document.createElement("h3");
secondGameTitle.innerHTML = secondGameName;
secondGameContainer.appendChild(secondGameTitle);

/************************************************************************************
 * Bonus Feature: Add a search bar to filter games by name
 */