function inventory(data) {
    let result = [];

    for (let i = 0; i < data.length; i++) {
        let [hero, level, items] = data[i].split(" / ");

        result.push({
            hero: hero,
            level: parseInt(level),
            items: items
        });
    }

    result.sort((a, b) => a.level - b.level)

    result.forEach(({ hero, level, items }) => {
        console.log(`Hero: ${hero}`);
        console.log(`level => ${level}`);
        console.log(`items => ${items}`);
    });

}

inventory([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]);

inventory([
    'Batman / 2 / Banana, Gun',
    'Superman / 18 / Sword',
    'Poppy / 28 / Sentinel, Antara'
]);