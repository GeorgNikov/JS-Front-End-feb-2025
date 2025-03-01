function pyramidKingJosef(base, increment) {
    let result = []
    let height = 0
    let stone = 0
    let marble = 0
    let lapis = 0
    let gold = 0

    for (let i = base; i > 0; i -= 2) {
        result.push(i)
    }

    height = Math.floor(result.length * increment)
    gold = Math.ceil(result.at(-1) ** 2 * increment);

    for (let i = 0; i < result.length - 1; i++) { // Excluding last index
        let area = result.at(i)
        let currentMarble = 0
        let currentStone = 0
        let currentLapis = 0

        let outerBlocks = (area - 1) * 4;
        let innerBlocks = area * area - outerBlocks;

        if ((i + 1) % 5 === 0) {
            currentLapis = outerBlocks;
        } else {
            currentMarble = outerBlocks;
        }
        
        currentStone = innerBlocks;

        stone += currentStone * increment
        marble += currentMarble * increment
        lapis += currentLapis * increment
    }

    console.log(`Stone required: ${Math.ceil(stone)}`)
    console.log(`Marble required: ${Math.ceil(marble)}`)
    console.log(`Lapis Lazuli required: ${Math.ceil(lapis)}`)
    console.log(`Gold required: ${gold}`)
    console.log(`Final pyramid height: ${height}`)
}

pyramidKingJosef(11, 1)
pyramidKingJosef(11, 0.75)
pyramidKingJosef(12, 1)
pyramidKingJosef(23, 0.5)