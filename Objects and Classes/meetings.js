function manageMeetings(arrayOfStrings) {
    let meetings = {};

    arrayOfStrings.forEach(entry => {
        let [day, person] = entry.split(' ');

        if (meetings.hasOwnProperty(day)) {
            console.log(`Conflict on ${day}!`);
        } else {
            meetings[day] = person;
            console.log(`Scheduled for ${day}`);
        }
    });

    for (let day in meetings) {
        console.log(`${day} -> ${meetings[day]}`);
    }
}
