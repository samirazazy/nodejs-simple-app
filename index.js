const fs = require("fs");
const http = require('http');

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `this is text ${textIn} \n created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log(textOut);

// Non-Blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/${data2}.txt`, "utf-8", (err, data3) => {
//       console.log(data2);

//       fs.writeFile(`./txt/final.txt`, `first : ${data2} \n second one: ${data3}`, "utf-8", err => {
//         console.log("final is created...");
//       });
//     });
//   });
// });
// console.log("Will read file");

///////////////////////////////
// server
const server = http.createServer((req, res) => {
  // console.log(req;
  res.end('heloo from the server?!...');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listining to req on 8000...');
});