var tmdbapikey:string
var tmdbid:string
var jsondata:any

async function main() {
    grabDataFromTextboxes()
    jsondata = await getJSON(`https://api.themoviedb.org/3/movie/${tmdbid}?api_key=${tmdbapikey}`)
    var poster_path:string = `https://image.tmdb.org/t/p/w500${jsondata.poster_path}`
    console.log(jsondata)
    clearResultBox()
    placeResult(poster_path, "resultBox", jsondata.original_title, jsondata.release_date, jsondata.runtime)
    document.getElementById("resultBox").scrollIntoView({behavior: "smooth"});
}

function grabDataFromTextboxes() {
    tmdbapikey = (document.getElementById("tmdbapikey") as HTMLFormElement).value;
    tmdbid = (document.getElementById("tmdbid") as HTMLFormElement).value;
}

async function getJSON(url) {
    let response = await fetch (url);
    let data = await response.json()
    return data;
}

function placeResult(url, place, title, release_date, runtime) {
    //get div to place results in
    var src = document.getElementById(place);

    //add image
    var movieposter = document.createElement("img");
    movieposter.src = url;
    src.appendChild(movieposter);
    
    //add title
    var movietitle = document.createElement("h1");
    movietitle.textContent = title;
    src.appendChild(movietitle);
    
    //add release date
    var moviereleasedate = document.createElement("label");
    moviereleasedate.textContent = `Release Date: ${release_date}`;
    src.appendChild(moviereleasedate)

    //add br
    src.appendChild(document.createElement("br"))
    
    //add runtime
    var movieruntime = document.createElement("label");
    movieruntime.textContent = `Runtime: ${runtime} Min`;
    src.appendChild(movieruntime)
}

function clearResultBox() {
    document.getElementById("resultBox").innerHTML = "";
}