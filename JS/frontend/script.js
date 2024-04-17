//Html elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let healthBarP1 = document.getElementById("healthBarP1");
let healthBarP2 = document.getElementById("healthBarP2");
const KnightsNumberP1 = document.getElementById("KnightsLeftNumberP1");
const KnightsNumberP2 = document.getElementById("KnightsLeftNumberP2");
const wizardsNumberP1 = document.getElementById("WizardsLeftNumberP1");
const wizardsNumberP2 = document.getElementById("WizardsLeftNumberP2");
const boltsNumberP1 = document.getElementById("BoltsLeftNumberP1");
const boltsNumberP2 = document.getElementById("BoltsLeftNumberP2");
const playerWonText = document.getElementsByClassName("playerWonText");

//Vars
let knightsP1 = [];
let knightsP2 = [];
let wizardsArrayP1 = [];
let wizardsArrayP2 = [];
let drawFireball = true;

//fireworks initial location
let rndX1 = Math.random() * (1800 - 100) + 100;
let rndX2 = Math.random() * (1800 - 100) + 100;;
let rndX3 = Math.random() * (1800 - 100) + 100;;
let rndY1 = Math.random() * (800 - 100) + 100;;
let rndY2 = Math.random() * (800 - 100) + 100;;
let rndY3 = Math.random() * (800 - 100) + 100;;

let spacing = 100;

//knights
let knights = 6;
KnightsNumberP1.textContent = knights;
KnightsNumberP2.textContent = knights;

//wizards
let wizards = 3;
wizardsNumberP1.textContent = wizards;
wizardsNumberP2.textContent = wizards;

let healthP1 = 0;
let healthP2 = 0;

let battlingKnightsP1 = [];
let battlingKnightsP2 = [];
let battlingWizardsP1 = [];
let battlingWizardsP2 = [];

let battleInProgress = false;
let firstCharge = false; //first movement flag

const starter = Math.round(Math.random() * 2);
let attackerIndex = starter; //random starter

let fireFireball = false;

//Background
const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: 'assets/imgs/background.png'
});

//Lightning bolts
const lightningBoltP1 = new Lightning(
    { x: 0, y: 0 },
    'assets/lightning.png', //img src
    12, //frames max
    1 //scale
);

const lightningBoltP2 = new Lightning(
    { x: 0, y: 0 },
    'assets/lightning.png', //img src
    12, //frames max
    1 //scale
);

let boltsLeftP1 = 2;
let boltsLeftP2 = 2;

let renderLightningBoltP1 = false;
let renderLightningBoltP2 = false;

boltsNumberP1.textContent = boltsLeftP1;
boltsNumberP2.textContent = boltsLeftP2;

//Troops left indicators
const troopsNumberKnightP1 = new Knight(-1, {
    position: { x: 50, y: 70 },
    velocity: { x: 0, y: 0 },
    imageSrc: 'assets/knight/knightIdle.png',
    framesMax: 5,
    scale: 0.4,
    sprites: {
        idle: {
            imageSrc: 'assets/knight/knightIdle.png',
            framesMax: 5
        },
        thrust: {
            imageSrc: 'assets/knight/thrust.png',
            framesMax: 8
        }
    }
});

const troopsNumberKnightP2 = new Knight(-2, {
    position: { x: canvas.width - 150, y: 70 },
    velocity: { x: 0, y: 0 },
    imageSrc: 'assets/knight/knightIdleMirrored.png',
    framesMax: 5,
    scale: 0.4,
    sprites: {
        idle: {
            imageSrc: 'assets/knight/knightIdleMirrored.png',
            framesMax: 5
        },
        thrust: {
            imageSrc: 'assets/knight/thrustMirrored.png',
            framesMax: 5
        }
    }
});

const troopsNumberWizardP1 = new Wizard(-1, {
    position: { x: 45, y: 165 },
    imageSrc: 'assets/wizard/wizardIdle.png',
    framesMax: 6,
    scale: 1,
    sprites: {
        idle: {
            imageSrc: 'assets/wizard/wizardIdle.png',
            framesMax: 6
        },
        stomping: {
            imageSrc: 'assets/wizard/stompingWizard.png',
            framesMax: 6
        }
    },
    fireballSrc: 'assets/wizard/Fireball.png'
});

