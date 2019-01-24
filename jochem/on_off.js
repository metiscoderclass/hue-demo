function sendRequest(state){

	var http = new XMLHttpRequest();
	http.open("PUT", "http://192.168.0.141/api/A8V2lmMOZkXTMXtvoPNCsCn2XJk9AY-YacnVaaOo/lights/10/state");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200){
		}
	}
	if(state == 1){
		http.send('{"on": true}');
	}
	if(state == 0){
		http.send('{"on": false}');
	}
}
