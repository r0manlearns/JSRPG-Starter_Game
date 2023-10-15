let xp = 0; // you can also use: 'var' (declares variable but worse than let) & 'const' (Once declared a const, the variable can not be updated like with let or var)
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"]; // The brackets are for arrays and are unnecessary for single items

/* Example reference to an HTML element:
let el = document.querySelector("#el"); */

const button1 = document.querySelector("#button1"); // declared const because button1 will always be button1
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const weapons = [
    {
        name: "Stick",
        power: 5,
    },
    {
        name: "Dagger",
        power: 30,
    },
    {
        name: "Claw Hammer",
        power: 50
    },
    {
        name: "Sword",
        power: 100,
    }
]

const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15,
    },
    {
        name: "Fanged Beast",
        level: 8,
        health: 60,
    },
    {
        name: "Dragon",
        level: 20,
        health: 300,
    }
]

const locations = [
    {
        name: "Town Square",
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You enter the town square. You see a sign that says \"store\"."
    },
    {
        name: "Store",
        "button text": ["Buy 10 Health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store"
    },
    {
        name: "Cave",
        "button text": ["Fight the Slime", "Fight the Fanged Beast", "Go to town square"],
        "button functions": [fightSlime, fightFangedBeast, goTown],
        text: "You enter the cave, and see some monsters"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster"
    },
    {
        name: "Kill Monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: "The monster screams 'Doh!' as it dies. Tou gain xp and find gold"
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You died!"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon and win the game!"
    },
    {
        name: "Easter Egg",
        "button text": ["2", "8", "Go to town square"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game, Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];
// initialize buttons

/* Example of Initialization of a button:
button.onclick = openProgram; */

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerHTML = location["button text"][0];
    button2.innerHTML = location["button text"][1];
    button3.innerHTML = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location["text"]; // or location.text; since it is a single word;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1])
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 5) {
        gold -= 5; // or gold = gold - 5;
        health += 10; // or health = health + 10;
        goldText.innerHTML = gold;
        healthText.innerHTML = health;
    } else {
        text.innerHTML = "You do not have enough gold to buy health";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 20) {
            gold -= 20;
            currentWeapon++; // or currentWeapon += 1;
            goldText.innerHTML = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerHTML = "You have bought a " + newWeapon + "!";
            inventory.push(newWeapon);
            text.innerHTML += " In your inventory you have: " + inventory;
        } else {
            text.innerHTML = "You do not have enough gold to buy weapon";
        }
    } else {
        text.innerHTML = "You already have the most powerful weapon"
        button2.innerHTML = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerHTML = gold;
        let currentWeapon = inventory.shift(); //shift is for removing an item from an array
        text.innerHTML = "You sold a " + currentWeapon + " for 15 gold";
        text.innerHTML += " In your inventory you have: " + inventory;
    } else {
        text.innerHTML = "Don't sell your only weapon!";
}
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightFangedBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerHTML = monsters[fighting].name;
    monsterHealthText.innerHTML = monsterHealth;
}

function attack() {
    text.innerHTML = "The " +monsters[fighting].name + " attacks!";
    text.innerHTML += "You attack it with your " + weapons[currentWeapon].name + "!";

    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level) // health -= monsters[fighting].level;
    } else {
        text.innerHTML = "You miss!";
    }

    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerHTML = health;
    monsterHealthText.innerHTML = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerHTML = "Your " + inventory.pop() + " breaks!";
        currentWeapon--;
    }
}

// Example of ways to write if-else expressions:
//if (age >= 18) {
//    adultFunction();
//} else {
//    kidFunction();
//}

//The above if statement does the same thing as the above if-else expression does the same thing as the following line:

// age >= 18 ? adultFunction() : kidFunction();
// age >= 18 if true (?) adultFunction(); else kidFunction();

function dodge() {
    text.innerHTML = "You dodge the attack from the " + monsters[fighting].name + "!";
}

function getMonsterAttackValue() {
    let hit = (level * 5) - Math.floor(Math.random() * xp) + 1;
    console.log(hit);
    return hit;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20; // Monster gets hit 80% of the time unless health is less than 20 ( (||) or operator), as math.random() returns a random number between 0 and 1
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level) * 6.7;
    xp += monsters[fighting].level;
    goldText.innerHTML = gold;
    xpText.innerHTML = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0
    health = 100;
    gold =50
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerHTML = gold;
    healthText.innerHTML = health;
    xpText.innerHTML = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerHTML = "You picked " + guess + ". Here are the random numbers: \n";

    for (let i = 0; i < 10; i++) {
        text.innerHTML += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerHTML += "Right! you win 20 gold!";
        gold += 20;
        goldText.innerHTML = gold;
    } else {
        text.innerHTML += "Wrong! you lose 10 health!";
        health -= 10;
        healthText.innerHTML = health;
        if (health <= 0) {
            lose();
        }
    }
}