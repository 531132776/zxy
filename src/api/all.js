import getData from "./getData.js";


export default {
    //车信息
    carBrand(data = {}) {
        return getData('/brand/getList', data)
    },
    //新增车辆信息
    insertBrand(data = {}) {
        return getData('/brand/insertBrand', data)
    },
    //上传图片
    ueditorImg(data = {}) {
        return getData('/ueditor/uploadimage', data)
    },
    //删除车辆品牌
    deleteBrand(data = {}) {
        return getData('/brand/deleteBrand', data)
    },
    //更新车辆品牌
    updateBrand(data = {}) {
        return getData('/brand/updateBrand', data)
    },


    //用户登录
    loginSystem(data = {}) {
        return getData('/user/login', data)
    },
    //用户注册
    adduser(data = {}) {
        return getData('/user/addUser', data)
    },
    //用户信息
    finduser(data = {}) {
        return getData('/user/findUser', data)
    },
    //用户退出
    logout(data = {}) {
        return getData('/user/logout', data)
    },
    //添加项目
    addproject(data = {}) {
        return getData('/project/addProject', data)
    },
    //查找项目
    findProject(data = {}) {
        return getData('/project/findProjectList', data)
    },

    //新增密钥
    addSecretValue(data = {}) {
        return getData('/project/addSecretValue', data)
    },
    //查找secret
    findProjectSecret(data = {}) {
        return getData('/project/findProjectSecret', data)
    },
    //查找密钥列表
    findProjectList(data = {}) {
        return getData('/project/findProjectList', data)
    },
    //删除Secret
    deleteSecret(data = {}) {
        return getData('/project/deleteSecret', data)
    },
    //上传图片
    upload(data = {}) {
        return getData('/ai/uploadAndRecognizeHumanFace', data)
    },
}