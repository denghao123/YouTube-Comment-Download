# YouTube Comment Download 油管评论下载器

## 简介
《油管评论下载器》是从《油管评论翻译机》项目独立出来的功能，更专注于评论的导出和分析。经过几个月的功能迭代，目前已经趋于成熟。故将后端核心代码(获取YouTube视频信息、无限制获取YouTube评论等)开源。

## 项目地址

[官方网站][1]

[演示地址][2]


## 主要功能

### 一、数据查看及过滤

1:1还原YouTube评论区内容和风格，中国大陆地区同样可用。保留了官方自带排序，新增了多种过滤方式。

![油管评论下载器][6]


### 二、导出评论

评论可直接导出到excel文件，包括对评论的回复均可导出。包含评论人姓名、被评论人姓名、评论内容、评论人主页地址、获赞数、回复数、评论时间等信息。

![油管评论下载器][3]


### 三、统计分析

对评论数据进行多维度的分析和排名，并以图表直观展现。

![油管评论下载器][4]


## 代码介绍

### 技术构成

Node.js + express + googleapis

### 运行：

```
yarn
yarn server-dev  //开发环境， 生产环境：yarn server
```

### 访问地址：

http://localhost:81/api/getYtVideoInfo

http://localhost:81/api/getYtComments


### 代码运行结果：

![油管评论下载器][7]

### 注意事项

需要自行申请google开发者key


  [1]: https://www.waiping.net/youtube-comment-download/index.html
  [2]: https://www.waiping.net/lab/youtube-comment-download
  [3]: https://s2.loli.net/2022/08/25/cAX6uJxTMsyVtIn.jpg
  [4]: https://s2.loli.net/2022/08/25/as94PrLmlZezGVX.jpg
  [5]: https://s2.loli.net/2022/08/25/yWT7HvJ4NZMrfDi.jpg
  [6]: https://s2.loli.net/2022/08/25/nfd7iHRhgNbKwQo.jpg
  [7]: https://s2.loli.net/2022/08/25/xgnbe6yCfq21RiD.jpg