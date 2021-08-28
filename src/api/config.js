/**
 * 请求路径
 */

const http={
   host:'http://localhost:3434',
   login:'/login',//登录请求
   register:'/register',//注册接口
   projectList:'/projectList',//表格数据
   search:'/search',//查询列表
   selectCategory:'/backend/itemCategory/selectItemCategoryByParentId',//类目选择 
   uploadImg:'/upload',//图片加载
   shopAdd:'/backend/item/insertTbItem',//商品添加
   shopDelete:'/backend/item/deleteItemById',//商品删除
   batchDelete:'/batchDelete',//批量删除
   modifyShop:'/backend/item/updateTbItem',//修改编辑商品
   paramsData:'/backend/itemParam/selectItemParamAll',//规格参数列表数据
   paramsAdd:'/backend/itemParam/insertItemParam',//规格参数添加
   modifyParams:'/update/category',//修改规格参数
   deleteParams:'/params/delete',//删除参数
   searchParams:'/params/search',//参数模糊查询
   returnShow:'/category/data',//参数回显
   advertTreeList:'/content/selectContentCategoryByParentId',//广告树
}

export default http