$(document).ready(function(){ 
    console.log("小熊猫：1020529941@qq.com");
    
    $("#addDoucument").on('click',function(){
        $("#addDoucument-modal").modal('show')
    });
    // 提交创建表单
    $("#createDoucumentSubmit").on("click",()=>{

        let form = {};
        form.doucumentName = $("#doucumentName").val();
        $.post("/createDoucument",form).then((res)=>{
            if(res.success){
                // 关闭窗口 
                $("#addDoucument-modal").modal('hide')
                window.location.reload()
            }else{
                alert(res.message);
            }
        })
    });

     // 删除相册modail
    $(".deleteDoucument").on('click',function(){
        $("#deleteDoucument-modal").modal('show')
    });

    // 点击删除相册
    $("#deleteDoucumentSubmit").on("click",function(){

        let delDocument =   $("[name='delDoucument'] option:selected").val();
        var mymessage=confirm("你确定删除【"+delDocument+"】相册吗?");
        if(mymessage==true)
        {   
            let form = {};
            form.doucumentName = delDocument;
            $.post("/deleteDoucument/"+form.doucumentName).then((res)=>{
                if(res.success){
                    // 关闭窗口 
                    $("#deleteDoucument-modal").modal('hide')
                    window.location.reload()
                }else{
                    alert(res.message);
                }
            })
            
        }
       

    })
})

