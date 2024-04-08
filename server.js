import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';

const app = express();
const port = process.env.PORT || 3000;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// 根据环境变量创建 Twilio 客户端
const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 设置允许跨域请求的中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有域的请求
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 允许的HTTP方法
  next();
});

// 根路由
app.get('/', (req, res) => {
  res.send('你好世界！');
});

// 发送短信路由
app.post('/send-sms', (req, res) => {
  // 使用 Twilio 客户端发送短信
  client.messages
    .create({
      ...req.body
    })
    .then(message => {
      console.log('消息已发送:', message.sid);
      res.send('短信发送成功！');
    })
    .catch(error => {
      console.error('发送消息错误:', error);
      res.status(500).send('发送消息失败！');
    });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器正在运行于端口 ${port}`);
});
