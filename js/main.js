$(document).ready( () => {
    $('#search-form').on('submit', (e) => {
        let searchtext = ($('#search').val());
        getMovies(searchtext);
        e.preventDefault();
    });
});

function getMovies(searchtext){
    axios.get('http://www.omdbapi.com/?apikey=353b2ee2&s='+searchtext)
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="col-md-3 ">
            <div class="well text-center">
            <img src="${movie.Poster}">
            <h6>${movie.Title}</h6>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-dark" href="#">Movie Details</a>
            </div>
            </div>
            `;
        });

        $("#movies").html(output);
    })
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
    axios.get('http://www.omdbapi.com/?apikey=353b2ee2&i='+movieID)
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output=`
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
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
            </div>
        </div>
        <div class="row">
            <div class="well">
            <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-dark">View IMDB</a>
                <a href="index.html" class="btn btn-primary">Back</a>
                </div>
        </div>
        `
        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
        
    });
}