/**
 * Created by Administrator on 2018/1/15.
 */

$(function () {

  var page = 1; //记录页码
  var pageSize = 5; //每页的条数

  render();


  function render() {
    //1. 发送ajax请求，获取到用户数据
    $.ajax({
      type:"get",
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
        //模板第三步：准备渲染的数据，info就是需要渲染的数据
        console.log(info);
        //模板第四步：让数据和模板进行绑定  template  模板 + 数据 = html的结果
        //第一个参数： 模板的id
        //第二个参数：对象
        //当模板与对象进行绑定之后，模板里面可以直接使用对象所有的属性
        //返回：html结果的字符串
        var result = template("tpl", info);

        //模板第五步：渲染到页面
        $("tbody").html(result);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //设置bootstrap的版本
          currentPage: page, //设置当前页
          totalPages: Math.ceil(info.total/info.size), //设置总页数，根据返回结果的总条数/每页的条数
          numberOfPages: 5,//空间上显示的条数
          onPageClicked:function (a,b,c, p) {
            //让当前页码变成p
            page = p;
            //重新渲染即可
            render();
          }
        });
      }
    })
  }



  //用户启用禁用功能
  //1. 给禁用或者启用注册点击事件，需要注册委托事件
  //2. 弹出模态框
  $("tbody").on("click", ".btn",function () {

    //让模态框显示
    $("#userModal").modal("show");

    //获取到id
    var id = $(this).parent().data("id");
    //获取到是否禁用
    var isDelete = $(this).hasClass("btn-success")? 1 : 0;

    $(".btn_confirm").off().on("click",function () {
      $.ajax({
        type:'post',
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (info) {
          if(info.success) {
            //关闭模态框
            $("#userModal").modal('hide');
            //重新渲染页面
            render();
          }
        }
      })
    })
  });
});