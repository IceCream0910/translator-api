var express = require('express');
var app = express();

const keyList = [["dhrxLiMx61NYsBrghQku", "N4NwLdTlYv"], ["62_kDpDAxX46nb5F88Dz", "YwQe6WIbrL"], ["EBSKtCss0OoUP5wH7vme", "XUjGhjaiQQ"], ["C58oWMvy0D6W8NGjF1As", "i3HhZlOZKE"], ["hNpRLnWTb0q8H7LQegQh", "v2I5GYJWoA"], ["UV49k11w7RsiWUZ8SJo_", "tcU6SqJJvV"]];
const keyIndex = Math.floor(Math.random() * keyList.length);
const client_id = keyList[keyIndex][0];
const client_secret = keyList[keyIndex][1];
//파파고 번역
app.get('/papago', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var query = req.query.text;
    var targetLang = req.query.target;
    var sourceLang = req.query.source;

    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var request = require('request');
    var options = {
        url: api_url,
        form: { 'source': sourceLang, 'target': targetLang, 'text': query },
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

//언어감지
app.get('/detectLangs', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var query = req.query.text;
    var api_url = 'https://openapi.naver.com/v1/papago/detectLangs';
    var request = require('request');
    var options = {
        url: api_url,
        form: { 'query': query },
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});