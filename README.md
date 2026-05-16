# CET 词根背诵

四六级英语词根词缀背诵工具。通过词根高效记忆英语单词。

## 功能

- **80+ 词根/词缀**，涵盖 1000+ 个四六级单词
- **按级别筛选**：CET-4 / CET-6
- **按类别浏览**：动作、思维、感官、交流等
- **搜索**：支持词根、单词、中文释义搜索
- **收藏单词**：标记重点单词，数据保存在本地
- **闪卡模式**：单词翻转背诵，支持随机顺序
- **响应式设计**：移动端和桌面端均可使用

## 部署到 GitHub Pages

1. 在 GitHub 上创建一个新仓库

2. 在本地项目目录初始化 Git 并推送：

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

3. 在 GitHub 仓库页面：
   - 点击 **Settings** → **Pages**
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **main**，目录选择 **/(root)**
   - 点击 **Save**

4. 等待几分钟，你的站点将在 `https://你的用户名.github.io/仓库名/` 上线

## 本地使用

直接用浏览器打开 `index.html` 即可使用，无需任何构建工具。

## 项目结构

```
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── data-1.js       # 词根数据 Part 1
│   ├── data-2.js       # 词根数据 Part 2
│   ├── data-3.js       # 词根数据 Part 3
│   ├── data.js         # 数据合并 + 统计
│   └── app.js          # 应用逻辑
├── .gitignore
└── README.md
```

## 技术栈

- 纯 HTML / CSS / JavaScript
- 无外部依赖，无需构建工具
- 数据存储在 localStorage
