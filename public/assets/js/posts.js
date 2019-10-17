$.ajax({
    type:'get',
    url:'/posts',
    success:function(res){
        var html =template('postsTpl',res);
        // console.log(html);
        $('#postsBox').html(html)
        
    }
})

function dateFormat(date){
    date = new Date(date);
    return date.getFullyear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';

}
