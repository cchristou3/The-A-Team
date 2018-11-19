
var challengesList = document.getElementById("challenges");
function getChallenges() {
    // This line makes sure the button disappears once it is pressed
    document.getElementById("btn").style.display = "none";
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
               // linkItem.href = "https://codecyprus.org/th/api/start?player=Homer&app=simpsons&treasure-hunt-id="+object.treasureHunts[i].uuid; //TODO REPLACE
                linkItem.href = "#";
                newItem.appendChild(linkItem);
                challengesList.appendChild(newItem);
                linkItem.onclick = this.start();


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

// this function is responsible for loading a form. The user will be asked to complete  form with
// Name, App name  -> onSubmit he will be redirected to the game based on his "progress"
function start() {
    // make change style of form to "block" via javascript
    document.getElementById("btn").style.display = "block";


}


 /*   xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var object = JSON.parse(this.responseText);
            console.log("STATUS ==> " + object.status);
            var form = document.createElement(form);
            var formlnk = document.createElement("a");


        }
    }
}
*/

