const fs = require("fs");
const http = require('http');
const url = require('url');
const replacTemplate = require('./modules/replaceTemplate')
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
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);

  const { query, pathname } = url.parse(req.url, true)



  //overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text.html' });

    const cardHtml = dataObj.map(el => replacTemplate(card, el));
    const output = overview.replace('{%PRODUCT_CARD%}', cardHtml);
    res.end(output);

    //product
  } else if (pathname === '/product') {

    res.writeHead(200, { 'Content-type': 'text.html' });
    const chosenProduct = dataObj[query.id];
    const viewProduct = replacTemplate(product, chosenProduct);
    res.end(viewProduct);


    //api

  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(data);

    //not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end('<h1>page not found!</h1>');
  }

});

server.listen(8000, '127.0.0.1', () => {
  console.log('listining to req on 8000');
});