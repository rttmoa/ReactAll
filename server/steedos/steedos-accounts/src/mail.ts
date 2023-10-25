import * as nodemailer from 'nodemailer';
import { getSteedosConfig } from '@steedos/objectql';




// ? 发送邮件；https://blog.csdn.net/sinat_27798375/article/details/127911855

export const sendMail = async ({ from, subject, to, text, html }) => {
    console.log("Sending mail to: " + to)
    console.log("Subject: " + subject)
    console.log("Body: " + text)

    // !在 steedos-config.yml 中配置 datasource、tenant、email、password、accounts、sms 等等配置信息
    // !获取配置信息后，去 163, 腾讯 发送邮件
    const config = getSteedosConfig().email
    if (!config) {
        console.log("Please set email configs in steedos-config.yml")
        return
    }
    if (!config.from) {
        console.log("Please set email configs in steedos-config.yml")
        return
    }
    if (!config.url && (!config.host || !config.port || !config.username || !config.password)) {
        console.log("Please set email configs in steedos-config.yml")
        return
    }

    const transporterOptions = config.url ? config.url : {
        host: config.host,
        port: config.port,
        secure: config.secure, // true for 465, false for other ports
        auth: {
            user: config.username, // generated ethereal user
            pass: config.password // generated ethereal password
        }
    }
    let transporter = nodemailer.createTransport( transporterOptions );

    // 使用定义的传输对象发送邮件
    let info = await transporter.sendMail({
        from: config.from,
        to: to,
        subject: subject,
        text: text,
        html: html
    }); 

    console.log('Message sent: %s', info.messageId);
}