const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url

// object
let details = {
    name: "",
    score:""
};
// array that contains objects
let arrayDetails = [
    {name:"",score:""}
];

var challengesList = document.getElementById("challenges");

function getChallenges() {
    // This line makes sure the button disappears once it is pressed
  //  document.getElementById("btn").style.display = "none";
    // Implement code that adds "List of all treasuehunts" in the buttons place

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let object = JSON.parse(this.responseText);
            console.log("STATUS ==> "+object.status);
            for (let i = 0;i<object.treasureHunts.length;i++)
            {
                var newItem = document.createElement("li");
                var linkItem = document.createElement("a");
                linkItem.innerHTML = object.treasureHunts[i].name;
                newItem.id = "#myLink";
                //newItem.id = "#myLink"; +i;
                linkItem.href ="#";
                console.log("1223");
                //linkItem.href = "https://codecyprus.org/th/api/start?player=Homer&app=simpsons&treasure-hunt-id="+object.treasureHunts[i].uuid; //TODO REPLACE
                newItem.appendChild(linkItem);
                challengesList.appendChild(newItem);
                console.log("5555");

                //  console.log(object.treasureHunts[i].name);
            }
            let e = document.getElementById("#myLink");
            e.onclick = function(){
                document.getElementById("formTH").style.display = "block";
                document.getElementById("treasureHuntsList").style.display= "none";
            };
            document.cookie = "uuid"+object.treasureHunts[0].uuid;
            console.log(document.cookie);
            console.log(getCookie("uuid"));

        }
        else {
            //TODO If response not received (error).
            // Need to run without Internet connection to be tested
            console.log("message");
        }
    };
    xhttp.open("Get", "https://codecyprus.org/th/api/list", true);
    xhttp.send();
}
// need to save the session when a link is clicked
getChallenges();

//-----------------------------------------------------------------------------------------//
// this function is responsible for loading a form. The user will be asked to complete  form with
// Name, App name  -> onSubmit he will be redirected to the game based on his "progress"
function start(getName,getApp) {
    //  make change style of form to "block" via javascript
    // document.getElementById("formTH").style.display = "none";
 console.log("1");
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let object = JSON.parse(this.responseText);

            // TODO Check for errors

          //  else
            console.log("1");
                //    window.location.href = "Questions.html";
        }
    };
    xhttp.open("Get", "https://codecyprus.org/th/api/start?"+"Plaer="+getName+"&App="+getApp+"&treasure-hunt-id="+getCookie("uuid"), true);
    xhttp.send();
}

//-------------------------------------------------------------------------------------------//
// Get A question function
var quest = document.getElementById("QuestionArea");
var session;
function getQuestions() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var object = JSON.parse(this.responseText);
            session = getParameter("session");
            let newEl = document.createElement("p");
            newEl.innerHTML = object.question[0].name;
            quest.appendChild(newEl);

        }
        //else
            // Error message: TODO
        console.log(object.status);
        console.log(object.errorMessages);
    };
    xhttp.open("Get", "https://codecyprus.org/th/api/question?+session="+session, true);
    xhttp.send();
}

//-------------------------------------------------------------------------------------------//
// Still needs work
// Gets the parameter in the url
    function getParameters() {
    //    let url = new URL(window.location.href);
    //    return url.searchParams.get("parameter");
        let getName  = document.getElementById("playerName");
        let getApp  = document.getElementById("appName");
        start(getName.value,getApp.value);
        console.log(getName);
        console.log(getApp);
    }


//-------------------------------------------------------------------------------------------//

    //setCookie,getCookie,checkCookies from w3Schools.com
   function setCookie(Cookiename,value,exday){
  let a = new Date();
  a.setTime(a.getTime() + (exday*24*60*60*1000));
 let expires="expires="+ a.toUTCString();
 document.cookie= Cookiename+"="+ value +";"+ expires+";path=/";
 }

function getCookie(Cookiename){
    let name=Cookiename +"=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let CookieArray = decodedCookie.split(';');
    for (let a=0; a<CookieArray.length; a++)
    {
    let v=CookieArray[a];
    while(v.charAt(0)=== ' '){
        v=v.substring(1);
    }
    if(v.indexOf(name)=== 0){
        return v.substring(name.length,v.length);
    }
    }
    return "";
}
function checkCookie() {
    let username = getCookie("username");
    if (username !== "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username !== "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}

//-------------------------------------------------------------------------------------------//
// Code was taken from https://www.w3schools.com/html/html5_geolocation.asp
// This function's goal is to capture the users location
var x = document.getElementById("demo"); // x is where to show the location in the website
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        showError();
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
// shows the location in HTML
function showPosition(position) {
    x.innerHTML="Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        default: // in case of an unknown error
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}




