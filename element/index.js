// 导入自己需要的组件
import './element-variables.scss'
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
import loading from 'element-ui/lib/loading';
import tree from 'element-ui/lib/tree';
import row from 'element-ui/lib/row';
import col from 'element-ui/lib/col';
import tag from 'element-ui/lib/tag';
import message from 'element-ui/lib/message';
import message_box from 'element-ui/lib/message-box';
import notification from 'element-ui/lib/notification';
// import switch from 'element-ui/lib/switch';


const element = {
	install: function(Vue) {
		Vue.prototype.$notify = notification;
		Vue.prototype.$msgbox = message_box;
		Vue.prototype.$alert = message_box.alert;
		Vue.prototype.$confirm = message_box.confirm;
		Vue.prototype.$prompt = message_box.prompt;
		Vue.prototype.$message = message;
		Vue.use(tag)
		Vue.use(row)
		Vue.use(col)
		Vue.use(loading)
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
