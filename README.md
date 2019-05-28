# 安装

1、下载项目文件
git clone git@github.com:LastStartDust/simple-gulp-work-flow.git

2、移除.git目录
进入项目中，找到.git目录进行手动删除

3、安装依赖
```
npm i
```

4、运行
```
gulp
```

5、使用微信小程序开发导入dist目录


# 目录结构

```
.
├── gulpfile.js          // gulp配置文件
├── package.json
├── src                  // 开发目录
│   ├── components           // 组件
│   └── images               // 图片
│   └── libs                 // 第三方包
│   └── templates            // 模板
│   └── utils                // 工具
│   ├── pages                // pages目录
│   ├── app.js               // 入口文件
│   ├── app.json             // 公共设置
│   ├── app.scss             // 公共样式
│   ├── project.config.json  // 项目的编辑器配置
└── dist // 通过src 目录编译后生成的文件目录，也是小程序开发的项目目录
```

# 功能

+ SCSS 实时编译为 WXSS

+ px单位转换为rpx，默认是1px转换为1rpx,具体参考 https://github.com/yingye/postcss-px2units

# 其它命令
## 清除dist目录内容
```
gulp clean
```