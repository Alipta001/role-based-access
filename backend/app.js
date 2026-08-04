require('dotenv').config()
const express=require('express');
const ejs=require('ejs');
const ConnectDB=require('./app/config/db')
const path=require('path')
const cors=require('cors')
const Session=require('express-session')
const cookieParser=require('cookie-parser')
const connectflash=require('connect-flash')
const helmet=require('helmet')
const Limit=require('./app/utils/limite')
const morgan=require('morgan')

ConnectDB();
const app=express();


const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


app.use(helmet())
app.use(Limit)
app.use(morgan('dev'))
app.use(Session({
    secret:process.env.SESSION_SECRECT || "secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24 // 1 day
    }
}))
app.use(cookieParser())
app.use(connectflash())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// templates and static files
app.set('view engine','ejs')
app.set('views','views')
app.use(express.static('public'))
app.use('uploads',express.static(path.join(__dirname,'uploads')))
app.use('/uploads',express.static('uploads'))


//Common Routes
const commonRoutes= require("./app/routes/commonRoutes");
app.use('/common', commonRoutes);
//Admin Routes
const adminRoutes= require("./app/routes/adminRoutes/adminRoutes");
app.use('/admin', adminRoutes);

//Employee Routes
const employeeRoutes= require("./app/routes/employeeRoutes/employeeRoutes");
app.use('/employee', employeeRoutes);

//Manager Routes 
const managerRoutes= require("./app/routes/managerRoutes/managerRoutes");
app.use('/manager', managerRoutes);

//record routes
const RecordRoutes = require('./app/routes/recordRoutes');
app.use('/records', RecordRoutes)

const PORT=process.env.PORT || 4000
app.listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("server is running on port ",`http://localhost:${PORT}`);
    }
})

