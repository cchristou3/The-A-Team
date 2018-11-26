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
                newItem.id = "#myLink";
                linkItem.href ="#";

                //linkItem.href = "https://codecyprus.org/th/api/start?player=Homer&app=simpsons&treasure-hunt-id="+object.treasureHunts[i].uuid; //TODO REPLACE
                newItem.appendChild(linkItem);
                challengesList.appendChild(newItem);


                //  console.log(object.treasureHunts[i].name);
            }
            var e = document.getElementById("#myLink");
            e.onclick = submit;
            document.cookie = "uuid"+object.treasureHunts[0].uuid;
            console.log(getCookie(object.treasureHunts[0].uuid));

        }
        else {
            //TODO If response not received (error).
            // Need to run without Internet connection to be tested
            console.error("message");
        }
    };
    xhttp.open("Get", "https://codecyprus.org/th/api/list", true);
    xhttp.send();
}
// need to save the session when a link is clicked
getChallenges();

function submit()
{
    document.getElementById("formTH").style.display = "block";
    document.getElementById("treasureHunts").style.display= "none";

}
var quest = document.getElementById("QuestionArea");
var session;
function getQuestions() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let object = JSON.parse(this.responseText);
            session = getPara("session");
            let newEl = document.createElement("p");
            newEl.innerHTML = object.question[0].name;
            quest.appendChild(newEl);

        }
    };
    xhttp.open("Get", "https://codecyprus.org/th/api/question?+session="+session, true);
    xhttp.send();
}
function answer()
{
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var object = JSON.parse(this.responseText);
            let answer = getPara("answer");
        }
    }
    xhttp.open("Get", "https://codecyprus.org/th/api/answer?+session="+getPara(session)+"&answer=" + answer , true);
    xhttp.send();
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
   // function setCookie(Cookiename,value,exday){
//  var a = new Date();
//  a.setTime(a.getTime() + (exday*24*60*60*1000));
//  var expires="expires="+ a.toUTCString();
//  document.cookie= Cookiename+"="+ value +";"+ expires+";path=/";
// }
function getCookie(Cookiename){
    var name=Cookiename +"=";
    var decodedCookie=decodeURIComponent(document.cookie);
    var CookieArray = decodedCookie.split(';');
    for (var a=0; a<CookieArray.length; a++)
    {
    var v=CookieArray[i];
    while(v.charAt(0)=== ' '){
        v=v.substring(1);
    }
    if(v.indexOf(name)=== 0){
        return v.substring(name.length,v.length);
    }
    }
    return "";
}

// this function is responsible for loading a form. The user will be asked to complete  form with
// Name, App name  -> onSubmit he will be redirected to the game based on his "progress"
//function start() {
    // make change style of form to "block" via javascript
//    document.getElementById("formTH").style.display = "block";
//}


