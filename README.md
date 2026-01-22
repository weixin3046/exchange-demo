### 线上项目预览地址

https://exchange-demo-eight.vercel.app/

### 🚀 快速开始

#### 1. 环境变量设置

复制环境变量文件并配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，设置以下变量：

```env
# Reown AppKit 配置 (必需)
# 从 https://cloud.reown.com/ 获取项目ID
NEXT_PUBLIC_PROJECT_ID=your_project_id_here

# NextAuth.js 配置 (可选，用于邮箱认证)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

# 社交登录配置 (可选)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### 2. Reown AppKit 设置

1. 访问 [Reown Cloud](https://cloud.reown.com/)
2. 创建新项目或使用现有项目
3. 复制项目ID到环境变量
4. 配置允许的域名（开发环境：`http://localhost:3000`）

#### 3. 安装依赖

```bash
yarn install
```

#### 4. 启动开发服务器

```bash
yarn dev
```

访问 http://localhost:3000 查看应用。

### 🔑 认证功能

项目采用现代化的 Web3 钱包连接认证：

#### 钱包连接 (Reown AppKit)

- 支持 MetaMask, WalletConnect, Coinbase Wallet, Rainbow 等主流钱包
- 自动检测已安装的钱包
- 显示连接状态和钱包地址
- 安全的消息签名认证
- 一键连接，无需注册

### 采用了 src 目录

```
/my-next-app
├── public/ # 静态资源
│ ├── images/ # 图片资源
│ ├── icons/ # 图标
│ ├── fonts/ # 字体
│ └── favicon.ico # 网站图标
├── src/
| ├── store/                 # 全局状态管理
| │ ├── globalStore.ts     # 全局状态
| │ ├── authStore.ts       # 认证状态
| │ ├── themeStore.ts      # 主题状态
| │ ├── userStore.ts       # 用户相关状态
│ ├── app/ # Next.js App Router 入口
│ │ ├── layout.tsx # 全局布局
│ │ ├── page.tsx # 主页
│ │ ├── api/ # API 路由（用于处理后端逻辑）
│ │ │ ├── auth/ # 认证 API
│ │ │ ├── user/ # 用户 API
│ │ │ └── route.ts # 统一 API 入口
│ │ ├── dashboard/ # 仪表盘页面
│ │ │ ├── layout.tsx # 仪表盘布局
│ │ │ ├── page.tsx # 仪表盘首页
│ │ │ ├── settings/ # 设置页面
│ │ │ │ ├── page.tsx
│ │ │ │ ├── profile.tsx
│ │ │ │ ├── security.tsx
│ │ │ │ └── notifications.tsx
│ ├── components/ # 可复用组件
│ │ ├── ui/ # UI 组件
│ │ │ ├── Button.tsx
│ │ │ ├── Modal.tsx
│ │ │ ├── Input.tsx
│ │ │ ├── Card.tsx
│ │ │ ├── Dropdown.tsx
│ │ │ └── Table.tsx
│ │ ├── layout/ # 布局相关组件
│ │ │ ├── Navbar.tsx
│ │ │ ├── Sidebar.tsx
│ │ │ ├── Footer.tsx
│ │ │ └── Header.tsx
│ ├── constants/ # 常量（API 路径、默认配置等）
│ │ ├── api.ts # API 相关常量
│ │ ├── routes.ts # 路由常量
│ │ ├── config.ts # 配置项
│ │ └── messages.ts # 文本信息
│ ├── hooks/ # 自定义 hooks
│ │ ├── useAuth.ts # 认证相关 hook
│ │ ├── useTheme.ts # 主题切换 hook
│ │ ├── useFetch.ts # 数据请求 hook
│ │ ├── useDebounce.ts # 防抖 hook
│ │ └── useLocalStorage.ts # 本地存储 hook
│ ├── lib/ # 库函数（封装 fetch、数据库、验证等）
│ │ ├── auth.ts # 认证相关
│ │ ├── db.ts # 数据库连接
│ │ ├── fetcher.ts # 封装 fetch
│ │ ├── axiosInstance.ts # Axios 请求拦截器（推荐）
│ │ ├── validation.ts # 数据验证
│ │ ├── logger.ts # 日志记录
│ │ ├── cache.ts # 缓存处理
│ ├── utils/ # 工具函数
│ │ ├── formatDate.ts # 时间格式化
│ │ ├── parseQuery.ts # 解析 URL 查询参数
│ │ ├── helpers.ts # 通用工具函数
│ │ ├── math.ts # 数学计算
│ │ ├── storage.ts # localStorage 封装
│ ├── styles/ # 样式（Tailwind 或 SCSS）
│ │ ├── globals.css # 全局样式
│ │ ├── variables.css # CSS 变量
│ │ ├── theme.css # 主题样式
│ ├── types/ # TypeScript 类型
│ │ ├── index.ts # 全局类型
│ │ ├── auth.ts # 认证相关类型
│ │ ├── user.ts # 用户类型
│ │ ├── api.ts # API 相关类型
│ │ ├── ui.ts # UI 组件类型
│ ├── middleware.ts # 中间件（如身份验证、重定向）
├── .env # 环境变量
├── .gitignore # Git 忽略文件
├── next.config.js # Next.js 配置
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json # TypeScript 配置
├── package.json # 依赖管理
└── README.md # 项目说明
```

