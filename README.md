# 项目介绍

项目学习自GitHub上20.4k Star的开源项目 [Chanzhaoyu/chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web)

原项目使用的是Naive UI组件库,在学习过程中将其使用Element Plus组件库重构界面

**项目截图**
![首页](https://github.com/righthan/chatgpt-web/blob/main/docs/homepage.png)
![设置页](https://github.com/righthan/chatgpt-web/blob/main/docs/settings.png)

## 项目启动
项目使用vite构建，运行方式如下
```
npm install 
```

```
npm run dev
```

## 技术点介绍

项目主要使用到的技术:Vue3+TypeScript+Element Plus+Tailwind CSS

除了新学并运用许多新的Element组件外，还学到了Tailwind CSS，封装对话显示组件，路由切换对话，Pinia处理数据，对话数据本地存储，对话内容导出为图片，界面多语言切换等内容。

下面是对印象深刻的技术的简要总结

* Tailwind CSS的使用

​		刚开始十分疑惑，因为看到整个项目中竟然没有多少CSS代码，只有各种class名，在初步学习并使用Tailwind CSS后，对其官网上的“无需离开您的HTML，即可快速建立现代网站”感触颇深，Taiwind CSS的几个好处显而易见------不用纠结起什么类名，无需在html和CSS样式的标签中来回切换。但也有些小问题，例如Element Plus的按钮组件有些样式冲突，导致无法显示背景色，但通过查找教程最终还是解决了。

* 对话显示组件的封装

​		主要是将一个Message组件分解为头像组件（Avatar.vue），文本组件(Text.vue)并用index.vue将各组件组合起来，对话内容使用props从父组件传入，十分方便。另外值得一提的就是对问与答的样式控制，两者的样式是相反的，需根据记录的对话数据中的标志，动态绑定类名。

* 路由切换对话

​		主要涉及到 `RouterView`与v-slot 插槽结合，实现动态导入对话组件。主要逻辑是：使用创建时间作为每个对话的uuid，在切换对话时改变store中处于选中状态的uuid，然后router.replace()响应式替换路由，在显示对话的组件中，根据选中的uuid获取对话并展示。

* Pina处理数据

   	将处理的数据拆分的4个模块（app，chat， setting，user）,在使用上感觉比vuex简便，简要了解了两者的差别和推荐的使用场景。

* 对话本地存储

​		主要是创建一个处理本地存储的TypeScript文件，主要用到 `window.localStorage.setItem`和 `window.localStorage.getItem`,直接将数据存储在浏览器中，还支持使用crypto库对数据加密存储（但只实现了存储...）

* 对话导出为图片

​		这个比较简单，利用了 `html2canvas` 库

* 多语言切换

​      使用到i18n切换简体中文，繁体中文及英文，使用时的主要问题是切换时只是当前页面切换了语言，其他页面需要刷新才能切换，查询文档学会了 `el-config-provider`的使用，完美解决问题

## 其他

由于时间仓促，还未实现如移动端适配，主题切换等功能。