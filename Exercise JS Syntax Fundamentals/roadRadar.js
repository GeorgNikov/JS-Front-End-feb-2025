function roadRadar(speed, area) {

    const speedLimits = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20
    };

    const limit = speedLimits[area];
    const overSpeed = speed - limit;

    if (overSpeed <= 0) {
        return `Driving ${speed} km/h in a ${limit} zone`;
    }

    const status = overSpeed <= 20 ? "speeding"
        : overSpeed <= 40 ? "excessive speeding"
            : "reckless driving";

    return `The speed is ${overSpeed} km/h faster than the allowed speed of ${limit} - ${status}`;

}

console.log(roadRadar(40, 'city'))
console.log(roadRadar(21, 'residential'))
console.log(roadRadar(120, 'interstate'))