const MongoClient = require('mongodb').MongoClient;
var express = require("express"),
    app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get("/sayHello", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});


// This end point allows for anyone to post a message onto the server
app.get("/message", function(req,res){
  let message=req.query.message
  insertMessage(message)
  res.send('Message inserted')
})

// Database management

const uri = "mongodb+srv://sit725:sit725@sit725.bmmdp.mongodb.net/sitboard?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Insert message into database

let messageCollection;

const openConnection = (message) => {
  console.log('Test 1')
  client.connect(err => {
    console.log('Test 2')
    messageCollection = client.db("sitboard").collection("message");
  });
}

const insertMessage = (message) => {

  console.log('Test 1')
  messageCollection.insert({message:message})
    // perform actions on the collection object
}

openConnection()
/* setTimeout(()=>{
  insertMessage('This is a test one')
},2000) */

app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();
