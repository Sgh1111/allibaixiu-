$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html = template('categoryTpl',{data:res});
        $('#category').html(html);
    }
})


//图片上传功能
$('#feature').on('change',function(){
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res);
            $('.thumbnail').attr('src',res[0].avatar).show()
            $('#thumbnail').val(res[0].avatar)
            
        }

    })
})

// 退出再登录
$('#addForm').on('submit',function(res){
    console.log(res);
    
    //收集表单数据
    $.ajax({
        type:'post',
        url:'/posts',
        data:$(this).seriazlize(),
        success:function(res){
            //添加成功后 跳转到后台文章列表页
            location.href='posts.html'
        }
    })
    return false;
})