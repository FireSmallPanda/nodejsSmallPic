let file = require("../models/file")
let formidable = require('formidable')
let util = require('util');
let path = require("path");

let fs = require('fs');
let sd = require('silly-datetime');
exports.showIndex = (req,res)=>{
    let content = {}
    // 相册
     file.getAllPictrues((pictures)=>{
        content.pictures =pictures
        res.render("index",content)
    })
    
}



// 显示相册
exports.showPictrue = (req,res)=>{
    //遍历相册中的图片
    let content = {}
    file.getAllImagesByDocName(req.params.pictrueName,(err,images)=>{
        if(err){
            res.send(err);
            return
        }
        content.pictrueName = req.params.pictrueName;
        content.images = images
        
        res.render("pictrues",content)
    })


    
    // res.send("显示"+req.params.picNo+"的相册")


}


// 显示上传
exports.showUp = (req,res)=>{
    let content = {}
    file.getAllPictrues((pictures)=>{
        content.pictures =pictures
        content.picMessage = ""
        res.render("up",content)
    })
    // res.send("显示"+req.params.picNo+"的相册")
}
// 上传文件
exports.doUpload = (req,res)=>{
    let that = this;
    // parse a file upload
    let form = new formidable.IncomingForm();
    //    Creates a new incoming form.
    form.encoding = 'utf-8';
    // If you want the files written to form.uploadDir to include the extensions of the original files, set this property to true
    form.type = false;

    form.uploadDir = path.normalize( __dirname+ "./../uploads/tempUp");
    form.parse(req, (err, fields, files,next)=> {
        if(err){
            throw err
        }
        let oldPath =  files.pic.path;
        // 判断尺寸
        let size = files.pic.size;
        console.log(size);
        if(size>1024000){ // 图片不可大于1M
            // res.JSON("图片不可大于2M");
            // 删除文件
            fs.unlink(oldPath)
            // 返回页面
            let content = {}
            file.getAllPictrues((pictures)=>{
                content.pictures =pictures
                content.picMessage = "文件不得大于1M"
                res.render("up",content)
            })
            return
        }
         // 改名
           // 随机日期 
           let date = sd.format(new Date(), 'YYYYMMDDHHmmss');
           // 随机数
           let ran = parseInt(Math.random()*89999+10000);
           // 拓展名
           let extname = path.extname(files.pic.name);
           console.log(files.pic.path);
           // 新路径
           let newPath = __dirname +"./../uploads/" +fields.doucument+"/"+ date+ran+extname;
           // 执行改名
           fs.rename(oldPath,newPath,(err)=>{
               if(err){
                    throw err
               }
               that.showUp(req,res);
           });
    });
}
// 创建文件夹
exports.createDoucument = (req,res)=>{
    let douName = req.body.doucumentName;
    let path =  __dirname+ "./../uploads/" + douName;
    file.mkdir(path,(retn)=>{
        
        res.send(retn);
        res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
    });
    
}
// 删除文件夹
exports.deleteDoucument = (req,res)=>{
    let douName = req.params.doucumentName;
    let path =  __dirname+ "./../uploads/" + douName;
    console.log(douName);
    file.deldir(path,(retn)=>{
     //    res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"})
        res.send(retn);
       
    });
    
}


// 错误页面
exports.showErr = (req,res)=>{
    res.render("err")    
}