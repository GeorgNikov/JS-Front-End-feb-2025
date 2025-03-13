function storeMovies(commands) {
    let movies = [];

    for (let command of commands) {
        if (command.startsWith("addMovie ")) {
            let movieName = command.replace("addMovie ", "");
            movies.push({ name: movieName });
        } else if (command.includes(" directedBy ")) {
            let [movieName, director] = command.split(" directedBy ");
            let movie = movies.find(m => m.name === movieName);
            if (movie) {
                movie.director = director;
            }
        } else if (command.includes(" onDate ")) {
            let [movieName, date] = command.split(" onDate ");
            let movie = movies.find(m => m.name === movieName);
            if (movie) {
                movie.date = date;
            }
        }
    }

    movies
        .filter(m => m.name && m.director && m.date)
        .forEach(m => console.log(JSON.stringify(m)));
}