// Constants
const allMoviesBtn = document.querySelector("#all-movies")
const getNewerMoviesBtn = document.querySelector("#newer-movies")
const bestRatedMoviesBtn = document.querySelector("#best-rated-movies")

const searchBar = document.querySelector(".search-bar-input")

const ul = document.querySelector(".list");
const headlineForLists = document.querySelector(".headline-for-lists")

// Event-listeners
allMoviesBtn.addEventListener("click", getAllMovies)
getNewerMoviesBtn.addEventListener("click", getNewMovies)
bestRatedMoviesBtn.addEventListener("click",getTop10BestRatedMovies)

searchBar.addEventListener("keyup",searchEngine)

// Variables
let movieDataGlobal;

fetch('https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json')
    .then(response => response.json())
    .then(movieData =>
    {
        movieDataGlobal = movieData
        console.log(movieData[0].title);
// A function that changes text after what kind of movie number you want to work with, in this example its movie number 200, which is "ATM".
        function movieSelector (numberOfArray)
        {
            console.log(movieData[numberOfArray].title + " is a movie from " + movieData[numberOfArray].year + " that is " + movieData[numberOfArray].running_times + " seconds long. It has a rating of " + movieData[numberOfArray].rating + " out of " + movieData[numberOfArray].votes + " votes. ")
        }
        movieSelector(200)

// Functions

        /*  A function that uses a for loop, because I want to check each movie from the Json Api.
        Here I create a li inside our ul. And then we want to create a p-tag for each key in the array.
        Then we use the appendChild method, that adds a child to the end of each parent, in my case every p tag. */

        function renderMovies (ul, movieData)
        {
            let startH1 = document.createElement("h1")
            startH1.appendChild(document.createTextNode(" All Movies"))
            headlineForLists.classList.add("headline-for-current-list")
            headlineForLists.appendChild(startH1)

            for (let i = 0; i < movieData.length ; i++)
            {
                let li = document.createElement("li")

                let titleP = document.createElement("p");
                let yearP = document.createElement("p");
                let ratingP = document.createElement("p");
                let votesP = document.createElement("p");
                let runningTimeP = document.createElement("p")

                titleP.classList.add("title")

                titleP.appendChild(document.createTextNode("Title: " + movieData[i].title))
                yearP.appendChild(document.createTextNode("Year: " + movieData[i].year))
                ratingP.appendChild(document.createTextNode("Rating: " + movieData[i].rating))
                votesP.appendChild(document.createTextNode("Votes: " + movieData[i].votes))
                // Converting the running time from seconds to hours, so that the website is more user-friendly.
                runningTimeP.appendChild(document.createTextNode("Running Time: " + (Math.round( ((movieData[i].running_times/60/60))*100 )/100).toFixed(2) + " Hours "));

                // AppendChild method is used one more time
                li.appendChild(titleP)
                li.appendChild(yearP)
                li.appendChild(ratingP)
                li.appendChild(votesP)
                li.appendChild(runningTimeP)

                // This makes it so, that each movie is seperated in a li inside the ul. Then I use CSS to again make the website more manageable.
                ul.appendChild(li)
            }
        }
        renderMovies (ul, movieData)})

// Only resets my lists
function resetLists ()
{
    ul.innerHTML = ""
}

// Resets both the lists and the headline for the Lists
function resetListsAndHeadlineForLists ()
{
    ul.innerHTML = ""
    headlineForLists.innerHTML = ""
}


/* Search engine, I want to make a search engine that checks every letter in the title and then the list/lists
appears if it has that letter in it */

        // https://www.youtube.com/watch?v=ZFUOC-y4i0s Ved ikke helt hvorfor jeg ikke kan f?? det til at fungere.
        // Mit log siger at det har noget at g??re med min textValue.toUpperCase(), men kan sku ikke helt finde ud af det...
function searchEngine ()
{
    resetLists()
    const ulSearch = document.querySelector(".list-of-movies")
    const titleSearch = ulSearch.querySelectorAll("li")

    for (let i = 0; i < movieDataGlobal[i].title.length ; i++)
    {
        console.log("hejehej")
        let match = movieDataGlobal[i].title[0];
        if(match){
            let textValue = match.textContent || match.innerHTML

            if (textValue.toUpperCase().indexOf(movieDataGlobal) > -1)
            {
                titleSearch[i].style.display = "";
            } else {
                titleSearch[i].style.display = "none";
            }
        }
    }
}

