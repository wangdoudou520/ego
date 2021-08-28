import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLanguage from './enLanguage' //英文
import znLanguage from './znLanguage'//中文
//element-ui布局国际化
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

//使用翻译语言
const messages = {
    zn: {
        ...znLanguage,
        ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
    },
    en: {
       ...enLanguage,
       ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zn', // 设置地区
    messages, // 设置地区信息
})

//配置element支持vuei18n 
Element.i18n((key, value) => i18n.t(key, value))

export default i18n