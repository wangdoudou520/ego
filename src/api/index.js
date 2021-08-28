/**
 * 网络请求方法
 */
import axios,{get,post} from '../utils/request'
import http from './config'

const api={

    //登录请求
    getLogin(params){
      return axios.post(http.host+http.login,params)
    },
    
    //注册
    getRegister(params){
      return post(http.host+http.register,params)
    },
    
    //获取表单数据
    getTableData(params){
      return get(http.host+http.projectList,params)
    },

    //查询获取信息
    getSearchInfo(params){
       return axios.get(http.host+http.search,{
         params
       })
    },

    //选择类目
    getSelectCategory(params){
      return get(http.host+http.selectCategory,params)
    },

    //商品添加
    getShopAdd(params){
      return get(http.host+http.shopAdd,params)
    },

    //商品删除
    getShopDelete(params){
      return axios.get(http.host+http.shopDelete,{
        params
      })
    },
    
    //批量删除
    getBatchDelete(params){
      return get(http.host+http.batchDelete,params)
    },

    //修改编辑商品
    getShopModify(params){
      return axios.get(http.host+http.modifyShop,{
           params
      })
    },

    //规格参数列表数据
    getParamsData(params){
      return get(http.host+http.paramsData,params)
    },

    //规格参数添加
    getParamsAdd(params){
      return get(http.host+http.paramsAdd,params)
    },

    //修改规格参数
    getModifyParams(params){
      return get(http.host+http.modifyParams,params)
    },

    //删除参数
    getDeleteParams(params){
      return get(http.host+http.deleteParams,params)
    },

    //参数模糊查询
    getParamsSearchInfo(params){
      return get(http.host+http.searchParams,params)
    },

    //参数回显
    getParamsReturnShow(params){
      return get(http.host+http.returnShow,params)
    },

    //广告树列表
    getAdvertTreeList(params){
      return get(http.host+http.advertTreeList,params)
    }

}

export default api;