const express = require ("express");
<<<<<<< HEAD
=======
const Axios = require('axios');
>>>>>>> origin/divine
const app = express();
const cors = require("cors");
const { Connection, Request } = require("tedious");
var TYPES = require("tedious").TYPES
app.use(express.json());
app.use(cors());

<<<<<<< HEAD
=======

>>>>>>> origin/divine
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

<<<<<<< HEAD
app.post("/company", (req,res)=> {

    const name = req.body.name;
    const description = req.body.description;
    const email = req.body.email;
    const query = "INSERT INTO company (name, description, email, CompanyID) VALUES (@uname, @udescription, @uemail, '0')";

    const request = new Request(query,
        (err, rowCount) => {
          if (err) {
            console.error(err.message);
          } 
        }
      );
      request.addParameter('uname', TYPES.VarChar, name);
      request.addParameter('udescription', TYPES.VarChar, description);
      request.addParameter('uemail', TYPES.VarChar, email);
      console.log(request);

    connection.execSql(request);
});

app.post("/companies", (req,res)=> {

    results = [];
    const query = "SELECT * FROM company";

    const request = new Request(query,
        (err) => {
          if (err) {
            console.error(err.message);
            connection.close();
          }
          console.error("Worked: " + results);
          if(results.length > 0 ){
            res.json(results);
        }else{
            res.send({message: "No Companies"})
        }
        }
      );

      request.on("row", columns => {
        results.push(columns);
      });

    connection.execSql(request); 
});

app.post("/post", (req,res)=> {

    const name = req.body.name;
    const description = req.body.desc;
    const tags = req.body.tags;
    /*const query = "INSERT INTO posts (name, description, tags) VALUES (@uname, @udescription, @utags, '0')";*/

    const request = new Request(query,
        (err, rowCount) => {
          if (err) {
            console.error(err.message);
          } 
        }
      );
      request.addParameter('uname', TYPES.VarChar, name);
      request.addParameter('udescription', TYPES.VarChar, description);
      request.addParameter('utags', TYPES.VarChar, tags);
      console.log(request);

    connection.execSql(request);
});

=======
>>>>>>> origin/divine
app.post("/register", (req,res)=> {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
<<<<<<< HEAD
=======

>>>>>>> origin/divine
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
<<<<<<< HEAD
      console.log(request);
=======
>>>>>>> origin/divine

      connection.execSql(request);
});

<<<<<<< HEAD
=======

>>>>>>> origin/divine
app.post('/login', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    results = [];
<<<<<<< HEAD
    const q = "SELECT * FROM users WHERE userName = @uname AND password = @upass;";

    const request = new Request(q,
        (err) => {
          if (err) {
            console.error(err.message);
            connection.close();
          }
          console.error("Worked: " + results);
          if(results.length > 0 ){
            res.json(results);
        }else{
=======
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
>>>>>>> origin/divine
            res.send({message: "Invalid Credentials!"})
        }
        }
      );
      request.addParameter('uname', TYPES.VarChar, username);
      request.addParameter('upass', TYPES.VarChar, password);

      request.on("row", columns => {
        results.push(columns);
      });
<<<<<<< HEAD

    connection.execSql(request); 
=======
    connection.execSql(request); 

>>>>>>> origin/divine
})

app.listen(4000, () => {
    console.log('running on port 4000');
})