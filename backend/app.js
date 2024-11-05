const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const session = require("express-session");
const passport =  require("passport");
const path = require('path');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const userRouters = require('./routes/userRouters')
const serviceCategoryRoutes = require('./routes/serviceCategoryRouter');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const clientRouters = require('./routes/clientRouters')
const workerRouters = require('./routes/workerRouters')
const reviewRoutes = require('./routes/reviewRoutes');
const bannerRouters = require('./routes/bannerRouters');
const contractRouters = require('./routes/contractRouters');
const homepageRouters = require('./routes/homepageRouter');
const cors = require('cors');
const paymentammerPayRoutes = require('./routes/paymentammerpayRoutes');
const paymentsslcPayRoutes = require('./routes/paymentsslcpaymentRouter');
const notificationRoutes = require('./routes/notificationRoutes');
//const supportTicketRoutes = require('./routes/supportTicketRoutes');


///express add
const app = express();
///access json data
app.use(express.json());

///access file path
dotenv.config({path:'.env'});

//cors file
app.use(cors());

//file middleware
app.use('/images', express.static(path.join(__dirname, './public/images')));


// use the session middleware
app.use(
    session({
      secret: process.env.SESSION_SECRET, // session secret
      resave: false,
      saveUninitialized: false,
    })
  );

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/api/admins', adminRoutes);
app.use('/api/users', userRouters);
app.use('/api/services/categories', serviceCategoryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/workers',workerRouters);
app.use('/api/clients',clientRouters);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments/ammerpay', paymentammerPayRoutes);
app.use('/api/payments/sslcpay', paymentsslcPayRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/banners',bannerRouters);
app.use('/api/contracts',contractRouters);
app.use('/api/homepages',homepageRouters);


app.use(express.static(path.join(__dirname,'../clients/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../clients/build/index.html'))
})

module.exports = app;