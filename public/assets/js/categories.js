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

//编辑功能  为 编辑按钮添加点击事件
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
//通过事件委托为编辑按钮添加点击事件 在事件处理函数中获取到要修改的分类数据id
// 根据id调用接口 获取分类数据的详细信息
//利用模板引擎将分类数据和HTML字符串拼接 拼接完成后将内容渲染到页面中
// 为修改按钮添加点击事件 在事件处理函数中获取到管理员在表单中输入的内容
//调用修改分类数据接口 实现分类数据修改功能
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