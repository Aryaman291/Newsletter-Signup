const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({extended:true}));

const port = 3000;

// app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", function(req,res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  console.log(firstName , lastName , email);


const data = {
  members: [
  {
    email_address:email,
    status: "subscribed",
    merge_fields:{
      FNAME:firstName,
      LNAME:lastName
    }

  }
]
};

const jsonData = JSON.stringify(data);

const url ="https://us5.api.mailchimp.com/3.0/lists/e4a8d9c531";

const options = {
  method: "POST" ,
  auth: "Aryaman:948ca0332119a8cbcb4c1b55c49aa7b8-us5"

}

const request = https.request(url, options , function(response){

if(response.statusCode===200){
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}

response.on("data",function(data){
  console.log(JSON.parse(data))
})

})
 request.write(jsonData);
 request.end();
});


app.post("/failure",function(req ,res){
  res.redirect("/");
})



app.listen(process.env.PORT || port, function() {
     console.log(`Example app listening at http://localhost:${port}`);
});