const troopsNumberWizardP2 = new Wizard(-2, {
    position: { x: 1665, y: 165 },
    imageSrc: 'assets/wizard/wizardIdleMirrored.png',
    framesMax: 6,
    scale: 1,
    sprites: {
        idle: {
            imageSrc: 'assets/wizard/wizardIdleMirrored.png',
            framesMax: 6
        },
        stomping: {
            imageSrc: 'assets/wizard/stompingWizardMirrored.png',
            framesMax: 6
        }
    },
    fireballSrc: 'assets/wizard/FireballMirrored.png'
});


//Fireworks
const purpleFirework = new Firework(
    { x: 500, y: 500 }, //Start position
    'assets/fireworks/purpleFirework.png', //ImageSrc
    4, //FramesMax
    1);
const pinkFirework = new Firework(
    { x: 500, y: 800 }, //Start position
    'assets/fireworks/pinkFirework.png', //ImageSrc
    4, //FramesMax
    1);
const yellowFirework = new Firework(
    { x: 500, y: 300 }, //Start position
    'assets/fireworks/yellowFirework.png', //ImageSrc
    4, //FramesMax
    1);


const initializeArmies = () => {
    let posY = canvas.height - 770; //armies initial y position

    //Initialize swordsmen
    for (let i = 0; i < knights; i++) {
        const knightP1 = new Knight(i, {
            position: { x: 670, y: posY },
            velocity: { x: 4, y: 4 },
            imageSrc: 'assets/knight/knightIdle.png',
            framesMax: 5,
            scale: 0.4,
            sprites: {
                idle: {
                    imageSrc: 'assets/knight/knightIdle.png',
                    framesMax: 5
                },
                walk: {
                    imageSrc: 'assets/knight/walk.png',
                    framesMax: 6,
                },
                thrust: {
                    imageSrc: 'assets/knight/thrust.png',
                    framesMax: 8
                }
            }
        });
        knightsP1.push(knightP1);

        const knightP2 = new Knight(i, {
            position: { x: 1150, y: posY },
            velocity: { x: 4, y: 4 },
            imageSrc: 'assets/knight/knightIdleMirrored.png',
            framesMax: 5,
            scale: 0.4,
            sprites: {
                idle: {
                    imageSrc: 'assets/knight/knightIdleMirrored.png',
                    framesMax: 5
                },
                walk: {
                    imageSrc: 'assets/knight/walkMirrored.png',
                    framesMax: 6,
                },
                thrust: {
                    imageSrc: 'assets/knight/thrustMirrored.png',
                    framesMax: 8,
                }
            }
        });
        knightsP2.push(knightP2);

        posY += spacing;
    }

    //Initialize wizards
    posY = canvas.height - 650;
    for (let i = 0; i < wizards; i++) {
        const wizardP1 = new Wizard(i, {
            position: { x: 500, y: posY },
            imageSrc: 'assets/wizard/wizardIdle.png',
            framesMax: 6,
            scale: 1,
            sprites: {
                idle: {
                    imageSrc: 'assets/wizard/wizardIdle.png',
                    framesMax: 6
                }
            },
            fireballSrc: 'assets/wizard/Fireball.png'
        });
        wizardsArrayP1.push(wizardP1);

        const wizardP2 = new Wizard(i, {
            position: { x: 1220, y: posY },
            imageSrc: 'assets/wizard/wizardIdleMirrored.png',
            framesMax: 6,
            scale: 1,
            sprites: {
                idle: {
                    imageSrc: 'assets/wizard/wizardIdleMirrored.png',
                    framesMax: 6
                }
            },
            fireballSrc: 'assets/wizard/FireballMirrored.png'
        });
        wizardsArrayP2.push(wizardP2);

        posY += spacing;
    }
}

initializeArmies();

const addKnight = (playerIndex) => {
    // swordsmenAddedFlag = true;
    if (playerIndex === 1 && !battleInProgress) {
        knight = knightsP1[battlingKnightsP1.length];
        knight.update(knight.position.x, knight.position.y);
        battlingKnightsP1.push(knight);

        //healthbar
        KnightsNumberP1.textContent = knights - battlingKnightsP1.length;
        healthP1 += knight.health;
        healthBarP1.max = healthP1;
        healthBarP1.value = healthP1;
    }
    else if (playerIndex === 2 && !battleInProgress) {
        knight = knightsP2[battlingKnightsP2.length];
        knight.update(knight.position.x, knight.position.y)
        battlingKnightsP2.push(knight);

        //healthbar
        KnightsNumberP2.textContent = knights - battlingKnightsP2.length;
        healthP2 += knight.health;
        healthBarP2.max = healthP2;
        healthBarP2.value = healthP2;
    }




}

