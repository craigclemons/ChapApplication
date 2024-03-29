var http  = require("http");
var url   = require("url");
var route ={
	routes : {},
	for: function(method, path, handler) {
		this.routes[method + path] = handler;
	}
}

	route.for("GET", "/start", function(request,response){
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write("Hello");
		response.end();
	});

	route.for("GET", "/finish", function(request,response){
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write("Goodbye");
		response.end();
	});
					

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + request.method + pathname + "recieveed.")
		if(typeof(route.routes[request.method + pathname]) ==='function'){
		route.routes[request.method + pathname](request,response);
		}else{
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.end("404 Not Found");
	}
}



http.createServer(onRequest).listen(9999);
console.log("server has started");




	route.on("POST", "/echo", function(request,response){
		var incoming = "";
		request.on('data', function(chunk) {
			incoming += chunk.toString();
		});
		request.on('end', function(){
			response.writeHead(200, {"Content-Type":"text/plain"});
			response.write(incoming);
			response.end();
		});
	});
	
