// Get references to the HTML elements
const grassButton = document.getElementById('btn--grass');
const fireButton = document.getElementById('btn--fire');
const waterButton = document.getElementById('btn--water');
const playerTypeText = document.getElementById('player');
const computerTypeText = document.getElementById('computer');
const outcomeText = document.getElementById('outcome');
const playerScoreText = document.getElementById('player-score');
const computerScoreText = document.getElementById('computer-score');
const chooseTypeText = document.getElementById('choose-type');
const playerPkmnImgBlock = document.getElementById('player-pkmn');
const computerPkmnImgBlock = document.getElementById('computer-pkmn');
const playerShiniesText = document.getElementById('player-shinies');
const computerShiniesText = document.getElementById('computer-shinies');

//create scores and set to 0
//create playertype and computer type variables
//create gameplay variable and set to true
//start new round
let gameplay = true
let playerScore = 0
let computerScore = 0
playerScoreText.textContent = `${playerScore}`;
computerScoreText.textContent = `${computerScore}`;
var playerType
var computerType
var playerPkmn 
var playerPkmnImg
var computerPkmn
var computerPkmnImg
var playerPkmnCaps
var computerPkmnCaps
let playerShinies = 0
let computerShinies = 0

newRound()

//define function to fetch player Pokemon name from API
async function getNameAPI(type){
  let response = await fetch(`https://pokeapi.co/api/v2/type/${type}?limit=1`);
  let data = await response.json();
  const randomNo = Math.floor(Math.random() * data.pokemon.length)
  console.log(randomNo)
  playerPkmn = data.pokemon[randomNo].pokemon.name
  playerPkmnCaps = capitaliseName(playerPkmn)
  console.log(playerPkmn)
  getImgAPI(`${playerPkmn}`)
  playerReveal(type)
}


//define function to fetch player Pokemon img from API
async function getImgAPI(pkmn){
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}`);
  let data = await response.json();
  console.log(data)
  const randomNo = Math.floor(Math.random() * 8192); //8192
  if (randomNo === 0){
  playerPkmnImg = data.sprites.front_shiny;
  playerShinies++;
  playerShiniesText.textContent = `${playerShinies}`;
  } else {
  playerPkmnImg = data.sprites.front_default;  
  }
  console.log(playerPkmnImg)
  playerPkmnImgBlock.src = playerPkmnImg
}

//define function to fetch computer Pokemon name from API
async function getCompNameAPI(type){
  let response = await fetch(`https://pokeapi.co/api/v2/type/${type}?limit=1`);
  let data = await response.json();
  const randomNo = Math.floor(Math.random() * data.pokemon.length)
  console.log(randomNo)
  computerPkmn = data.pokemon[randomNo].pokemon.name
  computerPkmnCaps = capitaliseName(computerPkmn)
  console.log(computerPkmn)
  getCompImgAPI(`${computerPkmn}`)
  computerReveal(type)
}


//define function to fetch computer Pokemon img from API
async function getCompImgAPI(pkmn){
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}`);
  let data = await response.json();
  console.log(data)
  const randomNo = Math.floor(Math.random() * 8192);
  if (randomNo === 0){
    computerPkmnImg = data.sprites.front_shiny;
    computerShinies++;
    computerShiniesText.textContent = `${computerShinies}`;
    } else {
    computerPkmnImg = data.sprites.front_default;  
    }
  console.log(computerPkmnImg)
  computerPkmnImgBlock.src = computerPkmnImg
}


//define computerSelection function which:
//defines types in an array
//assigns random type to computer
function computerSelection(){
    const types = ['grass', 'fire', 'water']
    const randomNo = Math.floor(Math.random() * types.length);
  return types[randomNo];
}

//create newRound function clears text that calls computer selection
function newRound() {
    chooseTypeText.textContent = 'Choose your Pokémon type!';
    playerTypeText.textContent = "...";
    computerTypeText.textContent = "...";
    outcomeText.textContent = "...";
    playerScoreText.textContent = `${playerScore}`;
    computerScoreText.textContent = `${computerScore}`;
    playerPkmnImgBlock.src = "";
    computerPkmnImgBlock.src = "";
    computerType = computerSelection();;
    gameplay = true;
}

//define outcome reveal function that defines type chart
//changes text
//starts newround after 2 seconds
  // If type1 is grass
  function outcomeReveal(type1, type2){
  if (type1 === 'grass') {
    if (type2 === 'water') {
      playerScore++;
      outcomeText.textContent = `Your ${playerPkmnCaps}'s move is super effective!`;
    } else if (type2 === 'fire') {
      computerScore++;
      outcomeText.textContent = `Your ${playerPkmnCaps}'s move is not very effective...`;
    } else {
        outcomeText.textContent = "Your Pokémon are evenly matched!";
    }
  } setTimeout(function() {
    newRound();
}, 3000);

