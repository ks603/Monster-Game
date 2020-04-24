const ATTACK_VALUE = 10;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  currentPlayerHealth -= damage;
  if (currentPlayerHealth <= 0) {
    console.log('Monster won!')
  }
  if (currentMonsterHealth <= 0) {
    console.log('player won!')
  }
}

attackBtn.addEventListener('click', attackHandler);