const addWizard = (playerIndex) => {
    if (playerIndex === 1 && !battleInProgress) {
        wizard = wizardsArrayP1[battlingWizardsP1.length];
        wizard.update(wizard.position.x, wizard.position.y);
        battlingWizardsP1.push(wizard);

        wizardsNumberP1.textContent = wizards - battlingWizardsP1.length;
        healthP1 += wizard.health;
        healthBarP1.max = healthP1;
        healthBarP1.value = healthP1;

    } else if (playerIndex === 2 && !battleInProgress) {
        wizard = wizardsArrayP2[battlingWizardsP2.length];
        wizard.update(wizard.position.x, wizard.position.y);
        battlingWizardsP2.push(wizard);

        wizardsNumberP2.textContent = wizards - battlingWizardsP2.length;
        healthP2 += wizard.health;
        healthBarP2.max = healthP2;
        healthBarP2.value = healthP2;
    }
}

const battleFirstCharge = () => {
    if (!firstCharge && battlingKnightsP1.length > 0 && battlingKnightsP1.some(knight => knight)) {
        spacing = 65;
        // Battling troops movement for Player 1
        for (let i = 0; i < battlingKnightsP1.length; i++) {
            knight = knightsP1[i];
            if (knight && knight.position.x !== 910 - spacing) {
                knight.update(910 - spacing, knight.position.y);
                knight.switchSprites('walk');
            }
        }
    }

    if (!firstCharge && battlingKnightsP2.length > 0 && battlingKnightsP2.some(knight => knight)) {
        spacing = 65;
        // Battling troops movement for Player 2
        for (let i = 0; i < battlingKnightsP2.length; i++) {
            knight = knightsP2[i];
            if (knight && knight.position.x !== 910 + spacing) {
                knight.update(910 + spacing, knight.position.y);
                knight.switchSprites('walk');
            }
        }
    }


    if (battlingKnightsP1.length > 0 && battlingKnightsP1.some(knight => knight && knight.position.x === 910 - spacing)
        && battlingKnightsP2.length > 0 && battlingKnightsP2.some(knight => knight && knight.position.x === 910 + spacing)

        || battlingKnightsP1.length > 0 && battlingKnightsP1.some(knight => knight && knight.position.x === 910 - spacing && battlingWizardsP2.length > 0)

        || battlingKnightsP2.length > 0 && battlingKnightsP2.some(knight => knight && knight.position.x === 910 + spacing) && battlingWizardsP1.length > 0

        || battlingWizardsP1.length > 0 && battlingWizardsP2.length > 0 && !battlingKnightsP2.some(knight => knight) && !battlingKnightsP1.some(knight => knight)) {

        console.log(`go`);
        firstCharge = true;
        battlingKnightsP1.forEach(knight => {
            if (knight) {
                knight.switchSprites('idle');
            }
        });

        battlingKnightsP2.forEach(knight => {
            if (knight) {
                knight.switchSprites('idle');
            }
        });
        attack();
    }
}

