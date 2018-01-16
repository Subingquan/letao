/**
 * Created by Administrator on 2018/1/13.
 */
//公共代码部分

$(function () {

  NProgress.configure({ showSpinner: false }); //关闭进度环

  $(document).ajaxStart(function () {

    //使用进度条插件
    // 在发送ajax请求之前，开启进度条  ajax结束后，关闭进度条
    NProgress.start();
  });

  $(document).ajaxStop(function () {
    //本地接口  加了一个延时
    setTimeout(function () {
        NProgress.done();
    },1000);
  });


  //在非登录页面发送ajax请求，询问用户是否登录，如果没登录，跳转到登录页面
  if(location.href.indexOf("login.html") == -1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function (info) {
        if(info.error == 400){
          //说明没有登录
          location.href = "login.html";
        }
      }
    })
  }


  //二级菜单显示隐藏功能
  $(".second").prev().on("click", function () {
      //让a后面的second
    $(this).next().slideToggle();
  })


  //侧边栏显示隐藏
  $(".icon_menu").on("click", function () {
      //让侧边栏隐藏
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
    $(".lt_header").toggleClass("now");
  })


  //退出功能
  $(".icon_logout").on("click", function () {

    //让模态框显示
    $("#logoutModal").modal("show");

  });

  //给btn_logout注册点击事件，避免在事件里面注册点击事件
  $(".btn_logout").on("click", function () {
    //console.log("呵呵");
    //需要发送ajax请求
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function (info) {
        if(info.success) {
          //跳转到登录页面
          location.href = "login.html";
        }
      }
    });


  })








});