localStorage.setItem("lastname", "Hallo");
console.log(localStorage.getItem("lastname"));

var lamp = 1;

var hue = 1;
var sat = 1;
var ct = 1;
var bri = 1;
var dic_on_off = false;
var spc_on_off = false;

function add() {
  var hue = document.getElementById("hue");
  hue = hue.value;
  var bri = document.getElementById("bri");
  bri = bri.value;
  var sat = document.getElementById("sat");
  sat = sat.value;
  var ct = document.getElementById("ct");
  ct = ct.value;
  localStorage.setItem("hue", hue);
  localStorage.setItem("bri", bri);
  localStorage.setItem("sat", sat);
  localStorage.setItem("ct", ct);
  preset();
  window.location.href = "settings.html";
}

function color(){
  var get_hue = document.getElementById("hue");
  hue = get_hue.value;
  set(hue, sat, ct, bri);
}

function bright(){
  var get_bri = document.getElementById("bri");
  bri = get_bri.value;
  set(hue, sat, ct, bri);
}

function saturation(){
  var get_sat = document.getElementById("sat");
  sat = get_sat.value;
  set(hue, sat, ct, bri);
}

function temp(){
  var get_ct = document.getElementById("ct");
  ct = get_ct.value;
  set(hue, sat, ct, bri);
}

function preset(){
  hue = localStorage.getItem("hue");
  bri = localStorage.getItem("bri");
  sat = localStorage.getItem("sat");
  ct = localStorage.getItem("ct");
  console.log(hue, sat, ct, bri)
  set(hue, sat, ct, bri)
}

function disco() {
  if (dic_on_off == true){
    var ran = Math.floor((Math.random() * 65535) + 1);
    set(ran, 250, 0, 100)
    console.log(ran)
  }
  setTimeout(disco(), 1000);
}

function disco_off_on(){
  if (dic_on_off == true){
    dic_on_off = false;
    console.log("disco uit");
  } else {
    dic_on_off = true;
    console.log("disco aan");
  }
}

function spec(){
  if (spc_on_off == true){
    if (hue < 65500){
      hue+=100;
    } else{
      hue = 0;
    }
    set(hue, sat, ct, bri)
  }
  setTimeout(spec(), 100);
}

function spectrum_off_on(){
  if (spc_on_off == true){
    spc_on_off = false;
    console.log("spectrum uit");
  } else {
    spc_on_off = true;
    console.log("spectrum aan");
  }
}


function set(hue, sat, ct, bri) {
  var http = new XMLHttpRequest();
	http.open("PUT", "http://192.168.178.172/api/l1SJ36Y-mE6pM48fRULsOjfFIv2tyV68AWtcXNjB/lights/" + lamp + "/state");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200){
      console.log("Tof en gaaf!")
		}
  }
  // http.send('{"hue": '+ hue +'}');
  http.send('{"hue": '+ hue +', "sat": '+ sat +'}');

  // http.send('{"hue": '+ hue +', "sat": '+ sat +', "ct": '+ ct +',"bri": ' + bri +'}');
  console.log(hue + " " + sat + " " + ct + " " + bri)
}

function sendRequest(state){
	if(state == "standaard"){
		http.send('{"sat": 255, "ct": 255}');
    set(0, 255, 255, 100)
  }
	if(state == "warm"){
    set(2222, 250, 0, 100)
	}
	if(state == "fris"){
		set(41931, 240, 113, 88);
	}
	if(state == "gras"){
		set(25000, 255, 125, 100);
	}
	if(state == "koffie"){
		set(7000, 177, 132, 10);
	}
	if(state == "vintage"){
    set(14000, 250, 150, 250)
	}
}

var eerder = localStorage.getItem("eerder")

if (eerder == "biggetje"){
  console.log("welkom terug");
} else {
  alert("Do you want cookies? Some Cookies? Cookies? COOCKIES? Deze website maakt gebruik van cookies, deal with it.");
  localStorage.setItem("eerder", "biggetje");
}

var tp = localStorage.getItem("hue")

// if (tp < 2){
//   var henk = document.getElementById("button7");
//   henk.style.display = "none";
// }

// disco()
// spec()
