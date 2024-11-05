const nodemailer = require('nodemailer');
exports.sendMailMethod=async(option)=>{
  try{
    ///test perpas
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5f5eb62938dafa",
          pass: "6eabee1aae340e"
        }
      });
    ///real email validation
    // var transport = nodemailer.createTransport({
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: '',//YOUR-GMAIL-ADDRESS
    //       pass: ''//THE-GOOGLE-APP-PASSWORD
    //     },
    //   });
      const mailOption = {
        from:"5f5eb62938dafa",//reql time use //YOUR-GMAIL-ADDRESS
        to:option.email,
        subject:option.subject,
        html: '<p>Click <a href="'+ option.url +'' + option.message + '">here</a> email verified link</p>'
      }

      transport.sendMail(mailOption,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
      })
  }
  catch(err){
    return option.res.status(400).json({
        success:false,
        message:err
    });
  }
}