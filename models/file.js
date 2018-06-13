
let fs = require("fs")

// 获取所有图片
exports.getAllPictrues = (callback)=>{
    fs.readdir("./uploads",(err,files)=>{
        let pictrues  = [];
        // 遍历文件夹塞入
        (function iterator(i) {
            if (i ==files.length){
                console.log(pictrues)
                return callback(pictrues)
            }
            fs.stat("./uploads/"+files[i],(err,stats)=>{
                if(stats.isDirectory()) // 判断是否为文件夹 如果是则塞入pictrues
                    pictrues.push(files[i])
                iterator(i+1)
            })
        })(0)
    })
    
}

// 根据文件名获取之下的所有图片
exports.getAllImagesByDocName = (docName,callback)=>{
    fs.readdir("./uploads/"+docName,(err,files)=>{
        if(err){
            callback("没有找到文件夹！",null)
            return;
        }
        let pictrues  = [];
        // 遍历文件夹塞入
        (function iterator(i) {
            if (i ==files.length){
                console.log(pictrues)
                return callback(null,pictrues)
            }
            fs.stat("./uploads/"+docName+"/"+files[i],(err,stats)=>{
             if(stats.isFile) // 判断是否为文件夹 如果是则塞入pictrues
                pictrues.push(files[i])
                iterator(i+1)
            })
        })(0)
    })
    
}

// 创建文件夹
exports.mkdir =  (dirpath,callback)=>{
    let retn = {};
    retn.success = false;
    if (!fs.existsSync(dirpath)) {
        
        fs.mkdirSync(dirpath);
        retn.success = true;
        callback(retn)
    }else{
        retn.message = "相册已存在";
        callback(retn)
    }
} 

// 删除文件夹
exports.deldir =  (dirpath,callback)=>{
    let retn = {};
    retn.success = false;
    console.log(dirpath);    
    if( fs.existsSync(dirpath) ) {
        fs.readdirSync(dirpath).forEach(function(file) {
            var curPath = dirpath + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                this.deldir(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
                
            }
        });
        fs.rmdirSync(dirpath);
        // 正确返回
        retn.success = true;
        callback(retn)
    }else{
        retn.message = "文件夹不存在";
        callback(retn)

    }
} 