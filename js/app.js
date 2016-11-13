var $getMovies = $('#get-movies');
var $movieResults = $('#movie-results');
var $lightbox = $('.lightbox');
var apiCall = "https://www.omdbapi.com/?s=star+wars&y=&plot=short&r=json";
var movies = [];

$.getJSON(apiCall, function(data) {
    console.log(data.Search);
    movies = data.Search;
    $.each(movies, function (key, val) {
      $movieResults.append('<div id=' + key + '><img src="' + val.Poster + '" alt="' + val.Title + ' poster"></div>');
    }); //each
  }); //getJSON

$getMovies.click(function () {
  $movieResults.css('display', 'flex');
  $getMovies.hide();
}); //button click

$('#movie-results').on('click', '> div', function () {
  var index = parseInt($(this).attr('id'));
  var imdb = movies[index].imdbID;
  console.log(imdb);
  var descriptionCall = "https://www.omdbapi.com/?i=" + imdb + "&plot=short&r=json";
  console.log(descriptionCall);

  $.getJSON(descriptionCall, function(data) {

    console.log(data);

    $lightbox.append(
          '<div class="lightbox-result">' + 
            '<img src="' + movies[index].Poster + '" alt="' + movies[index].Title + ' poster">' +
            '<div class="movie-details">' +
              '<h2>' + movies[index].Title + '</h2>' +
              '<div>Released in: ' + movies[index].Year + '</div>' +
              '<div>IMDB: <a href="http://www.imdb.com/title/' + movies[index].imdbID + '">' + movies[index].imdbID + '</a></div>' +
              '<div class="description">' + data.Plot + '</div>' +
            '</div>' +
          '</div>'
    );
  });

  $lightbox.css('display', 'flex');
});

$lightbox.click(function() {
  $lightbox.hide();
  $lightbox.html("");
});