const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pateriyaaashish255@gmail.com",
        pass:"sheymiohdhjffits"
    },
})
const mailOptions = {
    from: "pateriyaaashish255@gmail.com",
    to:"sandhyaprajapat07@gmail.com,ravikhamla99@gmail.com",
    subject: "Hye this is test mail",
    text: "hye this is body part",
}
module.exports ={
    transporter,
    mailOptions
}