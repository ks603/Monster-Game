const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER'

const enteredValue = prompt('Maximum life for you and the monster', '100');

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry;
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: ev, 
      value: val,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: ev, 
      value: val,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };  
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: ev, 
      value: val,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev, 
      value: val,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev, 
      value: val,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  }
  battleLog.push(logEntry);
}

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife)
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK, 
    playerDamage, 
    currentMonsterHealth, 
    currentPlayerHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth
    alert('Bonus life saved you!')
    setPlayerHealth(initialPlayerHealth)
  }

 if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
   alert('player won!')
   writeToLog(
    LOG_EVENT_GAME_OVER, 
    'Player Won', 
    currentMonsterHealth, 
    currentPlayerHealth
    );
   reset();
 } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
   alert('you Lost!')
   writeToLog(
    LOG_EVENT_GAME_OVER, 
    'Player Lost', 
    currentMonsterHealth, 
    currentPlayerHealth
    );
   reset();
 } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
   alert('Tie')
   writeToLog(
    LOG_EVENT_GAME_OVER, 
    'Tie', 
    currentMonsterHealth, 
    currentPlayerHealth
    );
   reset();
 }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
 if (mode === MODE_ATTACK) {
   maxDamage = ATTACK_VALUE;
   logEvent = LOG_EVENT_PLAYER_ATTACK
 } else if (mode === MODE_STRONG_ATTACK) {
   maxDamage = STRONG_ATTACK_VALUE;
   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
 }
 const damage = dealMonsterDamage(maxDamage);
 currentMonsterHealth -= damage;
 writeToLog(
  logEvent,
  damage, 
  currentMonsterHealth, 
  currentPlayerHealth
  );
 endRound();
}


function attackHandler() {
  attackMonster(MODE_ATTACK)
}

function strongAttackHandler() {
 attackMonster(MODE_STRONG_ATTACK)
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert('you cant heal more than your max initial health.')
    healValue = chosenMaxLife - currentPlayerHealth
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL, 
    healValue, 
    currentMonsterHealth, 
    currentPlayerHealth
    );
  endRound();
}
function printLogHandler() {
  console.log(battleLog)
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener('click', printLogHandler)