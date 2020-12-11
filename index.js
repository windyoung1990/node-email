const nodemailer = require('nodemailer')
const schedule = require('node-schedule');
const axios = require('axios').default;
let rule = new schedule.RecurrenceRule();
const config = require('./config');
rule.dayOfWeek = [1,2,3,4,5]
rule.hour = 13;
rule.minute = 14;
rule.second = 0;
// rule.second = [0, 10, 20, 30, 40, 50]
const transporter = nodemailer.createTransport({
    service: 'QQ',
    port: 465,
    secureConnection: true,
    auth: {
        user: config.user,
        // 非qq密码，而是设置的smtp密码
        pass: config.pass
    }
});
const mailOptions = {
    from: config.from,
    to: config.to,
    subject: '每日一语',
    text: 'Hello world',
    html: ''
}
function getHoneyWords() {
    var url = "https://chp.shadiao.app/api.php";
    return axios.get(url);
}
let job = schedule.scheduleJob(rule, () => {
    getHoneyWords().then((res) => {
        mailOptions.html = `<h3>${res.data}</h3>`
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + JSON.stringify(info))
        })
    })
})
