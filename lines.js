
var container;
var spanCollection;

var timer;
var counter = 1;

var NUM_LINES = 500;
var CONTAINER_WIDTH = window.innerWidth - 15;
var CONTAINER_HEIGHT = window.innerHeight * (8/10);

function init() {
	container = document.getElementById("container");

	container.style.width = CONTAINER_WIDTH + "px";
	container.style.height = CONTAINER_HEIGHT + "px";

	// outerChild is a mask to detect mouse events
	// while innerChild is where the background actually changes
	var outerChild, innerChild;
	for (var i = 0; i < NUM_LINES; i++) {

		outerChild = document.createElement("span");
		outerChild.style.height = "100%";
		outerChild.style.width = (100 / NUM_LINES) + "%";
		outerChild.style.display = "inline-block";
		outerChild.style.position = "relative";

		outerChild.addEventListener("mousemove", mouseIsMoving);
		outerChild.addEventListener("mouseout", mouseIsOut);

		innerChild = document.createElement("a");
		innerChild.style.background = "#" + (i%10) + (i%10) + (i%10);
		innerChild.style.height = "0";
		innerChild.style.width = "100%";
		innerChild.style.display = "inline-block";
		innerChild.style.position = "absolute";
		innerChild.style.bottom = "0";
		innerChild.style.transition = ".4s";
		
		outerChild.appendChild(innerChild);
		container.appendChild(outerChild);
		
		spanCollection = document.getElementsByTagName("a");

	}
}

function mouseIsMoving(e) {
	this.childNodes.item(0).style.height = (CONTAINER_HEIGHT - e.clientY) + "px";
}

function mouseIsOut(e) {
	var target = this;
	setTimeout(function(e) { target.childNodes.item(0).style.height = "0%"; }, 600);
}

function sin() {

	timer = setInterval(function(e) {

		// steps from start to finish
		var DETAIL = Math.floor(NUM_LINES / 2);

		// percent of wave that's visible
		var DELAY = .5;

		// waves per screen
		var FREQUENCY = 2;

		// item((counter * ))
		spanCollection.item((counter * (NUM_LINES / DETAIL)) % NUM_LINES).style.height = 
			(((Math.sin(counter * Math.PI * 2 * FREQUENCY / DETAIL) * CONTAINER_HEIGHT) + CONTAINER_HEIGHT) / 2) + "px";

		// subtracting a higher value from the counter leads to more delay before lines falling
		spanCollection.item(Math.floor((Math.max(0, (counter * NUM_LINES / DETAIL) - (DELAY * NUM_LINES)) % NUM_LINES))).style.height = "0%";

		counter++;

	}, 10);

}

function stop() {
	clearInterval(timer);

	for (var i = 0; i < spanCollection.length; i++) {
		spanCollection.item(i).style.height = "0%";
	}
}