const attack = () => {
    drawFireball = true;
    wizardsArrayP1.forEach(wizard => {
        if (wizard) {
            wizard.fireball.position.x = wizard.position.x;
            wizard.fireball.position.y = wizard.position.y + 60;
            wizard.collisionDetected = false;
            wizard.hasTakenDamage = false;
        }
    });

    wizardsArrayP2.forEach(wizard => {
        if (wizard) {
            wizard.fireball.position.x = wizard.position.x;
            wizard.fireball.position.y = wizard.position.y + 60;
            wizard.collisionDetected = false;
            wizard.hasTakenDamage = false;
        }
    });

    //Turn to attack
    let attacker;
    let defender;

    if (attackerIndex % 2 === 0) {
        attacker = battlingKnightsP1;
        defender = battlingKnightsP2;
    } else {
        attacker = battlingKnightsP2;
        defender = battlingKnightsP1;
    }

    let length = Math.max(battlingKnightsP1.length, battlingKnightsP2.length);

    fireFireball = true;
    //Damage infliction and its consequences
    for (let i = 0; i < length; i++) {
        let opponent;

        defender.forEach(defender => {
            if (defender && attacker[i] && defender.position.y === attacker[i].position.y && defender.health > 0) {
                opponent = defender;
            }
        });

        if (!opponent) {
            battlingWizardsP2.forEach(wizard => {
                if (wizard && attacker[i] && wizard.position.y + 30 === attacker[i].position.y && wizard.health > 0) {
                    opponent = wizard;
                }
            });
        }

        if (!opponent) {
            battlingWizardsP1.forEach(wizard => {
                if (wizard && attacker[i] && wizard.position.y + 30 === attacker[i].position.y && wizard.health > 0) {
                    opponent = wizard;
                }
            });
        }

        if (attacker[i] && opponent) {
            attacker[i].switchSprites('thrust');

            // Apply damage
            if (opponent && !opponent.hasTakenDamageThisRound && !isDead(opponent)) {
                let damage = Math.floor(Math.random() * (40 - 10 + 1)) + 10; //random damage for now
                if (damage > opponent.health) {
                    damage = opponent.health;
                }
                opponent.health -= damage;
                opponent.hasTakenDamageThisRound = true;

                //log debug and healthbar handling
                if (attackerIndex % 2 == 0) {
                    //console.log(`P2: ${opponent.index} health: ${opponent.health}`);
                    healthBarP2.value -= damage;
                } else {
                    //console.log(`P1: ${opponent.index} health: ${opponent.health}`);
                    healthBarP1.value -= damage;
                }

                if (isDead(opponent)) {
                    attacker[i].wasMoved = false;
                    attacker[i].occupied = false;
                    console.log(`Knight: ${opponent.index} has died`);
                    if (attackerIndex % 2 === 0) {
                        knightsP2[knightsP2.indexOf(opponent)] = null;
                        wizardsArrayP2[wizardsArrayP2.indexOf(opponent)] = null;
                    } else {
                        knightsP1[knightsP1.indexOf(opponent)] = null;
                        wizardsArrayP1[wizardsArrayP1.indexOf(opponent)] = null;

                    }

                    battlingKnightsP1[battlingKnightsP1.indexOf(opponent)] = null;
                    battlingKnightsP2[battlingKnightsP2.indexOf(opponent)] = null;
                    battlingWizardsP1[battlingWizardsP1.indexOf(opponent)] = null;
                    battlingWizardsP2[battlingWizardsP2.indexOf(opponent)] = null;

                    attacker[attacker.indexOf(opponent)] = null;
                    defender[defender.indexOf(opponent)] = null;
                }
            }
        }
    }

    setTimeout(() => { //Delay before calling attack() again 
        if ((battlingKnightsP1.some(knight => knight && knight.health > 0) && battlingKnightsP2.some(knight => knight && knight.health > 0)) ||
            (battlingWizardsP1.some(wizard => wizard && wizard.health > 0) && battlingWizardsP2.some(wizard => wizard && wizard.health > 0)) ||
            (battlingWizardsP1.some(wizard => wizard && wizard.health > 0) && battlingKnightsP2.some(knight => knight && knight.health > 0)) ||
            (battlingKnightsP1.some(knight => knight && knight.health > 0) && battlingWizardsP2.some(wizard => wizard && wizard.health > 0))) {

            defender.forEach(knight => knight && (knight.hasTakenDamageThisRound = false));
            battlingWizardsP1.forEach(wizard => wizard && (wizard.hasTakenDamageThisRound = false));
            battlingWizardsP2.forEach(wizard => wizard && (wizard.hasTakenDamageThisRound = false));

            attackerIndex++;
            console.log(`attack was called`);
            fireFireball = false;

            attack();
        }
    }, 1200);

}

const numOfAliveTroops = (troops) => {
    let count = 0;
    troops.forEach(troop => {
        if (troop && troop.health > 0) {
            count++;
        }
    });
    return count;
}

const isLinedUpOpponentWizard = (wizard, knights, pixels) => knights.some(knight => knight && wizard && knight.position.y === wizard.position.y + pixels);

const isLinedUpOpponent = (troop, knights) => knights.some(knight => knight && troop.position.y === knight.position.y);

let idleKnightsP1 = [];
let idleKnightsP2 = [];

