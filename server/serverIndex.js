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
            res.send({message: "Invalid Username!"})
          }else{
            res.send({note: "Registered!"})
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

app.post('/getuser', (req,res) =>{
  const username = req.body.username;
  results = [];
  const q = "SELECT * FROM users WHERE userName = @uname;";
  const request = new Request(q,
      (err) => {
        if (err) { 
          console.error(err.message);
          connection.close();
        }
        if(results.length > 0 ){
          res.json(results);
      }else{
          res.send({message: "Invalid Credentials!"})
      }
      }
    );
    request.addParameter('uname', TYPES.VarChar, username);

    request.on("row", columns => {
      results.push(columns);
    });
  connection.execSql(request); 

})

app.post("/updatePass", (req,res)=> {
  const username = req.body.username;
  const password = req.body.password;
  
  const query = "UPDATE users SET password = @upass WHERE UserName = @uname;";

  const request = new Request(query,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          connection.close();
          res.send({message: "Update Failed!"})
        }else{
          res.send({note: "Success!"})
        } 
      }
    );
    request.addParameter('uname', TYPES.VarChar, username);
    request.addParameter('upass', TYPES.VarChar, password);
    connection.execSql(request);
});

app.post("/updateEmail", (req,res)=> {
  const username = req.body.username;
  const email = req.body.email;
  
  const query = "UPDATE users SET email = @email WHERE UserName = @uname;";

  const request = new Request(query,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          connection.close();
          res.send({message: "Update Failed!"})
        }else{
          res.send({note: "Success!"})
        } 
      }
    );
    request.addParameter('uname', TYPES.VarChar, username);
    request.addParameter('email', TYPES.VarChar, email);
    connection.execSql(request);
});


app.post("/reset_companies", (req,res)=> {

    const query = `DELETE FROM Company;`;

    const request = new Request(query,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            }
        }
    );

    connection.execSql(request);
});

app.post("/new_company", (req,res)=> {

  const random_id = Math.floor(Math.random() * 100);
  const query = `INSERT INTO Company (CompanyID, Name, Description, Email) VALUES (${random_id}, 'CName', 'CDesc', 'cname@mail.com');`;

  const request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  connection.execSql(request);
});

app.post("/companies", (req,res)=> {

  results = [];
  const q = "SELECT * FROM Company;";

  const request = new Request(q,
    (err) => {
      if (err) {
        console.error(err.message);
      }

      if(results.length > 0 ){
        res.json(results);
      } else{
        res.send({message: "Companies not found!"})
      }
    }
  );

  request.on("row", columns => {
    results.push(columns);
  });

  connection.execSql(request);
});


app.post("/reset_posts", (req,res)=> {

    const query = `DELETE FROM Post;`;

    const request = new Request(query,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            }
        }
    );

    connection.execSql(request);
});

app.post("/new_post", (req,res)=> {

  const companyID = 19;
  const random_id = Math.floor(Math.random() * 100);
  const query = `INSERT INTO Post (PostID, CompanyID, Name, Description, Date) VALUES (${random_id}, ${companyID}, 'PostName', 'Post_desc', '12-03-2022');`;

  const request = new Request(query,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  connection.execSql(request);
});

app.post("/posts", (req,res)=> {

  results = [];
  const q = "SELECT * FROM Post;";

  const request = new Request(q,
    (err) => {
      if (err) {
        console.error(err.message);
      }

      if(results.length > 0 ){
        res.json(results);
      } else{
        res.send({message: "Posts not found!"})
      }
    }
  );

  request.on("row", columns => {
    results.push(columns);
  });

  connection.execSql(request);
});


app.post("/reset_tickets", (req,res)=> {

    const query = `DELETE FROM Ticket;`;

    const request = new Request(query,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            }
        }
    );

    connection.execSql(request);
});

app.post("/new_ticket", (req,res)=> {

  const query = `INSERT INTO Ticket (TicketID, PostID, CompanyID, Name, Description, Status, Date, Creator) VALUES (14, 2, 8, 'TName', 'TDesc', 0, '12-03-2022', 'ME');`;
  const request = new Request(query,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  connection.execSql(request);
});

app.post("/tickets", (req,res)=> {

  results = [];
  const q = "SELECT * FROM Ticket;";

  const request = new Request(q,
    (err) => {
      if (err) {
        console.error(err.message);
      }

      if(results.length > 0 ){
        res.json(results);
      } else{
        res.send({message: "No rows found!"})
      }
    }
  );

  request.on("row", columns => {
    results.push(columns);
  });

  connection.execSql(request);
});


app.listen(4000, () => {
    console.log('running on port 4000');
})