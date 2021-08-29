/*
    Written by LeRepex
    Last updated: 29.08.2021
*/

// Initialize Variables and set Types
var tmdbapikey:string
var tmdbid:string
var jsondata:any

// Main Function 
async function main() {
    grabDataFromTextboxes() // Call function to get user input
    jsondata = await getJSON(`https://api.themoviedb.org/3/movie/${tmdbid}?api_key=${tmdbapikey}`) // generate URL for API request by combining user input with an URL Template
    var poster_path:string = `https://image.tmdb.org/t/p/w500${jsondata.poster_path}` // grab the path from the json response and make it usable later
    console.log(jsondata) // DEBUG: drop all received data from the API call into the JS console
    clearResultBox() // Clear resultbox for next result
    placeResult(poster_path, "resultBox", jsondata.original_title, jsondata.release_date, jsondata.runtime) // call the placeResult function with all the needed parameters
    document.getElementById("resultBox").scrollIntoView({behavior: "smooth"}); // Scroll to result smoothly
}

// Function to get user input from the two Textboxes
function grabDataFromTextboxes() {
    tmdbapikey = (document.getElementById("tmdbapikey") as HTMLFormElement).value; // Save the input from the first textbox to the var tmdbapikey
    tmdbid = (document.getElementById("tmdbid") as HTMLFormElement).value;   // Save the input from the second textbox to the var tmdbid
}

// Function to make an API request and give back the result as an object
async function getJSON(url) {
    let response = await fetch (url);
    let data = await response.json()
    return data;
}

// Function to add the result elements to the "resultbox"
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

// Function to clear the "resultbox" for a new request
function clearResultBox() {
    document.getElementById("resultBox").innerHTML = "";
}