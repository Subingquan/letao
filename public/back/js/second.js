/**
 * Created by Administrator on 2018/1/15.
 */
$(function () {

  var page = 1;
  var pageSize = 5;
  //1. 分页渲染
  //1.1 定义一个函数render
  var render = function () {
    //1.2 发送ajax请求，通过模板引擎渲染出来
    //1.3 渲染分页
    $.ajax({
      type:'get',
      url:"/category/querySecondCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
        //通过模板引擎渲染出来
        console.log(info);
        $("tbody").html( template("tpl", info) );

        //渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,p) {
             //修改page的值，重新渲染
            page = p;
            render()
          }
        })
      }
    })
  };

  render();

});