const reArrangeKnights = (battlingKnightsP1, battlingKnightsP2) => {
    const notNullIndexes = (knights, wizards) => {
        let notNullOfTheArray = [];
        for (let i = 0; i < knights.length; i++) {
            if (knights[i] && !isLinedUpOpponentWizard(knights[i], wizards, -30)) {
                notNullOfTheArray.push(knights[i].index)
            }
        }
        return notNullOfTheArray;
    }

    //All idle knights of P1
    for (let i = 0; i < battlingKnightsP1.length; i++) {
        if (battlingKnightsP1[i] && numOfAliveTroops(battlingKnightsP2) !== 0 && !isDead(battlingKnightsP1[i])
            && !isLinedUpOpponent(battlingKnightsP1[i], battlingKnightsP2)
            && !idleKnightsP1.includes(battlingKnightsP1[i])) {
            idleKnightsP1.push(battlingKnightsP1[i]);
        }
    }

    //All idle knights of P2
    for (let i = 0; i < battlingKnightsP2.length; i++) {
        if (battlingKnightsP2[i] && !isDead(battlingKnightsP2[i])
            && !isLinedUpOpponent(battlingKnightsP2[i], battlingKnightsP1)
            && !idleKnightsP2.includes(battlingKnightsP2[i])) {
            idleKnightsP2.push(battlingKnightsP2[i]);
        }
    }

    console.log(firstCharge);
    // Check if there are idle knights from both armies
    if (battleInProgress && idleKnightsP1.length > 0 && idleKnightsP2.length > 0) {
        console.log(`Knights need to be moved`);
        const numKnightsToMove = Math.min(idleKnightsP1.length, idleKnightsP2.length);

        for (let i = 0; i < numKnightsToMove; i++) {
            if (idleKnightsP1[i] && idleKnightsP2[i]) {
                idleKnightsP1[i].switchSprites('walk');

                idleKnightsP1[i].update(idleKnightsP1[i].position.x, idleKnightsP2[i].position.y);
                console.log(`Knight ${idleKnightsP1[i].index} was moved to align with knight ${idleKnightsP2[i].index}`);
                if (idleKnightsP1[i].position.y === idleKnightsP2[i].position.y) {
                    idleKnightsP1[i].switchSprites('idle');
                    idleKnightsP1.splice(i, 1);
                    idleKnightsP2.splice(i, 1);
                }
            }

        }
    }

    else if (numOfAliveTroops(battlingKnightsP2) === 0 && firstCharge) {
        let knights = notNullIndexes(battlingKnightsP1, battlingWizardsP2);
        for (let i = 0; i < battlingWizardsP2.length; i++) {
            let knight = battlingKnightsP1[knights[i]];
            if (knight && battlingWizardsP2[i] && !isLinedUpOpponentWizard(battlingWizardsP2[i], battlingKnightsP1, 30)) {
                knight.switchSprites('walk');
                knight.update(battlingWizardsP2[i].position.x, battlingWizardsP2[i].position.y + 30);
                if (knight.position.y === battlingWizardsP2[i].position.y + 30) {
                    knight.switchSprites('idle');
                }
            }
        }
    }

    else if (numOfAliveTroops(battlingKnightsP1) === 0 && firstCharge) {
        let knights = notNullIndexes(battlingKnightsP2, battlingWizardsP1);
        for (let i = 0; i < battlingWizardsP1.length; i++) {
            let knight = battlingKnightsP2[knights[i]];
            if (knight && battlingWizardsP1[i] && !isLinedUpOpponentWizard(battlingWizardsP1[i], battlingKnightsP2, 30)) {
                knight.switchSprites('walk');
                knight.update(battlingWizardsP1[i].position.x + 80, battlingWizardsP1[i].position.y + 30);
                if (knight.position.y === battlingWizardsP1[i].position.y + 30) {
                    knight.switchSprites('idle');
                }
            }
        }
    }
}

