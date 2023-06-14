const bodyParser = require("body-parser");

const request = require("request");

const express = require("express");

const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({entended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const fistName = req.body.fn;
    const lastName = req.body.ln;
    const email = req.body.em;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fistName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/f7e2c70adb";

    const options = {
        method: "POST",
        auth: "Amar:96332a09b3d63a58e10487165ce6d060-us8"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200)
            res.sendFile(__dirname + "/success.html");
        else
            res.sendFile(__dirname + "/failure.html");

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started at port 3000");
});

//api key- 96332a09b3d63a58e10487165ce6d060-us8
//audience id - f7e2c70adb.