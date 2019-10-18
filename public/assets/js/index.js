//获取文章的数量
$.ajax({
    type:'get',
    url:'/post/count',
    success:function(res){
        $('#postsBox').html(`<strong>${res.postCount}</strong>篇文章(</strong>)`)
    }
})