const render = () => {
    background.update();
    troopsNumberKnightP1.update(troopsNumberKnightP1.position.x, troopsNumberKnightP1.position.y);
    troopsNumberKnightP2.update(troopsNumberKnightP2.position.x, troopsNumberKnightP2.position.y);

    troopsNumberWizardP1.update();
    troopsNumberWizardP2.update();

    //Fireworks
    if (didBattleEnd()) {
        if (purpleFirework.framesElapsed === 36) {
            rndX1 = Math.random() * (1800 - 100) + 100;
            rndX2 = Math.random() * (1800 - 100) + 100;
            rndX3 = Math.random() * (1800 - 100) + 100;
            rndY1 = Math.random() * (800 - 100) + 100;
            rndY2 = Math.random() * (800 - 100) + 100;
            rndY3 = Math.random() * (800 - 100) + 100;
            purpleFirework.framesElapsed = 0;
        }
        purpleFirework.update(rndX1, rndY1);
        pinkFirework.update(rndX2, rndY2);
        yellowFirework.update(rndX3, rndY3);
    }

    //Knights
    for (let i = 0; i < battlingKnightsP1.length; i++) {
        knight = battlingKnightsP1[i];
        if (knight) {
            knight.update(knight.position.x, knight.position.y); //also draws the knight
            if ((knight.position.x === 845 || knight.position.x === 1220) && knight.framesElapsed === 30) {
                knight.switchSprites('idle');
                knight.framesElapsed = 0;
            }
        }
    }

    for (let i = 0; i < battlingKnightsP2.length; i++) {
        knight = battlingKnightsP2[i];

        if (knight) {
            knight.update(knight.position.x, knight.position.y);  //also draws the knight
            if ((knight.position.x === 975 || knight.position.x === 580) && knight.framesElapsed === 30) {
                knight.switchSprites('idle');
                knight.framesElapsed = 0;
            }
        }
    }

    //Wizards
    for (let i = 0; i < battlingWizardsP1.length; i++) {
        if (wizardsArrayP1[i]) {
            wizardsArrayP1[i].update();
        }
    }

    for (let i = 0; i < battlingWizardsP2.length; i++) {
        if (wizardsArrayP2[i]) {
            wizardsArrayP2[i].update();
        }
    }

    //Lightning bolts
    if (renderLightningBoltP1) {
        lightningBoltP1.update();
        if (lightningBoltP1.framesElapsed === 48) {
            renderLightningBoltP1 = false;
            lightningBoltP1.framesElapsed = 0;
        }
    }

    if (renderLightningBoltP2) {
        lightningBoltP2.update();
        if (lightningBoltP2.framesElapsed === 48) {
            renderLightningBoltP2 = false;
            lightningBoltP2.framesElapsed = 0;
        }

    }
}

const isDead = (knight) => (knight && knight.health > 0) ? false : true;

const toggleBattle = () => { battleInProgress = true; };

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render(); //Renders the screen every frame

    reArrangeKnights(battlingKnightsP1, battlingKnightsP2);

    animateWizardAttacks();

    if (battleInProgress && !firstCharge) {
        battleFirstCharge();
    }

    didBattleEnd();

    window.requestAnimationFrame(animate);
}

const didBattleEnd = () => {
    if (battleInProgress) {
        if ((battlingKnightsP1.length === 0 || !battlingKnightsP1.some(knight => knight && knight.health > 0)) &&
            (battlingWizardsP1.length === 0 || !battlingWizardsP1.some(wizard => wizard && wizard.health > 0)) &&
            ((battlingKnightsP2.length !== 0 && battlingKnightsP2.some(knight => knight && knight.health > 0)) ||
                (battlingWizardsP2.length !== 0 && battlingWizardsP2.some(wizard => wizard && wizard.health > 0)))) {
            if (KnightsNumberP1.textContent === '0' && wizardsNumberP1.textContent === '0') {
                for (let i = 0; i < playerWonText.length; i++) {
                    playerWonText[i].textContent = 'Player II Won';
                }
                troopsNumberWizardP1.switchSprites('stomping');
                return true;
            }
            else { //only the round ended
                firstCharge = false;
                battleInProgress = false;
                boltsLeftP1 = 2;
                boltsLeftP2 = 2;
                boltsNumberP1.textContent = boltsLeftP1;
                boltsNumberP2.textContent = boltsLeftP2;
            }
        } else if ((battlingKnightsP2.length === 0 || !battlingKnightsP2.some(knight => knight && knight.health > 0)) &&
            (battlingWizardsP2.length === 0 || !battlingWizardsP2.some(wizard => wizard && wizard.health > 0)) &&
            ((battlingKnightsP1.length !== 0 && battlingKnightsP1.some(knight => knight && knight.health > 0)) ||
                (battlingWizardsP1.length !== 0 && battlingWizardsP1.some(wizard => wizard && wizard.health > 0)))) {

            if (KnightsNumberP2.textContent === '0' && wizardsNumberP2.textContent === '0') {
                for (let i = 0; i < playerWonText.length; i++) {
                    playerWonText[i].textContent = 'Player I Won';
                }
                troopsNumberWizardP2.position.x = 1770;
                troopsNumberWizardP2.switchSprites('stomping');
                return true;
            } else { //only the round ended
                firstCharge = false;
                battleInProgress = false;
                boltsLeftP1 = 2;
                boltsLeftP2 = 2;
                boltsNumberP1.textContent = boltsLeftP1;
                boltsNumberP2.textContent = boltsLeftP2;
            }
        }
    }
    return false;
}

