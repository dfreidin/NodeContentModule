module.exports = function(request, response) {
    function return_404(response) {
        console.log("Responding with 404")
        response.writeHead(404);
        response.end();
    }
    function serveFile(route, encoding, content_type) {
        fs.readFile(route, encoding, function(errors, contents){
            if(contents) {
                response.writeHead(200, {"Content-Type": content_type});
                response.write(contents);
                response.end();
            }
            else {
                return_404(response)
            }
        });
    }
    const fs = require("fs");
    var route = request.url.slice(1);
    console.log("Requested route: " + request.url);
    if(route.slice(0,11) === "stylesheets") {
        console.log("Loading content from: " + route);
        serveFile(route, "utf8", "text/css");
    }
    else if(route.slice(0,6) === "images") {
        var fe = route.match(/\..*/g)[0].slice(1)
        console.log("Loading " + fe + " from: " + route);
        serveFile(route, "", "image/"+fe);
    }
    else {
        if(route.slice(route.length-5, route.length) !== ".html") {
            if(route !== "") {
                route += "/"
            }
            route += "index.html";
        }
        route = "views/" + route;
        console.log("Loading content from: " + route);
        serveFile(route, "utf8", "text/html");
    }
}