//if type1 is fire
if (type1 === 'fire') {
    if (type2 === 'grass') {
      playerScore++;
      outcomeText.textContent = `Your ${playerPkmnCaps}'s move is super effective!`;
    } else if (type2 === 'water') {
      computerScore++;
      outcomeText.textContent = `Your ${playerPkmnCaps}'s move is not very effective...`;
    } else {
        outcomeText.textContent = "Your Pokémon are evenly matched!";
    }
  } setTimeout(function() {
    newRound();
}, 3000);

//if type1 is water
if (type1 === 'water') {
    if (type2 === 'fire') {
      playerScore++;
      outcomeText.textContent = `Your ${playerPkmnCaps}'s move is super effective!`;
    } else if (type2 === 'grass') {
      computerScore++;
      outcomeText.textContent = `Your ${playerPkmnCaps}'s move is not very effective...`;
    } else {
        outcomeText.textContent = `Your Pokémon are evenly matched!`;
    }
  } setTimeout(function() {
    newRound();
}, 3000);
  }

//define computerReveveal function which changes text and then calls outcome reveal afet 2 second delay
function computerReveal(){
    computerTypeText.textContent = `Your rival's ${computerPkmnCaps} is a ${computerType}-type Pokémon!`
    setTimeout(function() {
        outcomeReveal(`${playerType}`, `${computerType}`);
    }, 2000);

}

//define playerReveal function which calls computer pokemon api function after 2 second delay
function playerReveal(type){
    playerTypeText.textContent = `Your ${playerPkmnCaps} used a ${type}-type move!`
    setTimeout(function() {
        getCompNameAPI(`${computerType}`);
    }, 2000);
}

//add event listener to buttons which assign playertype and call player text reveal function
grassButton.addEventListener('click', function() {
    if (gameplay === true) {
      gameplay = false;
      chooseTypeText.textContent = '...';
      getNameAPI('grass');
      playerType = 'grass';
      }
})
  
fireButton.addEventListener('click', function() {
    if (gameplay === true) {
        gameplay = false;
        chooseTypeText.textContent = '...';
        getNameAPI('fire');
        playerType = 'fire';
    }
})

waterButton.addEventListener('click', function() {
    if (gameplay === true) {
        gameplay = false;
        chooseTypeText.textContent = '...';
        getNameAPI('water');
        playerType = 'water';
    }
})



///just working out text
//make name start with capital letter
//detect - in name and replace first - with (
  //add ) to end of string if there is an -
  //if multiple - replace further with ' '
  function capitaliseName(input) {
    if (input === 'nidoran-m') {
      return 'Nidoran♂'
    } else if (input === 'nidoran-f'){
      return 'Nidoran♀'
    } else if (input === 'farfetchd'){
      return "Farfetch'd"
    } else if (input === 'sirfetchd'){
      return "Sirfetch'd"
    } else if (input === 'mr-mime'){
      return 'Mr. Mime'
    } else if (input === 'mime-jr'){
      return 'Mime Jr.'
    } else if (input === 'mr-rime'){
      return 'Mr. Rime'
    } else if (input === 'type-null'){
      return 'Type: Null'
    } else if (input === 'flabebe'){
      return 'Flabébé'

    } else if (input === 'tapu-koko' || input === 'tapu-lele' || input === 'tapu-bulu' || input === 'tapu-fini' || input === 'great-tusk' || input === 'scream-tail' || input === 'brute-bonnet' || input === 'flutter-mane' || input === 'slither-wing' || input === 'sandy-shocks' || input === 'iron-treads' || input === 'iron-bundle' || input === 'iron-hands' || input === 'iron-jugulis' || input === 'iron-moth' || input === 'iron-thorns' || input === 'roaring-moon' || input === 'iron-valiant' || input === 'walking-wake' || input === 'iron-leaves'){
    
      let words = input.replace(/-/g, ' ').split(' ');
  
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      
      return words.join(' ');

    } else if (input === 'ho-oh' || input === 'porygon-z' || input === 'ting-lu' || input === 'chien-pao' || input === 'wo-chien' || input === 'chi-yu'){
      let words = input.split('-');
  
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      
      return words.join('-');

    } else if (input === 'jangmo-o' || input === 'hakamo-o' || input === 'kommo-o'){
     
      return input.charAt(0).toUpperCase();

    } else {

      let output = input.charAt(0).toUpperCase() + input.slice(1);
  
      // If the string contains a hyphen, remove it and any characters that come after it
      if (output.includes('-')) {
        output = output.split('-')[0];
      }
      
      return output;
    }

  }
