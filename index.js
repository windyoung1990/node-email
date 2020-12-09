const nodemailer = require('nodemailer')
const schedule = require('node-schedule');
let rule = new schedule.RecurrenceRule();
const pass = require('./config').pass;
// rule.hour = 0;
// rule.minute = 0;
// rule.second = 0;
rule.second = [0, 10, 20, 30, 40, 50]
const transporter = nodemailer.createTransport({
    service: 'QQ',
    port: 465,
    secureConnection: true,
    auth: {
        user: '1078156801@qq.com',
        // 非qq密码，而是设置的smtp密码
        pass: pass
    }
});
const mailOptions = {
    from: '1078156801@qq.com',
    to: '1078156801@qq.com',
    subject: 'Hello Sir',
    text: 'Hello world',
    html: '<h3>世俗的无奈</h3>'
}
let job = schedule.scheduleJob(rule, () => {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + JSON.stringify(info))
    })
})