### 没有 src 目录

```
/my-next-app
├── store/                 # 全局状态管理
│ ├── globalStore.ts     # 全局状态
│ ├── authStore.ts       # 认证状态
│ ├── themeStore.ts      # 主题状态
│ ├── userStore.ts       # 用户相关状态
├── public/ # 静态资源
│ ├── images/ # 图片资源
│ ├── icons/ # 图标
│ ├── fonts/ # 字体
│ └── favicon.ico # 网站图标
├── app/ # Next.js App Router 入口
│ ├── layout.tsx # 全局布局
│ ├── page.tsx # 主页
│ ├── api/ # API 路由
│ │ ├── auth/ # 认证 API
│ │ ├── user/ # 用户 API
│ │ └── route.ts # 统一 API 入口
│ ├── dashboard/ # 仪表盘页面
│ │ ├── layout.tsx # 仪表盘布局
│ │ ├── page.tsx # 仪表盘首页
│ │ ├── settings/ # 设置页面
│ │ │ ├── page.tsx
│ │ │ ├── profile.tsx
│ │ │ ├── security.tsx
│ │ │ └── notifications.tsx
├── components/ # 可复用组件
│ ├── ui/ # UI 组件
│ │ ├── Button.tsx
│ │ ├── Modal.tsx
│ │ ├── Input.tsx
│ │ ├── Card.tsx
│ │ ├── Dropdown.tsx
│ │ └── Table.tsx
│ ├── layout/ # 布局相关组件
│ │ ├── Navbar.tsx
│ │ ├── Sidebar.tsx
│ │ ├── Footer.tsx
│ │ └── Header.tsx
├── constants/ # 常量（API 路径、默认配置等）
│ ├── api.ts # API 相关常量
│ ├── routes.ts # 路由常量
│ ├── config.ts # 配置项
│ └── messages.ts # 文本信息
├── hooks/ # 自定义 hooks
│ ├── useAuth.ts # 认证相关 hook
│ ├── useTheme.ts # 主题切换 hook
│ ├── useFetch.ts # 数据请求 hook
│ ├── useDebounce.ts # 防抖 hook
│ └── useLocalStorage.ts # 本地存储 hook
├── lib/ # 库函数（封装 fetch、数据库、验证等）
│ ├── auth.ts # 认证相关
│ ├── db.ts # 数据库连接
│ ├── fetcher.ts # 封装 fetch
│ ├── axiosInstance.ts  # Axios 请求拦截器（推荐）
│ ├── validation.ts # 数据验证
│ ├── logger.ts # 日志记录
│ ├── cache.ts # 缓存处理
├── utils/ # 工具函数
│ ├── formatDate.ts # 时间格式化
│ ├── parseQuery.ts # 解析 URL 查询参数
│ ├── helpers.ts # 通用工具函数
│ ├── math.ts # 数学计算
│ ├── storage.ts # localStorage 封装
├── styles/ # 样式（Tailwind 或 SCSS）
│ ├── globals.css # 全局样式
│ ├── variables.css # CSS 变量
│ ├── theme.css # 主题样式
├── types/ # TypeScript 类型
│ ├── index.ts # 全局类型
│ ├── auth.ts # 认证相关类型
│ ├── user.ts # 用户类型
│ ├── api.ts # API 相关类型
│ ├── ui.ts # UI 组件类型
├── middleware.ts # 中间件（如身份验证、重定向）
├── .env # 环境变量
├── .gitignore # Git 忽略文件
├── next.config.js # Next.js 配置
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json # TypeScript 配置
├── package.json # 依赖管理
└── README.md # 项目说明
```

### **prettier** 解释

| 配置项                   | 作用                                                            |
| ------------------------ | --------------------------------------------------------------- |
| `trailingComma`: `"es5"` | 在 ES5 支持的地方加尾随逗号（如对象、数组，但不包括函数参数）。 |
| `tabWidth`: `2`          | 缩进为 2 个空格（默认值）。                                     |
| `semi`: `true`           | 每行代码结尾加分号（false 则去掉分号）。                        |
| `singleQuote`: `true`    | 使用单引号（默认是双引号 false）。                              |
| `printWidth`: `120`      | 一行最多120个字符                                               |
