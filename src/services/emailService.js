require("dotenv").config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let contentHtml;
    let subject;

    if (data.language === 'vi') {
        subject = 'Xác thực bệnh nhân đặt lịch khám bệnh';
        contentHtml = `
            <h1>Email doctor ${data.emailDoctor}</h1>
            <h3>Xin chào ${data.patientName}</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
            <p>Thông tin chi tiết đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${data.time}</b></div>
            <div><b>Bác sĩ: ${data.doctorName}</b></div>
            <p>Nếu các thông tin trên là đúng, vui lòng click vào đường link
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh
            <a href=${data.linkRedirect} target="_blank">Xác nhận</a> (Link này chỉ xác nhận được 1 lần)
            </p>
            <div>
            Xin chân thành cảm ơn
            </div>
        `
    } else {
        subject = 'Verify patient booking appointment';
        contentHtml = `
        <h1>Email doctor ${data.emailDoctor}</h1> 
        <h3>Hello ${data.patientName}</h3> 
        <p>You received this email because you booked an online medical appointment on BookingCare</p> 
        <p>Details to book a medical appointment:</p> 
        <div><b>Time: ${data.time}</b></div> 
        <div><b>Doctor: ${data.doctorName}</b></div> 
        <p>If the above information is correct, please click on the link to confirm and complete the medical appointment booking procedure
         <a href= ${data.linkRedirect} target="_blank">Confirm</a> (This link can only be verified once)
        </p> 
        <div> Sincerely thank </div>
        `
    }


    await transporter.sendMail({
        from: `"Center BookingCare" <trinhhuynh2304@gmail.com>`, // sender address
        to: data.receiverEmail, // E-mail recipients
        subject: subject,
        html: contentHtml,
    });





}

let sendEmailFromDoctor = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    let subject = 'Hoàn tất khám bệnh';
    let contentHtml = `

    <h1>Cảm ơn ${data.fullName} đã sử dụng dịch vụ của chúng tôi</h1> 
    <h3>Ảnh hóa đơn từ bác sĩ</h3>

    `


    await transporter.sendMail({
        from: `"Center BookingCare" <trinhhuynh2304@gmail.com>`, // sender address
        to: data.emailPatient, // E-mail recipients
        subject: subject,
        html: contentHtml,
        attachments: [{
            filename: 'image.png',
            encoding: 'base64',
            content: data.path.split("base64,")[1],
        }]
    });

}



module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendEmailFromDoctor: sendEmailFromDoctor
}