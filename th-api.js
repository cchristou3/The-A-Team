const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url


// The List loads
let challengesList = document.getElementById("challenges");
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
                linkItem.href ="form.html?treasureHuntID=" + object.treasureHunts[i].uuid;

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
                    //setCookie("session", object.treasureHunts[i].uuid, 365);
                    // document.cookie = "uuid="+object.treasureHunts[i].uuid;
                    // The cookie saves the session
                    console.log("DOCUMENT COOKIE= "+document.cookie);
                }
            }
        }
        else {
            alert("No Internet Connection, Please connect to the Internet 1");
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/list", true);
    xhttp.send();
}


//-----------------------------------------------------------------------------------------//
// this function is responsible for loading a form. The user will be asked to complete  form with
// Name, App name  -> onSubmit he will be redirected to the game based on his "progress"
function start(name, treasureHuntID) {
    console.log("START STARTED WITH PLAYER NAME: " + name + " AND TREASUREHUNTID: " + treasureHuntID);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let object = JSON.parse(this.responseText);
            if (object.status === "ERROR") {
                //TODO ERROR
            }
            else {
                //TODO OK
                // document.cookie = "session=" + object.session;
                setCookie("session", object.session, 365);
                window.location.href = "Questions.html";
            }
        }
        else {
            alert("No Internet Connection, Please connect to the Internet 2");
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/start?player=" + name + "&app=The-A-Team&treasure-hunt-id=" + treasureHuntID, true);
    xhttp.send();
    console.log("START ENDED");
}

//-------------------------------------------------------------------------------------------//
// Get A question function
let needsLocation = true;
let canBeSkipped = true;
function getQuestions() {
    // console.log("GET QUESTIONS STARTED");
    console.log("QUESTION SESSION===> "+getCookie("session"));
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("QUESTIONN=======>"+this.responseText);
            let object = JSON.parse(this.responseText);
            console.log(object);
            needsLocation = object['requiresLocation'];
            canBeSkipped = object['canBeSkipped'];
            // when treasurehunt is over go to leaderboard
            if (object['completed'] === true)
            {
                //https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie

                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                window.location.href = "leaderboard.html";
            }

            let quest = document.getElementById("QuestionArea");

            console.log(document.cookie);
            console.log(object.questionText);
            quest.innerHTML = object.currentQuestionIndex+1+"/"+object.numOfQuestions + "   " + object.questionText;

            if (object.questionType === "MCQ")
            {
                document.getElementById("Select").style.display = "block";
            }
            if (object.questionType === "TEXT")
            {
                document.getElementById("Text").style.display = "block";
            }
            if (object.questionType === "INTEGER")
            {
                document.getElementById("Numbers").style.display = "block";
            }
            if (object.questionType === "BOOLEAN")
            {
                document.getElementById("Boolean").style.display = "block";
            }
            if (object.questionType === "NUMERIC")
            {
                document.getElementById("Numeric").style.display = "block";
            }
        }
        else {
            // Error message: TODO
            alert("No Internet Connection, Please connect to the Internet 3");
        }

    };
    xhttp.open("GET", "https://codecyprus.org/th/api/question?session=" + getCookie("session"), true);
    xhttp.send();
}
function ansText(ans)
{
    if (needsLocation) {
        getLocation();
    }
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("GET ansText RESPONSE --> " + this.responseText);
            let object = JSON.parse(this.responseText);
            console.log("JSON.parse(this.responseText)==>"+object);
            console.log(object.correct);
            if (object.correct === true)
            {
                alert("Correct Answer!, You gained 10 points");

                location.reload();
            }else
                alert("Wrong Answer!, You lose 3 points, Try again");

            showScore();
        }
        else
            alert("No Internet Connection, Please connect to the Internet 4");
    };
    console.log("https://codecyprus.org/th/api/answer?session=" + getCookie("session")+"&answer="+ans);
    xhttp.open("GET", "https://codecyprus.org/th/api/answer?session=" + getCookie("session")+"&answer="+ans, true);
    xhttp.send();
    console.log("ansText ENDED");

}
showScore();
function showScore() {
    console.log("showScore STARTED");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("GET ans RESPONSE --> " + this.responseText);
            let object = JSON.parse(this.responseText);
            let divScore = document.getElementById("playerScore");
            divScore.innerHTML = "<p> Player: " + object.player + "  Score: " + object.score + "</p>";
        }
        else
        {
            alert("No Internet Connection, Please connect to the Internet 5");
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/score?session=" + getCookie("session"), true);
    xhttp.send();
    console.log("showScore ENDED");
}

