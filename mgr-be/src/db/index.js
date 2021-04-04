const mongoose = require('mongoose');
//哪个数据库的哪个集合的什么格式的文档

//Schema 映射了MongoDB下的一个集合，并且他的neritic就是集合下的文档组成
//Modal 可以理解为根据schema生成的一套方法，用这套方法来操作MongoDB集合和集合下的文档

const UserSchema = new mongoose.Schema({
    nickname:String,
    password:String,
    age:Number,
});

const UserModal = mongoose.model('User',UserSchema);

const connect = ()=>{
    //去连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

    //数据库被打开时候做一些事情
    mongoose.connection.on('open',()=>{
        console.log('连接成功');
        //创建文档
        const user = new UserModal({
            nickname:"小红",
            password:"123456",
            age:12,
        });

        user.age = 99;
        //保存，同步到MongoDB
        user.save();
    });
}

connect();