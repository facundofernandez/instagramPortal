const express 	= require('express');
const app 		= express();
const path 		= require('path');

const port = 4568;

app.use(express.static(path.join(__dirname,'../')));

app.all('/', (req,res)=>{
	res.send("Hola mundo Instagram");
	fs.readFile("index.html", function(err, data){
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.write(data);
	  res.end();
	});
});

app.listen(port ,()=>{
	console.log('Servidor corriendo en puerto ', port);
});