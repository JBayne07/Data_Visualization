const XMLHttpRequest = require('xhr2');
const Http = new XMLHttpRequest();
const url = 'http://localhost:9000/api/numbers'

for(let i = 0; i < 1000; ++i){
    let n = Math.floor(Math.random()*(1000000-(-1000000)+1)+(-1000000));
    Http.open("POST", url);
    Http.setRequestHeader('Content-Type', 'application/json');
    let t = '{"value":'+ n + '}'
    let temp = JSON.parse(t)
    Http.send(JSON.stringify(temp));
}