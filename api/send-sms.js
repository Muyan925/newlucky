// api/send-sms.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
    const { to, body } = req.body;

    try {
        const message = await client.messages.create({
            body: body,
            from: '+447700159578', // 请替换为您的 Twilio 电话号码
            to: to
        });
        console.log('消息已发送:', message.sid);
        res.status(200).json({ message: '短信发送成功！' });
    } catch (error) {
        console.error('发送消息错误:', error);
        res.status(500).json({ message: '发送消息失败！' });
    }
}
