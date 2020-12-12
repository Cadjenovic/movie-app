const config = {
    root : document.querySelector('#autocomplete'),
    async fetchData(searchInput){
        const result = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey : '6aa3afcb',
            s : searchInput
        }
    });
        return(result.data.Search);
    },
    renderOption(movie){
        const imgSrc = movie.Poster === "N/A" ? '' : movie.Poster;
        return `
            <img src=${imgSrc}/>
            <p> ${movie.Title} (${movie.Year}) </p>
        `;
    },
    onOptionSelect(movie){
        onMovieSelect(movie, document.querySelector('#summary'));
    },
    optionValue(movie){
        return movie.Title;
    }
};

const onMovieSelect = async (movie, element) => {
    const movieDetails = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey : '6aa3afcb',
            i : movie.imdbID
        }
    });

    element.innerHTML = movieTemplate(movieDetails.data);
}

const movieTemplate = (movieDetails) => {
    return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetails.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetails.Title}</h1>
          <h4>${movieDetails.Genre}</h4>
          <p>${movieDetails.Plot}</p>
        </div>
      </div>
    </article>

    <article class="notification is-primary">
      <p class="title">${movieDetails.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetails.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetails.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetails.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetails.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
}






createAutoComplete(config);


