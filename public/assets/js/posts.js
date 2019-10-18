$.ajax({
    type: 'get',
    url: '/posts',
    success: function (res) {
        var html = template('postsTpl', res);
        // console.log(html);
        $('#postsBox').html(html);
        //分页功能
        var page=template('pageTpl',res);
        $('#page').html(page);
    }
})
//处理日期时间格式
function dateFormat(date) {
    //将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}

//分页
function changePage (page){
    //向服务器发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data:{page:page},
        success: function (res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            //分页功能
            var page = template('pageTpl',res);
            $('#page').html(page);
            console.log(page);
            
        }
    })
}
//获取并渲染分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        // console.log(res);
        var html= template('categoryTpl',{data:res});
        $('#categoryBox').html(html)
    }
})
$('#filterForm').on('submit',function(){
    //收集表单数据 
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(res){
            var html = template('postsTpl',res);
            console.log(html);
            
            $('#postsBox').html(html)
            var  page = template('pageTpl',res);
            $('.pagination').html(page);
        }
    })
    return false;
})