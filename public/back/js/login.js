/**
 * Created by Administrator on 2018/1/11.
 */

$(function () {

  //初始化表单校验插件
  var $form= $("form");

  $form.bootstrapValidator({

    //配置校验时的图标,
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{

      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: "用户名不能为空哦！"
          },
          callback: {
            message: "用户名不存在"
          }


        }
      },

      password: {
        validators: {
          //非空校验
          notEmpty: {
            message: "用户密码不能为空哦！"
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在6到12之间"
          },
          //是用于校验失败后，提示的信息
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });



  //需要给表单注册一个校验成功的事件  success.form.bv
  $form.on("success.form.bv", function (e) {

    //阻止浏览器的默认行为
    e.preventDefault();

    //发送ajax
    console.log("嘿嘿嘿");
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data: $form.serialize(),
      success:function (data) {
        //如果成功，就跳转到首页
        if(data.success){
          location.href = "index.html";
        }

        if(data.error === 1000){
          //alert("密码错误")

          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  });

  //重置功能
  $("[type='reset']").on("click", function () {

    //重置样式
    $form.data("bootstrapValidator").resetForm();
  });


});