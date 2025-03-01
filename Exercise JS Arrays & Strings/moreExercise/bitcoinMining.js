function bitcoinMining(arr) {
    const bitcoinPrice = 11949.16;
    const goldPrice = 67.51;
    let firstDayPurchased = 0;

    let days = 0;
    let totalMoney = 0;
    let myBitcoins = 0;

    for (gold of arr) {
        days++;

        if (days % 3 === 0) {
            gold *= 0.7
        }

        totalMoney += gold * goldPrice;

        if (totalMoney >= bitcoinPrice) {
            if (firstDayPurchased === 0) {
                firstDayPurchased = days;
            }

            let remaindMoney = Math.floor(totalMoney / bitcoinPrice);
            myBitcoins += remaindMoney
            totalMoney = (totalMoney % bitcoinPrice)
        }

    }

    console.log(`Bought bitcoins: ${myBitcoins}`)
    if (firstDayPurchased > 0) {
        console.log(`Day of the first purchased bitcoin: ${firstDayPurchased}`)
    }
    console.log(`Left money: ${totalMoney.toFixed(2)} lv.`)
}



bitcoinMining([100, 200, 300]);
bitcoinMining([50, 100])
bitcoinMining([3124.15, 504.212, 2511.124])