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
        service: "Gmail",
  auth: {
    XOAuth2: {
      user: "elizabethjcastro42@gmail.com", // Your gmail address.
                                            // Not @developer.gserviceaccount.com
      clientId: "86267265415-02dm1b1vlf377se2l9tl3qor5tde003v.apps.googleusercontent.com",
      clientSecret: "iTKHrHd8rkhgQ6xKMjrqLCqY",
      refreshToken: "1/R6aH2qYw8AqFGu0VFSVIywDdKbjGqrTZ3djpj9I-rzw"
    }
  }
    });
    mailOpts = {
        from: req.body.name + '&lt;' + req.body.email + '&gt;',
        to: process.env.GMAIL_USER,
        subject: 'New message from contact form in portfolio',
        text: '${req.body.name} (${req.body.email}) says: ${req.body.message}'
    };
    smtpTrans.sendMail(mailOpts, function(error, response){
        if(error){
            console.log(error);
        } else {
            console.log(response);
        }
        smtpTrans.close();
    });
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("server started!");
});
    
    
