function wildWestAdventure(data) {
    let n = parseInt(data[0]);
    let heroesData = data.slice(1, n + 1);
    let commands = data.slice(n + 1);

    let heroes = {};
    
    for (let hero of heroesData) {
        let [name, hp, bullets] = hero.split(" "); // Разделяме по интервал
        heroes[name] = {
            name: name,
            hp: parseInt(hp),
            bullets: parseInt(bullets)
        };
    }

    for (let command of commands) {
        command = command.split(' - ');
        let currentCommand = command[0]
        let hero = heroes[command[1]]; // Вземаме героя по име
    
        if (currentCommand === 'Ride Off Into Sunset') {
            break;

        } else if (currentCommand === 'Reload') {
            if (hero.bullets < 6) {
                let reloadedBullets = 6 - hero.bullets;
                hero.bullets = 6; // Презареждаме на макс
                console.log(`${hero.name} reloaded ${reloadedBullets} bullets!`);
            } else {
                console.log(`${hero.name}'s pistol is fully loaded!`)
            }

        } else if (currentCommand === 'FireShot') {
            let target = command[2];

            if (hero.bullets > 0) {
                hero.bullets -= 1;
                console.log(`${hero.name} has successfully hit ${target} and now has ${hero.bullets} bullets!`);
            } else {
                console.log(`${hero.name} doesn't have enough bullets to shoot at ${target}!`);
            }

        } else if (currentCommand == 'TakeHit') {
            let target = hero.name
            let attacker = command[3];
            let damage = hero.hp;
            let amount = command[2];         

            if (amount >= damage) {
                hero.hp = 0;
                console.log(`${target} was gunned down by ${attacker}!`)
            } else {
                let currentHP = damage - amount
                hero.hp -= amount;
                console.log(`${target} took a hit for ${amount} HP from ${attacker} and now has ${currentHP} HP!`);
            }

        } else if (currentCommand === 'PatchUp') {
            let amount = command[2];
            let totalHP = hero.hp + parseInt(amount);

            if (hero.hp < 100) {
                hero.hp = totalHP;
                if (hero.hp > 100) {
                    hero.hp = 100;
                }
                console.log(`${hero.name} patched up and recovered ${amount} HP!`)
            } else {
                console.log(`${hero.name} is in full health!`)
            }
        }
    }

    for (let hero of Object.values(heroes)) {
        if (hero.hp > 0) {
            console.log(`${hero.name}\n HP: ${hero.hp}\n Bullets: ${hero.bullets}`);
        }
    }

}



wildWestAdventure(["2",
    "Gus 100 4",
    "Walt 100 5",
    "FireShot - Gus - Bandit",
    "TakeHit - Walt - 100 - Bandit",
    "Reload - Gus",
    "Ride Off Into Sunset"])
 
       
