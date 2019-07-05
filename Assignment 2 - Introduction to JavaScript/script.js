let url = "http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment";
let security = "?api-key=Happy!!!";
let text = "";

// Background color
let colorArray = ["#FF0000", "#FF8C00", "#FFD700", "#9ACD32", "#00FF00"];

// Mood image
let imgArray = new Array();
imgArray[0] = new Image();
imgArray[0].src = "Smily0.PNG";

imgArray[1] = new Image();
imgArray[1].src = "Smily1.PNG";

imgArray[2] = new Image();
imgArray[2].src = "Smily2.PNG";

imgArray[3] = new Image();
imgArray[3].src = "Smily3.PNG";

imgArray[4] = new Image();
imgArray[4].src = "Smily4.PNG";



document.querySelector("#sendText").addEventListener("click", e => {
    text = document.getElementById("myInput").value;
    fetch(url + security, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sentence: text,
        })
    })
        .then(response => response.json())
        .then(json => handleResponse(json))
        .catch(error => console.error("Error: ", error))
});

function handleResponse(json) {
    if (json.value === 0) {
        document.querySelector("#mySentence").innerHTML = "No text to analyse!";

    } else {
        document.querySelector("#mySentence").innerHTML = text;

    }
    document.querySelector("#value").innerHTML = json.value;
    document.body.style.backgroundColor = colorArray[json.value];
    document.getElementById("smily").src = imgArray[json.value].src;
}