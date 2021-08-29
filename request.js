/*
    Written by LeRepex
    Last updated: 29.08.2021
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Initialize Variables and set Types
var tmdbapikey;
var tmdbid;
var jsondata;
// Main Function 
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var poster_path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    grabDataFromTextboxes(); // Call function to get user input
                    return [4 /*yield*/, getJSON("https://api.themoviedb.org/3/movie/" + tmdbid + "?api_key=" + tmdbapikey)]; // generate URL for API request by combining user input with an URL Template
                case 1:
                    jsondata = _a.sent(); // generate URL for API request by combining user input with an URL Template
                    poster_path = "https://image.tmdb.org/t/p/w500" + jsondata.poster_path // grab the path from the json response and make it usable later
                    ;
                    console.log(jsondata); // DEBUG: drop all received data from the API call into the JS console
                    clearResultBox(); // Clear resultbox for next result
                    placeResult(poster_path, "resultBox", jsondata.original_title, jsondata.release_date, jsondata.runtime); // call the placeResult function with all the needed parameters
                    document.getElementById("resultBox").scrollIntoView({ behavior: "smooth" }); // Scroll to result smoothly
                    return [2 /*return*/];
            }
        });
    });
}
// Function to get user input from the two Textboxes
function grabDataFromTextboxes() {
    tmdbapikey = document.getElementById("tmdbapikey").value; // Save the input from the first textbox to the var tmdbapikey
    tmdbid = document.getElementById("tmdbid").value; // Save the input from the second textbox to the var tmdbid
}
// Function to make an API request and give back the result as an object
function getJSON(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
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
    moviereleasedate.textContent = "Release Date: " + release_date;
    src.appendChild(moviereleasedate);
    //add br
    src.appendChild(document.createElement("br"));
    //add runtime
    var movieruntime = document.createElement("label");
    movieruntime.textContent = "Runtime: " + runtime + " Min";
    src.appendChild(movieruntime);
}
// Function to clear the "resultbox" for a new request
function clearResultBox() {
    document.getElementById("resultBox").innerHTML = "";
}
