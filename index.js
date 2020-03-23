const fs = require("fs");
const http = require('http');
const url = require('url');

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

const replacTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTATY%}/g, product.quantity);
  output = output.replace(/{%NUTRATION%}/g, product.nutrients);
  output = output.replace(/{%DESCREPTION%}/g, product.descreption);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);

  if (!product.organic) output = output.replace(/{%NOT-ORGANIC%}/g, 'not - organic');
  return output;
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);
  const pathNam = req.url;

  //overview
  if (pathNam === '/' || pathNam === '/overview') {
    res.writeHead(200, { 'Content-type': 'text.html' });

    const cardHtml = dataObj.map(el => replacTemplate(card, el));
    const output = overview.replace('{%PRODUCT_CARD%}', cardHtml);
    res.end(output);

    //product
  } else if (pathNam === '/product') {
    res.end('heloo from product');

    //api
  } else if (pathNam === '/api') {
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