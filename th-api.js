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


// The List loads
var challengesList = document.getElementById("challenges");

function getChallenges() {
    // This line makes sure the button disappears once it is pressed
    //  document.getElementById("btn").style.display = "none";
    // Implement code that adds "List of all treasuehunts" in the buttons place

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //  console.log(this.responseText);
            let object = JSON.parse(this.responseText);
            console.log("STATUS ==> "+object.status);
            for (let i = 0;i<object.treasureHunts.length;i++)
            {
                var newItem = document.createElement("li");
                var linkItem = document.createElement("a");
                linkItem.innerHTML = object.treasureHunts[i].name;
                newItem.id = "#myLink"+i;
                linkItem.href ="form.html";

                //linkItem.href = "https://codecyprus.org/th/api/start?player=Homer&app=simpsons&treasure-hunt-id="+object.treasureHunts[i].uuid; //TODO REPLACE
                newItem.appendChild(linkItem);
                challengesList.appendChild(newItem);

                //  console.log(object.treasureHunts[i].name);
            }
            // We use for loop to make sure all treasureHunts
            for (let i = 0;i<object.treasureHunts.length;i++)
            {
                var e = document.getElementById("#myLink"+i);
                // when user clicks on a treasure Hunts, a form appears while the list disappears
                e.onclick = function(){
                    setCookie("session", object.treasureHunts[i].uuid, 365);
                    // document.cookie = "uuid="+object.treasureHunts[i].uuid;
                    // The cookie saves the session
                    console.log(document.cookie);
                }
            }
        }
        else {
            //TODO If response not received (error).
            // Need to run without Internet connection to be tested
            console.log("message");
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/list", true);
    xhttp.send();
}


//-----------------------------------------------------------------------------------------//
// this function is responsible for loading a form. The user will be asked to complete  form with
// Name, App name  -> onSubmit he will be redirected to the game based on his "progress"
function start(getName) {
    console.log("START STARTED");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var jsonObject = JSON.parse(this.responseText);
            if (jsonObject.status === "ERROR") {
                //TODO ERROR
            }
            else {
                //TODO OK
                window.location.href = "Questions.html";
            }
        }
        else {
            //TODO ERROR MESSAGE
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/start?player=" + getName + "&app=The-A-Team&treasure-hunt-id=" + getCookie("session"), true);
    xhttp.send();
    console.log("START ENDED");
}

//-------------------------------------------------------------------------------------------//
// Get A question function

function getQuestions() {
    console.log("GET QUESTIONS STARTED");
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("GET QUESTION RESPONSE --> " + this.responseText);
            let object = JSON.parse(this.responseText);
            console.log(object);


            //
            // // when treasurehunt is over go to leaderboard
            // if (object.currentQuestionIndex === object.numOfQuestions)
            // {
            //     //https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie
            //     document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            //     //leaderboard();
            // }
            //
            // if (object.requires-location===true)
            // {
            //     getLocation()
            // }
            // let quest = document.getElementById("QuestionArea");
            //
            // console.log(document.cookie);
            // quest.innerHTML = object.questionText;
            // console.log(object.errorMessages);
            //
            // if (object.questionType === "MCQ")
            // {
            //     document.getElementById("Select").style.display = "block";
            // }
            // if (object.questionType === "TEXT")
            // {
            //     document.getElementById("Text").style.display = "block";
            // }
            // if (object.questionType === "INTEGER")
            // {
            //     document.getElementById("Numbers").style.display = "block";
            // }
            // if (object.questionType === "BOOLEAN")
            // {
            //     document.getElementById("boolean").style.display = "block";
            // }
            // if (object.questionType === "NUMERIC")
            // {
            //     document.getElementById("Numeric").style.display = "block";
            // }
        }
        else {
            // Error message: TODO
            //console.log(object.status);
        }

    };
    xhttp.open("GET", "https://codecyprus.org/th/api/question?session=" + getCookie("session"), true);
    xhttp.send();
}
//function getSession()
//{
//   let url = new URL(window.location.href);
//  return url.searchParams.get("session");
//}
//-------------------------------------------------------------------------------------------//
// Still needs work
// Gets the parameter in the url
function getParameters() {
    let getName  = document.getElementById("playerName");
    start(getName.value);
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
    }
}
// shows the location in HTML
function showPosition(position) {
    var x = document.getElementById("QuestionArea");
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




