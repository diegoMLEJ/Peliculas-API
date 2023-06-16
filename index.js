var mongoose= require('mongoose')
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://127.0.0.1:27017/Tecno')
    .then(() => {
        console.log('Conenctado')
    app.listen(port, function() {
          console.log("Servidor de Api http://localhost:" + port);
        });
}).catch(() => {
    console.log("Error");
});