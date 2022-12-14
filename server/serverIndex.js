const express = require ("express");
const axios = require('axios');
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

app.post("/company", (req,res)=> {

    const name = req.body.name;
    const description = req.body.description;
    const email = req.body.email;
    const query = "INSERT INTO company (name, description, email) VALUES (@uname, @udescription, @uemail)";

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

app.post("/editcompany", (req,res)=> {

  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const email = req.body.email;
  const query = "UPDATE company SET name=@uname, description=@udescription, email=@uemail WHERE CompanyID=@uid";

  const request = new Request(query,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } 
      }
    );
    request.addParameter('uid', TYPES.Int, id);
    request.addParameter('uname', TYPES.VarChar, name);
    request.addParameter('udescription', TYPES.VarChar, description);
    request.addParameter('uemail', TYPES.VarChar, email);
    console.log(request);

  connection.execSql(request);
});

app.post("/getcompany", (req,res)=> {

  results = [];
  const id = req.body.id;
  const query = "SELECT * FROM company WHERE CompanyID=@uid";

  const request = new Request(query,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.error("Worked: " + results);
      if(results.length > 0 ){
        res.json(results);
    }else{
        res.send({message: "No Companies"})
    }
    }
  );
    request.addParameter('uid', TYPES.Int, id);
    request.on("row", columns => {
      results.push(columns);
      console.log(columns)
    });

  connection.execSql(request); 
});

app.post("/companies", (req,res)=> {

    results = [];
    const query = "SELECT * FROM company";

    const request = new Request(query,
        (err) => {
          if (err) {
            console.error(err.message);
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
        console.error(columns)
      });

    connection.execSql(request); 
});

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

  const name = req.body.name;
  const description = req.body.description;
  const companyID = req.body.companyId;
  const tags = req.body.tags;

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  const query = `INSERT INTO Post (CompanyID, Name, Description, Date) VALUES (${companyID}, '${name}', '${description}', '${today}');`;

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
  const companyID = req.body.companyID;
  let q = "SELECT * FROM Post";
  if ( companyID !== undefined ) q += ` WHERE CompanyID=${companyID}`
  q += ';'

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

    const postID = req.body.postID;
    const companyID = req.body.companyID;
    const title = req.body.title;
    const description = req.body.description;
    const creator = req.body.username;

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const query = `INSERT INTO Ticket (PostID, CompanyID, Name, Description, Status, Date, Creator) VALUES (${postID}, ${companyID}, '${title}', '${description}', 0, '${today}', '${creator}');`;
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
    const companyID = req.body.CompanyID;
    const postID = req.body.PostID;
    let q = "SELECT * FROM Ticket;";
    if ( companyID !== undefined && postID !== undefined ) q += ` WHERE CompanyID=${companyID} AND PostID=${postID}`
    q += ';'

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