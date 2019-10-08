import app from './app.js';


app.listen(process.env.port || 3000, function() {
    console.log('Its working');
})