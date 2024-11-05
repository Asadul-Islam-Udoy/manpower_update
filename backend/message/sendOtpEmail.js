const nodemailer = require('nodemailer');
exports.sendMailMethod=async(option)=>{
  try{
    ///test perpas
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9c04227de9c95c",
          pass: "c4058952f9608c"
        }
      });
    //real email validation
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
        from:"9c04227de9c95c",//reql time use //YOUR-GMAIL-ADDRESS
        to:option.email,
        subject:option.subject,
        text:option.message
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