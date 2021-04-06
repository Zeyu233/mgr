require("./Schemas/User");
require("./Schemas/InviteCode");
require("./Schemas/Book");
const mongoose = require('mongoose');


const connect = () => {
    return new Promise((resolve) => {
        //去连接数据库
        mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

        //数据库被打开时候做一些事情
        mongoose.connection.on('open', () => {
            console.log('数据库连接成功');
            resolve();
        });
    })
}
module.exports = {
    connect,
}