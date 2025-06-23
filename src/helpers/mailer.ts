import nodemailer from 'nodemailer';

import User from '@/models/userModels';
import bcrypt from 'bcryptjs';

export const sendemail = async ({ email,emailType,userId}:any)=>{

   

    try {
        const hashed = await bcrypt.hash(userId.toString(), 10);
        console.log('Hashed userId:', hashed);
       if (emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId, { verifyToken: hashed, verifyTokenExpiry: Date.now() + 3600000 },{new:true});
       } else if (emailType === "FORGOT_PASSWORD") {
          await User.findByIdAndUpdate(userId, { forgotpasswordToken: hashed, forgotpasswordTokenExpiry: Date.now() + 3600000 },{new:true});
       }
       var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "06b1aa108a67e0",
    pass: "****9936"
  }
});
    const mailoptions = {
  from: "konkalokesh372@gmail.com",
  to: email,
  subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
  text: emailType === "VERIFY"
    ? `Please verify your email by clicking on the following link: ${process.env.FRONTEND_URL}/verify?token=${hashed}`
    : `To reset your password, click the following link: ${process.env.FRONTEND_URL}/reset-password?token=${hashed}`
};
const mailresponse = await transport.sendMail(mailoptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}






