 // file system object
 const fs = require('fs'); // 'fs' is the module name. it's a core module. comes with node.js
// another core module of node.js
const http = require('http');
// another node module
const url = require('url');

var MongoClient = require('mongodb').MongoClient;
const password = '1234';
var mongoUrl = `mongodb+srv://DorBenLulu:${password}@spotit-bx5gf.mongodb.net/test?retryWrites=true`;
const jsonAirplanes = fs.readFileSync(`${__dirname}/data/airplanes/airplanesData.json`, 'utf-8'); 
const jsonAirports = fs.readFileSync(`${__dirname}/data/airports/airportsData.json`, 'utf-8');
let dbo;

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log('Connected successfully to database!');
    dbo = db.db("SpotItCollection");
});


const server = http.createServer((req, res) => { // This method is executed each time we access the URL
    const pathName = url.parse(req.url, true).pathname; 
    const id = url.parse(req.url, true).query.id;
    const type = url.parse(req.url, true).query.type; 

    if(pathName === '/') { // Main overview (will be the default, only when pathName is nothing (only slash))
        res.writeHead(200, {'Content-type': 'text/html'});
        let html = `
            <figure class="card">
                <h2 class="card__name">Welcome to SpotIt</h2>
                <p class="card__detail"> Choose to view  one of the following DB:  </p>
                    <a href=/airplanes class="card__link">Airplanes</a>
                    <a href=/airports class="card__link">Airports</a>
            </figure>
        `;
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            overviewOutput = overviewOutput.replace('{%CARDS%}', html); 
            res.end(overviewOutput);
        
        });
    } else if(pathName === '/airplanes') { // If the user wants to view airplanes from the DB
        res.writeHead(200, {'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            
            fs.readFile(`${__dirname}/templates/template-airplane-card.html`, 'utf-8', (err, data) => {
            
                dbo.collection('airplanes', (err, collection) => {
                    
                    if (err) throw err;
                    collection.find().toArray((err, items) => {
                        
                        if (err) throw err;
                        const cardsOutput = items.map(el => replaceAirplaneTemplate(data, el)).join('');
                        overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput); 
                        res.end(overviewOutput);
                    });
                  });
            });
        });
    } else if(pathName === '/airports') { // If the user wants to view airports from the DB
        res.writeHead(200, {'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8',  (err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-airport-card.html`, 'utf-8', async (err, data) => {
              dbo.collection('airports', (err, collection) => {
                
                if (err) throw err;
                collection.find().toArray((err, items) => {
                    
                    if (err) throw err;
                    const cardsOutput = items.map(el => replaceAirportTemplate(data, el)).join('');
                    overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput); 
                    res.end(overviewOutput);
                });
              });
            });
        });
    } else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) { // IMAGES => any regular exprresion to indicate this is images request will work
        fs.readFile(`${__dirname}/data/img/${pathName}`, (err, theReadData) => {
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(theReadData);
        });
    } else { // URL NOT FOUND
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('URL was not found in the server');
    }
});

// Listening in specific port+ip to new requests - as soon as we START listening, the callback function gets fired (optionally)
server.listen(1338, '127.0.0.1', () => {
});

function replaceAirplaneTemplate(originalHtml, airplane) {
    let output = originalHtml.replace(/{%BRAND%}/g, airplane.brand);
    output = output.replace(/{%IMAGE%}/g, airplane.image);
    output = output.replace(/{%MODEL%}/g, airplane.model);
    output = output.replace(/{%COMPANY%}/g, airplane.company);
    return output;
}

function replaceAirportTemplate(originalHtml, airport) {
    let output = originalHtml.replace(/{%NAME%}/g, airport.name);
    output = output.replace(/{%CITY%}/g, airport.city);
    output = output.replace(/{%COUNTRY%}/g, airport.country);
    output = output.replace(/{%IATA%}/g, airport.iata);
    output = output.replace(/{%IMAGE%}/g, airport.image);
    return output;
}