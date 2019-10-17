$('#logout').on('click',function(){
    //确认    confirm 执行后返回的是一个布尔值 跟promot类似
    var bool = confirm('确定要退出吗？')
    if(bool){
        $.ajax({
            type:'post',
            url:'/logout',
            success:function(){
                //跳转到首页
                location.href = 'login.html';
            }
        })
    }
})