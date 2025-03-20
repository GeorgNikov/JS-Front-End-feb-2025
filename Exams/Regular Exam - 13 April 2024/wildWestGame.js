function wildWestAdventure(input) {
    let n = parseInt(input.shift());
    let posse = {};

    // Initialize posse
    for (let i = 0; i < n; i++) {
        let [name, hp, bullets] = input.shift().split(" ");
        posse[name] = { hp: parseInt(hp), bullets: parseInt(bullets) };
    }

    // Process commands
    for (let command of input) {
        if (command === "Ride Off Into Sunset") break;
        let parts = command.split(" - ");
        let action = parts[0];
        let name = parts[1];

        if (action === "FireShot") {
            let target = parts[2];
            if (posse[name].bullets > 0) {
                posse[name].bullets--;
                console.log(`${name} has successfully hit ${target} and now has ${posse[name].bullets} bullets!`);
            } else {
                console.log(`${name} doesn't have enough bullets to shoot at ${target}!`);
            }
        }
        else if (action === "TakeHit") {
            let damage = parseInt(parts[2]);
            let attacker = parts[3];
            posse[name].hp -= damage;
            if (posse[name].hp > 0) {
                console.log(`${name} took a hit for ${damage} HP from ${attacker} and now has ${posse[name].hp} HP!`);
            } else {
                console.log(`${name} was gunned down by ${attacker}!`);
                delete posse[name];
            }
        }
        else if (action === "Reload") {
            let bulletsReloaded = Math.min(6 - posse[name].bullets, 6);
            if (bulletsReloaded > 0) {
                posse[name].bullets += bulletsReloaded;
                console.log(`${name} reloaded ${bulletsReloaded} bullets!`);
            } else {
                console.log(`${name}'s pistol is fully loaded!`);
            }
        }
        else if (action === "PatchUp") {
            let amount = parseInt(parts[2]);
            let healedAmount = Math.min(100 - posse[name].hp, amount);
            if (healedAmount > 0) {
                posse[name].hp += healedAmount;
                console.log(`${name} patched up and recovered ${healedAmount} HP!`);
            } else {
                console.log(`${name} is in full health!`);
            }
        }
    }

    // Print final state of surviving characters
    for (let [name, stats] of Object.entries(posse)) {
        console.log(`${name}\n HP: ${stats.hp}\n Bullets: ${stats.bullets}`);
    }
}


wildWestAdventure(["2",
    "Gus 100 4",
    "Walt 100 5",
    "FireShot - Gus - Bandit",
    "TakeHit - Walt - 100 - Bandit",
    "Reload - Gus",
    "Ride Off Into Sunset"])