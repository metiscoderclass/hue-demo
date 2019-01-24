document.getElementById("buttonAan").addEventListener("click", zetAan);
document.getElementById("buttonUit").addEventListener("click", zetUit);
document.getElementById("pasToe").addEventListener("click", pasToe);
var bri = document.getElementById("bri");
var hue = document.getElementById("hue");

lights = ["1", "2", "3", "4", "5"];

function geefBri(){
	if (bri.value &&
			bri.value >= 0 &&
		  bri.value <= 255) {
		return bri.value;
	}
}

function geefHue(){
	if (hue.value &&
			hue.value >= 0 &&
		  hue.value <= 65535) {
		return hue.value;
	}
}

function zetAan(){
	for (var i = 0; i < lights.length; i++){
		console.log("Lamp nummer: " + i);
		sendRequest(lights[i],'{"on": true}');
	}
}

function pasToe(){
	for (var i = 0; i < lights.length; i++){
		console.log("Lamp nummer: " + i);
		let bri = geefBri();
		let hue = geefHue();
		if (bri && hue) {
			sendRequest(lights[i],'{"on": true, "bri": ' + bri + ', "hue": ' + hue + '}');
		} else if (bri){
			sendRequest(lights[i],'{"on": true, "bri": ' + bri + '}');
		} else if (hue){
			sendRequest(lights[i],'{"on": true, "hue": ' + hue + '}');
		} else {
			sendRequest(lights[i],'{"on": true}');
		}
	}
}

function zetUit(){
	for (var i = 0; i < lights.length; i++){
		console.log("Lamp nummer: " + (i+1));
		sendRequest(lights[i], '{"on": false}');
	}
}

function sendRequest(lamp, body){
	var http = new XMLHttpRequest();
	http.open("PUT", "http://192.168.178.172/api/l1SJ36Y-mE6pM48fRULsOjfFIv2tyV68AWtcXNjB/lights/" + lamp + "/state");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200){
			console.log(http.responseText);
		}
	}

	http.send(body);
	// if(state == 1){
	// 	console.log("[" + rgb_to_cie(255, 255, 0).toString() + "]");
	// 	http.send('{"on": true, "xy": [' + rgb_to_cie(162, 255, 0).toString()+']}');
	// }
}

function rgb_to_cie(red, green, blue)
{
	//Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device
	var red 	= (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
	var green 	= (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
	var blue 	= (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

	//RGB values to XYZ using the Wide RGB D65 conversion formula
	var X 		= red * 0.664511 + green * 0.154324 + blue * 0.162028;
	var Y 		= red * 0.283881 + green * 0.668433 + blue * 0.047685;
	var Z 		= red * 0.000088 + green * 0.072310 + blue * 0.986039;

	//Calculate the xy values from the XYZ values
	var x 		= (X / (X + Y + Z)).toFixed(4);
	var y 		= (Y / (X + Y + Z)).toFixed(4);

	if (isNaN(x))
		x = 0;

	if (isNaN(y))
		y = 0;

	return [x, y];
}
