let gold = 0;
let dailyGoldMined = 0;
const dailyGoldLimit = 20000;
let pickaxeLevel = 1;
let goldPerClick = 1;
let totalPoints = 0;
const withdrawalThreshold = 10000;

const goldDisplay = document.getElementById('gold');
const dailyGoldMinedDisplay = document.getElementById('daily-gold-mined');
const rock = document.getElementById('rock');
const upgradeButton = document.getElementById('upgrade-pickaxe');
const pickaxeLevelDisplay = document.getElementById('pickaxe-level');
const pointsDisplay = document.getElementById('points');
const withdrawButton = document.getElementById('withdraw');
function mineGold() {
    if (dailyGoldMined < dailyGoldLimit) {
      gold += goldPerClick;
      dailyGoldMined += goldPerClick;
      goldDisplay.textContent = gold;
      dailyGoldMinedDisplay.textContent = dailyGoldMined;
  
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.classList.add(`sparkle-level-${pickaxeLevel}`);
      document.getElementById('game-container').appendChild(sparkle);
  
      // Remove the sparkle element after a short delay (e.g., 300 milliseconds)
      setTimeout(() => {
        sparkle.remove();
      }, 300); 
  
    } else {
      alert("Daily mining limit reached!");
    }
  }

function upgradePickaxe() {
    const upgradeCost = calculateUpgradeCost(pickaxeLevel);
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        pickaxeLevel++;
        goldPerClick = calculateGoldPerClick(pickaxeLevel);
        goldDisplay.textContent = gold;
        pickaxeLevelDisplay.textContent = pickaxeLevel;
        upgradeButton.textContent = `Upgrade Pickaxe (Level ${pickaxeLevel})`;

        if (pickaxeLevel === 3) {
            upgradeButton.disabled = true;
            upgradeButton.textContent = "Max Level";
        }
    } else {
        alert(`Not enough gold!
               \nUpgrade Cost: ${upgradeCost} gold
               \nYour Gold: ${gold} gold`);
    }
}

function calculateUpgradeCost(level) {
    switch (level) {
        case 1: return 300;
        case 2: return 1500;
        default: return 10;
    }
}

function calculateGoldPerClick(level) {
    switch (level) {
        case 1: return 1;
        case 2: return 3;
        case 3: return 7;
        default: return 1;
    }
}

function convertGoldToPoints() {
    totalPoints += gold;
    gold = 0;
    dailyGoldMined = 0;
    goldDisplay.textContent = gold;
    dailyGoldMinedDisplay.textContent = dailyGoldMined;
    pointsDisplay.textContent = totalPoints;
}

function withdrawPoints() {
    if (totalPoints >= withdrawalThreshold) {
        alert(`Withdrawal successful! You have withdrawn ${totalPoints} points.`);
        totalPoints = 0;
        pointsDisplay.textContent = totalPoints;
    } else {
        alert(`You need at least ${withdrawalThreshold} points to withdraw. 
               You currently have ${totalPoints} points.`);
    }
}

rock.addEventListener('click', mineGold);
upgradeButton.addEventListener('click', upgradePickaxe);
withdrawButton.addEventListener('click', withdrawPoints);

setInterval(convertGoldToPoints, 7 * 24 * 60 * 60 * 1000);