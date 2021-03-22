import Vue from 'vue'
import {
  Button,
  Form, FormItem, Input, Message, Container,
  Header, Aside, Main, Menu, Submenu,
  MenuItemGroup, MenuItem, Table, TableColumn,
  Breadcrumb, BreadcrumbItem, Card, Row, Col, Switch, Tooltip,
  Avatar, Dialog, Radio, DatePicker, Tag, MessageBox, Pagination, Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Avatar)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Loading)
Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
