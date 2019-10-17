$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html = template('categoriesTpl',{data:res});
        $('#categoryBox').html(html)
    }
})


//添加分类
$('#addCategory').on('submit',function(){
    $.ajax({
        type:'post',
        url:'/categories',
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
    return false;
})

//编辑功能
$('#categoryBox').on('click','.edit',function(){
    //获取html页面中模板中的编辑id
    var id =$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
            // console.log(res); 
            var html = template('modifyCategoryTpl',res);
            $('#modifyBox').html(html)
        }
    })
})

//修改功能
$('#modifyBox').on('submit','#modifyCategory',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
    return false;
})