const animateWizardAttacks = () => {
    const attackEnemies = (wizardsArray, opponentKnights, opponentWizards) => {
        const aliveEnemyKnights = opponentKnights.filter(knight => knight && knight.health > 0);
        const aliveEnemyWizards = opponentWizards.filter(wizard => wizard && wizard.health > 0);

        if (aliveEnemyKnights.length > 0 && battleInProgress) {
            wizardsArray.forEach((wizard, index) => {
                const targetKnight = aliveEnemyKnights[index % aliveEnemyKnights.length]; // Cycle through alive enemies
                if (wizard && wizard.health > 0 && targetKnight && fireFireball && targetKnight.health > 0) {
                    wizard.fire(targetKnight.position.x, targetKnight.position.y, drawFireball);
                    if (detectCollision(wizard.fireball, targetKnight) && !wizard.collisionDetected) {
                        wizard.collisionDetected = true;
                        let damage = Math.floor(Math.random() * 26) + 10; //Random damage

                        if (damage > targetKnight.health) {
                            damage = targetKnight.health;
                        }

                        targetKnight.health -= damage; // Damage infliction
                        targetKnight.hasTakenDamage = true;

                        if (attackerIndex % 2 == 0) {
                            healthBarP2.value -= damage;
                        } else {
                            healthBarP1.value -= damage;
                        }

                        if (isDead(targetKnight)) {
                            drawFireball = false;
                            if (attackerIndex % 2 === 0) {
                                knightsP2 = knightsP2.map(knight => (knight === targetKnight) ? null : knight);
                            }
                            else {
                                knightsP1 = knightsP1.map(knight => (knight === targetKnight) ? null : knight);
                            }
                            battlingKnightsP1[battlingKnightsP1.indexOf(targetKnight)] = null;
                            battlingKnightsP2[battlingKnightsP2.indexOf(targetKnight)] = null;
                            opponentKnights[opponentKnights.indexOf(targetKnight)] = null;
                        }
                    }
                }
            });
        }
        else if (aliveEnemyWizards.length > 0 && battleInProgress) {
            wizardsArray.forEach((wizard, index) => {
                const targetWizard = aliveEnemyWizards[index % aliveEnemyWizards.length]; // Cycle through alive enemies
                if (wizard && wizard.health > 0 && targetWizard && fireFireball) {
                    if (attackerIndex % 2 == 0) {
                        wizard.fire(1270, targetWizard.position.y + 60, drawFireball);
                    } else {
                        wizard.fire(targetWizard.position.x, targetWizard.position.y + 60, drawFireball);
                    }

                    if (detectCollision(wizard.fireball, targetWizard) && !wizard.collisionDetected) {
                        wizard.collisionDetected = true;
                        let damage = Math.floor(Math.random() * 26) + 10; //Random damage

                        if (damage > targetWizard.health) {
                            damage = targetWizard.health;
                        }
                        targetWizard.health -= damage; // Damage infliction
                        targetWizard.hasTakenDamage = true;

                        if (attackerIndex % 2 == 0) {
                            healthBarP2.value -= damage;
                        } else {
                            healthBarP1.value -= damage;
                        }

                        if (isDead(targetWizard)) {
                            drawFireball = false;
                            console.log(`Wizard: ${targetWizard.index} has died`);
                            if (attackerIndex % 2 === 0) {
                                wizardsArrayP2[wizardsArrayP2.indexOf(targetWizard)] = null;
                            } else {
                                wizardsArrayP1[wizardsArrayP1.indexOf(targetWizard)] = null;
                            }
                            battlingWizardsP1[battlingWizardsP1.indexOf(targetWizard)] = null;
                            battlingWizardsP2[battlingWizardsP2.indexOf(targetWizard)] = null;
                            aliveEnemyWizards[aliveEnemyWizards.indexOf(targetWizard)] = null;
                        }
                    }
                }
            });
        }
    };

    if (attackerIndex % 2 == 0) {
        attackEnemies(battlingWizardsP1, battlingKnightsP2, battlingWizardsP2);
    } else {
        attackEnemies(battlingWizardsP2, battlingKnightsP1, battlingWizardsP1);
    }
}

const detectCollision = (fireball, opponent) => {
    let distX = Math.abs(fireball.position.x - opponent.position.x - 40 / 2);
    let distY = Math.abs(fireball.position.y - opponent.position.y - 60 / 2);

    if (distX > (40 / 2 + 10)) { return false; }
    if (distY > (60 / 2 + 10)) { return false; }

    if (distX <= (40 / 2) || distY <= (60 / 2)) { return true; }

    let dx = distX - 40 / 2;
    let dy = distY - 60 / 2;
    return (dx * dx + dy * dy <= (10 * 10));
}

