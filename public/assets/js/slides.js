$.ajax({
    type:'get',
    url:'/slides',
    success:function(res){
        var html = template('slidesTpl',{data:res});
        $('#slidesBox').html(html)  
    }
})

$('#file').on('change',function(){
    //获取当前文件数据二进制的数据
    var fd = new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res);
            var html= template('slidesTpl',res);
            $('#hiddenImage').val(res[0].avatar)
        }
    })
})

//当轮播图表单发生提交行为时
$('#slidesForm').on('submit',function(){
    $.ajax({
        type:'post',
        url:'/slides',
        data:$(this).serialize(),
        success:function(res){
            console.log(res);
            
            location.reload()
        }
    })
    return false;
})

//删除功能
$('#slidesBox').on('click','.delete',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:`/slides/${id}`,
        success:function(){
            location.reload()
        }
    })
})