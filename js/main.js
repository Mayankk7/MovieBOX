$(document).ready( () => {
    $('#search-form').on('submit', (e) => {
        let searchtext = ($('#search').val());
        getMovies(searchtext);
        e.preventDefault();
    });
});

async function getMovies(searchtext){
    fetch('https://www.omdbapi.com/?apikey=353b2ee2&s='+searchtext)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        let movies = response.Search;
        let output = '';
        $.each(movies, (index, movie) => {
           
            output += `
            <div class="col-md-3" >
            <div class="well text-center" id="col">
            <img src="${movie.Poster}" onerror="this.src='./images.jpeg'" class="img-poster">
            <h6>${movie.Title}</h6> 
            <a onclick="movieSelected('${movie.imdbID}')" class="btn" href="#">Movie Details</a>
            </div>
            </div>
            `;}
        );

        $("#movies").html(output);})
    .catch((err) => {
        console.log(err);
        
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieID =sessionStorage.getItem('movieID');
    fetch('https://www.omdbapi.com/?apikey=353b2ee2&i='+movieID)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        let movie = response;

        let output=`
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" onerror="this.src='./images.jpeg'" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released : </strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated : </strong>${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating : </strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${movie.Writers}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                    <li class="list-group-item"><strong>RunTime : </strong>${movie.Runtime}</li>
            </div>
        </div>
        <div class="row">
            <div class="well-movie-plot">
            <h3>Plot</h3>
                ${movie.Plot}
                <div class="buttons">
                <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-movie">View IMDB</a>
                <a href="index.html" class="btn btn-movie ">Back</a>
                </div>
                </div>
        </div>
        `
        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
        
    });
}
