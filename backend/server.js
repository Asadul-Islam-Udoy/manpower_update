const app = require('./app');
const dbConnection = require('./database/DB');

//db connection
dbConnection();


//home server page
app.get('',(req, res) => {
    res.send("Welcome to the Manpower Station API!");
});

///404
app.get('*', (req, res) => {
    res.send("<h1>404</h1>");
});

//error handler
app.use((err,req,res,next)=>{
    if(res.header){
        console.log('this is erros',err)
        next({
            success:false,
            message:err.message
        })
    }
    else{
        if(err.message){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:'somthing is wrong!'
            })
        }
    }
})

///run port localhost
const port = process.env.PORT || 8000 ;
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`);
});