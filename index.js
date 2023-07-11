// This file is the single-entrypoint for the Max patch.
// When this file is executed via `node.script start` in the Max patch,
// this program will launch an Electron app as a child process, and connect to it by websockets


const MaxAPI = require("max-api");
const io = require("socket.io")();
const electron = require("electron");
const proc = require("child_process");
const child = proc.spawn(electron, ["."]);



/*
const express = require("express");
const app = express();
const port = 44444;
app.use(express.static(__dirname + '/'));
app.listen(port);
*/

io.on("connection", (socket) => {
	console.log("Socket is connected with Electron App");
	socket.on("dispatch", (data) => {
		MaxAPI.outlet({
			data
		});
	});
});

io.listen(4512); // trying to avoid using frequently used ports like 3000, 8000

// This will ensure that when this parent process is killed in maxpat (either by `node.script stop` or Max is shutdown for some reason),
// it will terminate the child process, the Electron app.
process.on("exit", () => {
	child.kill();
});