const lightning = (turn) => {
    const findRndAliveTroopsIndex = (knights, wizards) => {
        const aliveKnightsIndexes = [];
        knights.forEach((knight, index) => {
            if (knight && knight.health > 0) {
                aliveKnightsIndexes.push({ type: 'knight', index });
            }
        });

        const aliveWizardsIndexes = [];
        wizards.forEach((wizard, index) => {
            if (wizard && wizard.health > 0) {
                aliveWizardsIndexes.push({ type: 'wizard', index });
            }
        });

        const allAliveIndexes = aliveKnightsIndexes.concat(aliveWizardsIndexes);

        if (allAliveIndexes.length > 0) {
            const rndIndex = Math.floor(Math.random() * allAliveIndexes.length);
            const { index, type } = allAliveIndexes[rndIndex];
            return { index, type };
        } else {
            return -1;
        }
    };

    let damage = Math.floor(Math.random() * (50 - 30 + 1)) + 30;

    if (battleInProgress && turn === 1 && boltsLeftP1 > 0) {
        let { index, type } = findRndAliveTroopsIndex(battlingKnightsP2, battlingWizardsP2);
        if (index >= 0) {
            if (type === 'knight') {
                if (battlingKnightsP2[index]) {
                    lightningBoltP1.position.x = battlingKnightsP2[index].position.x - 10;
                    lightningBoltP1.position.y = battlingKnightsP2[index].position.y - 360;
                }

                damage = Math.min(damage, battlingKnightsP2[index] ? battlingKnightsP2[index].health : 0);
                if (battlingKnightsP2[index]) {
                    battlingKnightsP2[index].health -= damage;
                }

                if (isDead(battlingKnightsP2[index])) {
                    knightsP2[index] = null;
                    battlingKnightsP2[index] = null;
                }

                healthBarP2.value -= damage;

            }
            else if (type === 'wizard') {
                if (battlingWizardsP2[index]) {
                    lightningBoltP1.position.x = battlingWizardsP2[index].position.x + 80;
                    lightningBoltP1.position.y = battlingWizardsP2[index].position.y - 325;
                }

                damage = Math.min(damage, battlingWizardsP2[index] ? battlingWizardsP2[index].health : 0);

                if (battlingWizardsP2[index]) {
                    battlingWizardsP2[index].health -= damage;
                }

                if (isDead(battlingWizardsP2[index])) {
                    wizardsArrayP2[index] = null;
                    battlingWizardsP2[index] = null;
                }

                healthBarP2.value -= damage;
            }
            boltsLeftP1--;
            boltsNumberP1.textContent = boltsLeftP1;
            renderLightningBoltP1 = true;
        }
    }
    else if (battleInProgress && turn === 2 && boltsLeftP2 > 0) {
        let { index, type } = findRndAliveTroopsIndex(battlingKnightsP1, battlingWizardsP1);
        if (index >= 0) {
            if (type === 'knight') {
                if (battlingKnightsP1[index]) {
                    lightningBoltP2.position.x = battlingKnightsP1[index].position.x - 40;
                    lightningBoltP2.position.y = battlingKnightsP1[index].position.y - 360;
                }

                damage = Math.min(damage, battlingKnightsP1[index] ? battlingKnightsP1[index].health : 0);

                if (battlingKnightsP1[index]) {
                    battlingKnightsP1[index].health -= damage;
                }

                if (isDead(battlingKnightsP1[index])) {
                    knightsP1[index] = null;
                    battlingKnightsP1[index] = null;
                }

                healthBarP1.value -= damage;

            }
            else if (type === 'wizard') {
                if (battlingWizardsP1[index]) {
                    lightningBoltP2.position.x = battlingWizardsP1[index].position.x - 30
                    lightningBoltP2.position.y = battlingWizardsP1[index].position.y - 325;
                }

                damage = Math.min(damage, battlingWizardsP1[index] ? battlingWizardsP1[index].health : 0);
                if (battlingWizardsP1[index]) {
                    battlingWizardsP1[index].health -= damage;
                }

                if (isDead(battlingWizardsP1[index])) {
                    wizardsArrayP1[index] = null;
                    battlingWizardsP1[index] = null;
                }

                healthBarP1.value -= damage;
            }
            boltsLeftP2--;
            boltsNumberP2.textContent = boltsLeftP2;
            renderLightningBoltP2 = true;
        }
    }
}

animate();