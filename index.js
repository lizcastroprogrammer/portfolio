var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    nodemailer = require("nodemailer"),
    app = express();

require("dotenv").config();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res){
    res.render("portfolio");
});

app.post("/contact", function(req, res){
    var transporter = nodemailer.createTransport({
        service: "Yahoo",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
    var mailOptions = {
        from: req.body.email,
        to: process.env.GMAIL_USER,
        subject: "Portfolio Submission",
        text: "Name: "+req.body.name+"Email: "+req.body.email+"Message: "+req.body.message,
        html: "<ul><li>Name: "+req.body.name+"</li><li>Email: "+req.body.email+"</li><li>Message: "+req.body.message+"</li></ul>"
    };
    transporter.sendMail(mailOptions, function(error, info){
       if(error){
           console.log(error);
           res.redirect("/");
       } else {
           console.log("Message Sent: "+info.response);
           res.redirect("/");
       }
    });
    console.log(process.env.GMAIL_USER);
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running...");
});

