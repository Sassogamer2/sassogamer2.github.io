var images = [
    "bike.jpg", "boat.jfif", "car.jfif", "double-decker.jfif",
    "helicopter.jfif", "lorry.jfif", "motorbike.jpg", "plane.jfif", "scooter.jpg",
    "taxi.jfif", "train.jfif", "tram.jfif", "tube.jfif", "van.jpg", "yacht.jfif"
];

var img = document.getElementById("image");
var alphabet = [], ia = "a".charCodeAt(0);
for (; ia <= "z".charCodeAt(0); ++ia) {
    alphabet.push(String.fromCharCode(ia));
}

var foundLettersCounter = 0;
var lettersNumber = 0;

var currentImage = images[Math.floor(Math.random() * images.length)];
img.src = "assets/" + currentImage;
var imageName = currentImage.replace(/\..+$/g, '').replace('-', ' ');
lettersNumber = imageName.replace(' ', '').length;

if (imageName == "tube") {
    imageName = Math.random() <= 0.5 ? "tube" : "underground";
}

var currentLetters = [];
for (var i = 0; i < imageName.length; i++) {
    if (imageName.charAt(i) == " ") continue;
    var pos = Math.floor(Math.random() * 15);
    while (currentLetters[pos]) pos = Math.floor(Math.random() * 15);
    currentLetters[pos] = imageName.charAt(i);
}
for (var i = 0; i < 15; i++) {
    if (!currentLetters[i]) {
        var cl = Math.floor(Math.random() * alphabet.length);
        while (currentLetters.find(element => element == alphabet[cl])) {
            cl = Math.floor(Math.random() * alphabet.length);
        }
        currentLetters[i] = alphabet[cl];
    }
}

for (var i = 0; i < currentLetters.length; i++) {
    var newElem = document.createElement("a");
    newElem.appendChild(document.createTextNode(currentLetters[i]));
    newElem.id = "l" + i;
    newElem.classList.add("grabbable");
    newElem.setAttribute("draggable", "true");
    newElem.setAttribute("ondragstart", "drag(event)");
    document.getElementById("letterList").appendChild(newElem);
    document.getElementById("letterList").appendChild(document.createTextNode("\u2003"));
}

for (var i = 0; i < imageName.length; i++) {
    var newElem = document.createElement("a");
    if (imageName.charAt(i) == " ") {
        newElem.appendChild(document.createTextNode(" "));
    } else {
        newElem.appendChild(document.createTextNode("_"));
        newElem.setAttribute("ondrop", "drop(event, this)");
        newElem.setAttribute("ondragover", "allowDrop(event)");
        newElem.setAttribute("data-real", imageName.charAt(i));
    }
    document.getElementById("word").appendChild(newElem);
    document.getElementById("word").appendChild(document.createTextNode("\u2002"));
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev, elem) {
    ev.preventDefault();
    var droppedElement = document.getElementById(ev.dataTransfer.getData("id"));
    if (elem.innerHTML == "_" && elem.getAttribute("data-real") == droppedElement.innerHTML) {
        elem.innerHTML = droppedElement.innerHTML;
        droppedElement.remove();
        foundLettersCounter++;
        if (foundLettersCounter == lettersNumber) {
		    var confettiSettings = {"target":"confetti-holder","max":"500","size":"1","animate":true,"props":["square","triangle","line"],"colors":[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],"clock":"35","rotate":true,"start_from_edge":true,"respawn":false};
		    var confetti = new ConfettiGenerator(confettiSettings);
		    confetti.render();
		    try { document.getElementById("partyhorn").play(); } catch(e) {}
            setTimeout(function(){ location.reload(); }, 3000);
        }
    }
}