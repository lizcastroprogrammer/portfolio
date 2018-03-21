var express = require("express"),
    bodyParser = require("body-parser"),
    nodemailer = require("nodemailer"),
    app = express();

require("dotenv").config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("portfolio");
});

app.post("/contact", function(req, res){
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
    mailOpts = {
        from: req.body.name + '&lt;' + req.body.email + '&gt;',
        to: process.env.GMAIL_USER,
        subject: 'New message from contact form in portfolio',
        text: '${req.body.name} (${req.body.email}) says: ${req.body.message}'
    };
    smtpTrans.sendMail(mailOpts, function(err, res){
        if(err){
            res.send("contact failed to send");
        } else {
            res.send("contact success!");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("server started!");
});
    