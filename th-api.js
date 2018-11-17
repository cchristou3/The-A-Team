
var challengesList = document.getElementById("challenges");
function getChallenges() {
    var xhttp = new XMLHttpRequest();
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
