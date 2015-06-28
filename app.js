var server_getgps = require('http').createServer();
var fs = require('fs');

var server_distribute = require("http").createServer(function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end("end");
}).listen(8080);
var io = require('socket.io').listen(server_distribute);

// ファイル読み取り
// var obj = JSON.parse(fs.readFileSync('./writetest.json', 'utf8'));
// console.log(obj);

io.sockets.on("connection",  function(socket) {

    io.sockets.emit("publish", "");

    socket.on("disconnect", function () {

    });

    socket.on("json", function (data) {

        // json書き出し
        // fs.writeFile('circle.js', data , function (err) {
        //     //console.log(err);
        // });

        console.log(data);

    });
});

function doRequest(req, res) {

    console.log(req.body);
    res.writeHead(200, {'content-type':'text/html'});
    res.write('Thankssssss.\n');
    res.end();
    if(num_connect>0){
        if(req.method=='POST') {
	    var content_type = req['headers']['content-type'];
	    if(content_type.match(/json/i)){
                var body='';
                req.on('data', function (data) {
		            body +=data;
                });
                req.on('end',function(){
		            var json = JSON.parse(body);
                    cache.push(json);
                    console.log(json);

                });

	    }
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.write('Thank you for sending.\n');
	    res.end();
        } else {
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.write('Not Json.\n');
	    res.end();
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Thanks.\n');
	res.end();
    }
}
