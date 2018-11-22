const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url

// object
let x = {
    name: "",
    score:""
};
// array that contains objects
let arrayX = [
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
            var object = JSON.parse(this.responseText);
            console.log("STATUS ==> "+object.status);
            for (var i = 0;i<object.treasureHunts.length;i++)
            {
                var newItem = document.createElement("li");
                var linkItem = document.createElement("a");
                linkItem.innerHTML = object.treasureHunts[i].name;
                linkItem.href = "https://codecyprus.org/th/api/start?player=Homer&app=simpsons&treasure-hunt-id="+object.treasureHunts[i].uuid; //TODO REPLACE
                newItem.appendChild(linkItem);
                challengesList.appendChild(newItem);
                //  console.log(object.treasureHunts[i].name);
            }
        }
        else {
            //TODO If response not received (error).
        }
    };
    xhttp.open("Get", "https://codecyprus.org/th/api/list", true);
    xhttp.send();
}
getChallenges();

function getQuestions() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var object = JSON.parse(this.responseText);
        }
    }
}
// Still needs work
// Gets the parameter in the url
    function getPara(parameter) {
        let url = new URL(window.location.href);
        return url.searchParams.get("parameter");
    }

// Still needs work
// Put all player names in an array
    function getInfo() {
        let v = document.getElementById("formInput").value;
        console.log("v: " + v);
        arrayX.push(v);
        console.log(arrayX);
    }


// this function is responsible for loading a form. The user will be asked to complete  form with
// Name, App name  -> onSubmit he will be redirected to the game based on his "progress"
//function start() {
    // make change style of form to "block" via javascript
//    document.getElementById("formTH").style.display = "block";
//}