// All Movies Button ->
function getAllMovies ()
{
    resetListsAndHeadlineForLists()

    let allMoviesH1 = document.createElement("h1")
    allMoviesH1.innerHTML = "All Movies"
    headlineForLists.appendChild(allMoviesH1)

    for (let i = 0; i < movieDataGlobal.length ; i++)
    {
        let li = document.createElement("li")

        let titleP = document.createElement("p");
        let yearP = document.createElement("p");
        let ratingP = document.createElement("p");
        let votesP = document.createElement("p");
        let runningTimeP = document.createElement("p")

        titleP.classList.add("title")

        titleP.appendChild(document.createTextNode("Title:" + movieDataGlobal[i].title))
        yearP.appendChild(document.createTextNode("Year: " + movieDataGlobal[i].year))
        ratingP.appendChild(document.createTextNode("Rating: " + movieDataGlobal[i].rating))
        votesP.appendChild(document.createTextNode("Votes: " + movieDataGlobal[i].votes))
        runningTimeP.appendChild(document.createTextNode("Running Time: " + (Math.round( ((movieDataGlobal[i].running_times/60/60))*100 )/100).toFixed(2) + " Hours "));

        li.appendChild(titleP)
        li.appendChild(yearP)
        li.appendChild(ratingP)
        li.appendChild(votesP)
        li.appendChild(runningTimeP)

        ul.appendChild(li)
    }
}

// Best Rated Movies Button ->
// Headline for when I push the "Best rated movies button"
function renderHeadlineForListsTop10RatedMovies ()
{
    resetListsAndHeadlineForLists()

    let bestRatedMoviesH1 = document.createElement("h1")
    bestRatedMoviesH1.innerHTML = "Top 10 Best Rated Movies"
    headlineForLists.appendChild(bestRatedMoviesH1)
}

// Get best rated movies
function getTop10BestRatedMovies ()
{
    // I create a loop that checks every element in [i].rating column that's bigger or equal to 8.9
    renderHeadlineForListsTop10RatedMovies ()
    for (let i = 0; i < movieDataGlobal.length; i++)
    {
        if(movieDataGlobal[i].rating >= 8.9)
        {
            let li = document.createElement("li")

            let titleP = document.createElement("p");
            let yearP = document.createElement("p");
            let ratingP = document.createElement("p");
            let votesP = document.createElement("p");
            let runningTimeP = document.createElement("p")

            titleP.appendChild(document.createTextNode("Title: " + movieDataGlobal[i].title))
            yearP.appendChild(document.createTextNode("Year: " + movieDataGlobal[i].year))
            ratingP.appendChild(document.createTextNode("Rating: " + movieDataGlobal[i].rating))
            votesP.appendChild(document.createTextNode("Votes: " + movieDataGlobal[i].votes))
            runningTimeP.appendChild(document.createTextNode("Running Time: " + (Math.round(((movieDataGlobal[i].running_times / 60 / 60)) * 100) / 100).toFixed(2) + " Hours "));

            li.appendChild(titleP)
            li.appendChild(yearP)
            li.appendChild(ratingP)
            li.appendChild(votesP)
            li.appendChild(runningTimeP)

            ul.appendChild(li)
        }
    }
}

// Get Newer Movies Button ->
// Headline for when I push the "Get newer movies button"
function renderHeadlineForListsNewMovies ()
{
    resetListsAndHeadlineForLists()

    let newerMoviesH1 = document.createElement("h1")
    newerMoviesH1.innerHTML = "Movies From 2014 And Above"
    headlineForLists.appendChild(newerMoviesH1)
}

// Get new movies
function getNewMovies ()
{
    renderHeadlineForListsNewMovies()

    for (let i = 0; i < movieDataGlobal.length; i++)
    {
        if (movieDataGlobal[i].year >= 2014)
        {
            let li = document.createElement("li")

            let titleP = document.createElement("p");
            let yearP = document.createElement("p");
            let ratingP = document.createElement("p");
            let votesP = document.createElement("p");
            let runningTimeP = document.createElement("p")

            titleP.appendChild(document.createTextNode("Title: " + movieDataGlobal[i].title))
            yearP.appendChild(document.createTextNode("Year: " + movieDataGlobal[i].year))
            ratingP.appendChild(document.createTextNode("Rating: " + movieDataGlobal[i].rating))
            votesP.appendChild(document.createTextNode("Votes: " + movieDataGlobal[i].votes))
            runningTimeP.appendChild(document.createTextNode("Running Time: " + (Math.round(((movieDataGlobal[i].running_times / 60 / 60)) * 100) / 100).toFixed(2) + " Hours "));

            li.appendChild(titleP)
            li.appendChild(yearP)
            li.appendChild(ratingP)
            li.appendChild(votesP)
            li.appendChild(runningTimeP)

            ul.appendChild(li)
        }
    }
};