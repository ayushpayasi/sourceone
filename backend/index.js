const { Client } = require("pg");
const express = require("express");
const cors = require("cors");
require('dotenv').config()
var easyinvoice = require('easyinvoice');




const app = express();

app.use(express.json());
app.use(cors());


// db client
const client = new Client({
    user: process.env.DB_CLIENT_USER,
    host: process.env.DB_CLIENT_HOST,
    database: process.env.DB_CLIENT_DATABASE,
    password: process.env.DB_CLIENT_PASSWORD,
    port: 5432,
  });
  

client.connect(()=>{
    console.log("connected to DB!")
});


 
// requests
app.post("/api/users/createUser", async (req,res)=>{
    try{
        const queryResult =  await client.query(`INSERT INTO "sourceoneuser" ("name" , "password") VALUES ($1,$2) returning *`,[
            req.body.userName,
            req.body.password,
        ])      
        if (queryResult.rowCount > 0 ){
            const data = queryResult.rows[0]
            res.json({code:200,msg:"user Created!",data})
        }
        else{
            res.json({code:400,msg:"cant create a user!"})
        }
        
    }catch(err){console.log(err); res.json({code:500,"msg":"Internal Server Error!"})}
})

app.post("/api/users/getUser", async (req,res)=>{
    try{
        const queryResult = await client.query(`SELECT * FROM "sourceoneuser" WHERE "name" = $1 AND "password" = $2 `,[
            req.body.userName,
            req.body.password,
        ])      
        if (queryResult.rowCount > 0 ){
            const data = queryResult.rows[0]
            res.json({code:200,msg:"Logged in!",data})
        }
        else{
            res.json({code:400,msg:"cant Log in!"})
        }
        
    }catch(err){console.log(err); res.json({code:500,"msg":"Internal Server Error!"})}
})

app.post("/api/users/modifyBook",async (req,res)=>{
    try{
        console.log(req.body.rentedBooks)
        const queryResult = await client.query(`UPDATE "sourceoneuser" SET "rentedBooks" = $1 WHERE "id" = $2 returning *`,[
            req.body.rentedBooks,
            req.body.id
        ])
        if (queryResult.rowCount > 0 ){
            const data = JSON.parse(queryResult.rows[0].rentedBooks)
            res.json({code:200,data})
        }
        else{
            res.json({code:400,msg:"cant modify Books!"})
        }
    }catch(err){console.log(err); res.json({code:500,"msg":"Internal Server Error!"})}
})

app.post("/api/books/insertBook", async (req,res)=>{
    try{
        const queryResult =  await client.query(`INSERT INTO "sourceonebook" ("bookName" , "price") VALUES ($1,$2) returning *`,[
            req.body.bookName,
            req.body.price,
        ])

        if (queryResult.rowCount > 0 ){
            const data = queryResult.rows[0]
            res.json({code:200,msg:"book Inserted!",data})
        }
        else{
            res.json({code:400,msg:"cant insert a book!"})
        }
        
    }catch(err){console.log(err); res.json({code:500,"msg":"Internal Server Error!"})}
})

app.get("/api/books/getBooks",async (req,res)=>{
    try{
        const queryResult = await client.query(`SELECT * FROM "sourceonebook"` )        
        if (queryResult.rowCount > 0 ){
            const data = queryResult.rows
            res.json({code:200,data})
        }
        else{
            res.json({code:400,msg:"cant fetch Books!"})
        }

    }catch(err){console.log(err); res.json({code:500,"msg":"Internal Server Error!"})}
})

app.post("/api/bill/getBill",async (req,res)=>{
    try{
        const queryResult = await client.query(`SELECT * FROM "sourceoneuser" WHERE "name" = $1 AND "password" = $2 `,[
        req.body.userName,
        req.body.password,
        ])      
    if (queryResult.rowCount > 0 ){
        const products = queryResult.rows[0].rentedBooks
        let itemsList = []
        products.forEach(item=>{
            item = JSON.parse(item)
            console.log(item);
            itemsList.push({"description": item.bookName,
            "quantity": parseInt(item.days),
            "price": parseFloat(item.price.substring(1,5)),
            "total":parseInt(item.days)*parseFloat(item.price.substring(1,5)),
            "tax":0})
        })
        var data = {
            //"documentTitle": "RECEIPT", //Defaults to INVOICE
            "currency": "USD",
            "taxNotation": "gst", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            // "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
            //"logoExtension": "png", //only when logo is base64
            "sender": {
                "company": "Source one",
                "address": "xyz street",
                "zip": "1234 AB",
                "city": "Banglore",
                "country": "INDIA"
            },
            "client": {
                "company": "Book Library",
                "address": "xyz",
                "zip": "4567 CD",
                "city": "BHOPAL",
                "country": "INDIA"
            },
            "invoiceNumber": "2021.0001",
            "invoiceDate": (new Date()).getDate(),
            "products": itemsList,
            "bottomNotice": "Kindly pay your invoice within 15 days."
        };
let bill = ""
await easyinvoice.createInvoice(data, function (result) {
    bill = result.pdf
});
res.json({code:200,msg:"Logged in!",data:bill})
}
else{
    res.json({code:400,msg:"cant Log in!"})
}
    }catch(err){console.log(err); res.json({code:500,"msg":"Internal Server Error!"})}

})

app.listen(process.env.PORT || 5000,()=>{
    console.log("running on port",process.env.PORT || 5000)
})

// app.post("api/users/createUser", async (req,res)=>{
// try{
        
//     }catch(err){console.log(err); res.json({code:500,"msg":"Internal Server Error!"})}})