function skipQuestion() {

    if (canBeSkipped === true){
        if(confirm("Are sure you want to skip the question?\n You will lose 5 points"))
        {
        let xhttp = new XMLHttpRequest();
        xhttp.onload = function () {         //TODO If response received (success).
            let object = JSON.parse(this.responseText);
            location.reload();
        };
        xhttp.open("GET", "https://codecyprus.org/th/api/skip?session=" + getCookie("session"), true);
        xhttp.send();
     }
    }
    else
        alert("CAN NOT BE SKIPPED");
}
function isTest() {
    let url = new URL(window.location.href);
    console.log(url.searchParams.get("test") != null);
    return url.searchParams.get("test") != null;
}
function leaderboard() {

    let testURL = "https://codecyprus.org/th/test-api/";
    let normalURL = "https://codecyprus.org/th/api/";
    let URL;

    if (isTest()) URL = testURL;
    else URL = normalURL;

    console.log("LEADERBOARD===> STARTED");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("GET LEADERBOARD RESPONSE --> " + this.responseText);
            let object = JSON.parse(this.responseText);
            let objectArray = object['leaderboard'];
            let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit'};
                let html = "<table>" + "<tr>"+"<th>" +"Name" +"</th>"+
                "<th>" +"Score" +"</th>"+
                "<th>" +"Time" +"</th>"+
                "</tr>";
            for (let i in objectArray)
            {
                let entry = objectArray[i];
                let date = new Date(entry['completionTime']);
                let formattedDate = date.toLocaleDateString("en-UK", options);
                html += "<tr>" +
                    "  <td>"+entry['player'] + "</td>"+
                    "  <td>"+entry['score'] + "</td>"+
                    "  <td>"+ formattedDate + "</td>"+
                    "</tr>";

            }
            html += "</table>";
            let list =  document.getElementById("leaderboardList");
            list.innerHTML = html;
            // the leaderboard will load through javascript inner.HTML implementation
        }
        else
        {
            alert("No Internet Connection, Please connect to the Internet 7");

    };
    xhttp.open("GET", URL + "leaderboard?session=" + getCookie("session")+"&sorted&limit=10", true);
    xhttp.send();
}

function getParameters() {
    let getName  = document.getElementById("playerName");
    if (!getName.value)
    {
        alert("Please enter a username");
    }
    else {
        start(getName.value, selectedTreasureHuntID);
    }
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
    let session = getCookie("session");
    console.log("SESSION COOKIE====> "+session);
    if (session !== "") {
        if (confirm("You have progress, would you like to continue?")) {
            window.location.href = "Questions.html";
        }
        else
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }


}

//-------------------------------------------------------------------------------------------//
// Code was taken from https://www.w3schools.com/html/html5_geolocation.asp
// This function's goal is to capture the users location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationToServer);
    } else {
        showError();
    }
}

// shows the location in HTML
function showPosition(position) {
    // var x = document.getElementById("QuestionArea");
    // x.innerHTML="Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
    // locationToServer(position.coords.latitude,position.coords.longitude);
}

function locationToServer(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("GET LOCATION RESPONSE --> " + this.responseText);
            let object = JSON.parse(this.responseText);
            console.log("locationToServer ==> Success");
        }
        else
            alert("No Internet Connection, Please connect to the Internet 8");
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/location?session=" + getCookie("session") + "&latitude=" + latitude + "&longitude=" + longitude, true);
    xhttp.send();
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


