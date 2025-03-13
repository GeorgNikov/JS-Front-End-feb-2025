function parseTowns(data) {
    let result = [];
    
    for (let i = 0; i < data.length; i++) {
        let [town, latitude, longitude] = data[i].split(" | ");
        
        result.push({
            town: town,
            latitude: parseFloat(latitude).toFixed(2),
            longitude: parseFloat(longitude).toFixed(2)
        });
    }

    result.forEach(obj => console.log(obj));
}
