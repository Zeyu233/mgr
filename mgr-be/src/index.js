const Koa = require('koa');

const app = new Koa();
//通过app.use 注册中间件
//中间件的本质上就是一个函数，每次访问url就自动调用
//context ctx上下文-当前请求的相关信息都在里面
app.use(
    (context)=>{
        const {request:req} = context;
        const {url} = req;

        if(url==='/user'){
            context.body = "abcsss";

            return;
        }

        context.body = "??";
    }
);

app.listen(3000,()=>{
    console.log('启动成功');
});
