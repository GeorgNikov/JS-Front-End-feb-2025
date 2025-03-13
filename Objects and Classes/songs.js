function filterSongs(input) {

    class Song {
        constructor(typeList, name, time) {
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        }
    }

        let n = Number(input[0]);
        let songs = [];

        for (let i = 1; i <= n; i++) {
            let [typeList, name, time] = input[i].split('_');
            let song = new Song(typeList, name, time)
            songs.push(song);
        }

        let filterType = input[n + 1]; 

        songs
            .filter(song => filterType === 'all' || song.typeList === filterType)
            .forEach(song => console.log(song.name));
}

// Example usage
filterSongs([3,
    'favourite_DownTown_3:14',
    'favourite_Kiss_4:16',
    'favourite_Smooth Criminal_4:01',
    'favourite']);


