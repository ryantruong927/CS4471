const express = require ("express");
const Axios = require('axios');
const app = express();
const cors = require("cors");
const { Connection, Request } = require("tedious");
var TYPES = require("tedious").TYPES
app.use(express.json());
app.use(cors());


const configuration = {
    authentication: {
      options: {
        userName: "tiketappadmin",
        password: "TicketApp!!"
      },
      type: "default"
    },
    server: "ticketappserver.database.windows.net", 
    options: {
      database: "ticketapp",
      encrypt: true
    }
  };
  const connection = new Connection(configuration);

  connection.on("connect", err => {
    if (err) {
      console.error(err.message);
    } 
  });


connection.connect();

app.post("/register", (req,res)=> {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const query = "INSERT INTO users (UserName, password, Email, Reputation) VALUES (@uname, @upass, @uemail, '0')";

    const request = new Request(query,
        (err, rowCount) => {
          if (err) {
            console.error(err.message);
          } 
        }
      );
      request.addParameter('uname', TYPES.VarChar, username);
      request.addParameter('upass', TYPES.VarChar, password);
      request.addParameter('uemail', TYPES.VarChar, email);

      connection.execSql(request);
});


app.post('/login', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    results = [];
 //   const q = "SELECT * FROM users;";
    const q = "SELECT * FROM users WHERE userName = @uname AND password = @upass;";
    const request = new Request(q,
        (err) => {
          if (err) { 
            console.error(err.message);
            connection.close();
          }
          if(results.length > 0 ){
            res.json(results);
        }else{
          console.log("Not working")
            res.send({message: "Invalid Credentials!"})
        }
        }
      );
      request.addParameter('uname', TYPES.VarChar, username);
      request.addParameter('upass', TYPES.VarChar, password);

      request.on("row", columns => {
        results.push(columns);
      });
    connection.execSql(request); 

})

app.listen(4000, () => {
    console.log('running on port 4000');
})