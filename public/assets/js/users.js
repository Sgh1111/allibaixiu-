//ajax数据
//向服务器端发送请求  索要用户列表数据
$.ajax({
  type: 'get',
  url: '/users',
  success: function (res) {
    console.log(res);
    // template('userTpl',{data:res})
    //使用模板引擎将数据和HTML字符进行拼接
    var html = template('usersTpl', { data: res })      //模板引擎对应的user.html 141行{{each data}}
    // console.log(html);
    //将拼接好的字符串显示在页面中
    $('#usersBox').html(html);
  }
})



// 表单提交  添加用户
$('#userForm').on('submit', function () {
  //serialize是jq提供的方法可以自动获取用户在表单输入的内容，并把内容参数格式化成参数字符串
  var formData = $(this).serialize();
  //向服务器端发送添加用户的请求
  $.ajax({
    type: 'post',
    url: '/users',
    data: formData,
    success: function (res) {
      // console.log(res); 
      //刷新当前页面 重新执行
      location.reload();
      //如果不这样写 还可以自己拼接  
    },
    error: function () {
      alert('用户添加失败')
    }
  })
  // console.log(formData);
  //阻止表单的默认提交行为
  return false;//防止默认触发行为（提交事件） 兼容性最强
})





//头像上传
//1.为文件选择控件添加onchange 事件 在事件处理函数中获取到用户选择到的文件
//2. 创建formData对象用于实现图片文件上传
//3.调用图片文件上传接口 实现图片上传
//4. 在添加新用户表单中新增一个隐藏域 将图片地址存储在隐藏域中
//当用户选择文件的时候
// $('#avatar').on('change',function(){ 
$('#modifyBox').on('change', '#avatar', function () {   //本来是上面的代码，由于后面的图片修改 本行改成了事件委托
  //用户选择到的文件   this.files[0]
  var fd = new FormData();
  //添加头像    append里面的第一个参数是键(key) 第二个是值(value) 这里指的就是图片地址
  //append方法会保留相同的两个属性值(后台管理器network可以看到)但是只显示最后一个  
  //set方法建立添加不会保留相同的 会替换原有的
  fd.append('avatar', this.files[0]);
  $.ajax({
    type: 'post',
    url: '/upload',
    data: fd,
    processData: false,  //告诉$ajax方法不要解析请求参数
    contentType: false, //告诉$ajax方法不要设置请求参数的类型
    success: function (res) {
      console.log(res);
      //实现头像预览功能
      $('#preview').attr('src', res[0].avatar)
      //添加隐藏域 users.html 第43行  隐藏域的值就是图片上传的地址
      $('#hiddenImg').val(res[0].avatar)
    }
  })
})

//用户信息修改

//1.通过事件委托的形式为编辑按钮点击添加事件
//2.在事件处理函数中获取到当前点击的用户的id值
//3.根据用户id获取用户的详细信息 并且通过模板引擎将用户的详细信息渲染到左侧的表单中
//4 为用户修改按钮添加点击事件 在事件处理函数中获取到用户在表单中输入的内容
$('#usersBox').on('click', '.edit', function () {
  var id = $(this).attr('data-id'); //attr是获取自定义的属性
  // console.log(id);
  //通过id获取当前这一条要编辑的信息
  $.ajax({
    type: 'get',
    url: '/users/' + id,
    success: function (res) {
      // console.log(res);
      var html = template('modifyTpl', res);
      console.log(html);
      $('#modifyBox').html(html)
    }
  })
})

//用事件委托给修改表单添加事件
$('#modifyBox').on('submit', '#modifyForm', function () {
  // jq当中自动收集表单数据
  console.log($(this).serialize());
  var id = $(this).attr('data-id');
  console.log(id);
  $.ajax({
    //get post put delete
    type: 'put',
    url: '/users/' + id,
    data: $(this).serialize(),
    success: function () {
      location.reload()
    }
  })
  return false;
})


//删除用户
$('#usersBox').on('click', '.del', function () {
  if (confirm('确定删除吗?')) {
    //id值
    var id = $(this).attr('data-id');
    $.ajax({
      type: "delete",
      url: /users/ + id,
      success: function () {
        location.reload();
      }
    })
  }

})

//批量删除功能
$('#checkAll').on('change', function () {
  var bool = $(this).prop('checked');
  //找到tbody下面的所有的 checkbox 给他们添加checked 效果
  var checkList = $('#usersBox input[type="checkbox"]');//jq对象  把tbody中所有的input找到
  //jq 中attr, prop, css,方法 如果有一个参数就是获取 如果有两个参数 就是在设置
  checkList.prop('checked', bool)
  if (bool == true) {
    $('#deleteAll').show();
  } else {
    $('#deleteAll').hide();
  }
})

//全选效果的删除
$('#usersBox').on('change', 'input[type="checkbox"]', function () {
  //只有当tbody中的所有checkbox的数量和所有的打钩的checkbox数量相等 说明是全选
  if ($('#usersBox input[type="checkbox"]').length == $('#usersBox input[type="checkbox"]:checked').length) {
    $('#checkAll').prop('checked', true)
  } else {
    $('#checkAll').prop('checked', false)
  }
  if ($('#usersBox input[type="checkbox"]:checked').length > 0) {
    $('#deteleAll').show();
  } else {
    $('#deteleAll').hide();
  }
})

$('#deleteAll').on('click', function () {
  if (confirm('确定要删除吗')) {
    //选出来所有的打钩的checkbox
    var checkList = $('#usersBox input[type="checkbox"]:checked')
    var str = '';
    checkList.each(function (index, item) {
      console.log(item);
      
      str += $(item).attr('data-id') + '-'
    })
    //截取最后面的-
    //str 用来收集所有的id,用-拼在一起
    str = str.substr(0, str.length - 1)
    console.log(str);
    
    $.ajax({
      type: 'delete',
      url: "/users/" + str,
      success: function () {
        location.reload();
      }
    })
  }


})