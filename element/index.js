// 导入自己需要的组件
// import "element-ui/packages/theme-chalk/lib/base.css";
// import "element-ui/packages/theme-chalk/lib/icon.css";
// import "element-ui/packages/theme-chalk/lib/select.css";
// import "element-ui/packages/theme-chalk/lib/option.css";
// import "element-ui/packages/theme-chalk/lib/option-group.css";
// import "element-ui/packages/theme-chalk/lib/button.css";
// import "element-ui/packages/theme-chalk/lib/radio.css";
// import "element-ui/packages/theme-chalk/lib/dialog.css";
// import "element-ui/packages/theme-chalk/lib/upload.css";
// import "element-ui/packages/theme-chalk/lib/slider.css";
// import "element-ui/packages/theme-chalk/lib/color-picker.css";
// import "element-ui/packages/theme-chalk/lib/cascader.css";
// import "element-ui/packages/theme-chalk/lib/input.css";
// import "element-ui/packages/theme-chalk/lib/table.css";
// import "element-ui/packages/theme-chalk/lib/table-column.css";
// import "element-ui/packages/theme-chalk/lib/pagination.css";
// import "element-ui/packages/theme-chalk/lib/tree.css";
// import "element-ui/packages/theme-chalk/lib/switch.css";


import Icon from 'element-ui/lib/icon';
import select from 'element-ui/lib/select';
import option from 'element-ui/lib/option';
import optionGroup from 'element-ui/lib/option-group';
import button from 'element-ui/lib/button';
import radio from 'element-ui/lib/radio';
// import dialog from 'element-ui/lib/dialog';
// import upload from 'element-ui/lib/upload';
import slider from 'element-ui/lib/slider';
import colorPicker from 'element-ui/lib/color-picker';
import cascader from 'element-ui/lib/cascader';
import input from 'element-ui/lib/input';
import table from 'element-ui/lib/table';
import tableColumn from 'element-ui/lib/table-column';
import pagination from 'element-ui/lib/pagination';
import tree from 'element-ui/lib/tree';
// import switch from 'element-ui/lib/switch';
const element = {
  install: function (Vue) {
    Vue.use(select)
    Vue.use(option)
    Vue.use(optionGroup)
    Vue.use(Icon)
    Vue.use(button)
    Vue.use(radio)
    // Vue.use(dialog)
    // Vue.use(upload)
    Vue.use(slider)
    Vue.use(colorPicker)
    Vue.use(cascader)
    Vue.use(input)
    Vue.use(table)
    Vue.use(tableColumn)
    Vue.use(pagination)
    Vue.use(tree)
    // Vue.use(switch)
  }
}
import './element-variables.scss'
export default element
