let express = require("express")
let app = express()

let router = require(__dirname+"/controller/router")
let bodyParser = require("body-parser");
// https://cnodejs.org/topic/5368adc5cf738dd6090060f2  pug使用教程
app.engine('pug', require('pug').__express)
// 模版采用ejs
app.set("view engine","pug")

// 暴露静态文件
app.use(express.static("./static"));
app.use(express.static("./uploads"));
// 使其可以获取body数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ----------正文--------------
// 主页
app.get("/",router.showIndex);
// 上传文件页面
app.get("/up",router.showUp);
// 上传文件
app.post("/up",router.doUpload);
// 创建文件夹
app.post("/createDoucument",router.createDoucument);
app.post("/deleteDoucument/:doucumentName",router.deleteDoucument);
app.get("/:pictrueName",router.showPictrue);
/*app.get("/",(req,res)=>{

    let content = {
        weather:'阴天',
        news:["要得撒的角色","xiaoxiongmao","我的上帝"]
    }

    res.render("index",content)
});*/
app.use(router.showErr);
app.listen(3000)