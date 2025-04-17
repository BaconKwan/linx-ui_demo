# 灵析 AI 医疗辅诊系统

> 智能诊断 · 精准医疗

## 项目简介

灵析 AI 医疗辅诊系统是一款基于 Next.js 和 Ant Design 构建的智能医疗辅助诊断平台，集成了 AI 诊断、医学影像分析、实验室检查、病历管理等多种功能，旨在为临床医生和医疗研究人员提供高效、智能的决策支持。

## 主要功能

- **患者管理**：支持患者信息的检索与管理。
- **AI 辅助诊断**：自动生成诊断结论、治疗方案及推理过程，并支持用户反馈。
- **医学影像分析**：集成 DICOM 影像查看器，支持多种影像工具与交互操作。
- **实验室与病原学检查**：展示关键实验室指标和病原学检测结果。
- **病历与监测**：支持病历信息浏览与患者监测数据展示。
- **多标签页导航**：包括总览、风险评估、影像、实验室、病历、监测等模块。

## 技术栈

- 前端框架：Next.js 15、React 19
- UI 组件库：Ant Design 5
- 医学影像：Cornerstone.js 生态（core、tools、wado-image-loader、dicom-parser）
- 样式：Tailwind CSS
- 语言：TypeScript

## 目录结构

```
src/
  app/
    ai-diagnosis/         # AI 辅诊主模块及患者详情
      [patientId]/        # 患者详情动态路由
        tabs/             # 诊断各功能标签页
    page.tsx              # 首页
  components/             # 复用型 UI 组件
  lib/                    # 工具库与注册
  mocks/                  # 模拟数据
  types/                  # 类型定义
public/                   # 静态资源
```

## 安装与运行

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd lingx-ui_demo
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 主要依赖说明

- `next`：React 服务端渲染与静态站点生成框架
- `antd`：企业级 UI 组件库
- `cornerstone-core`、`cornerstone-tools`、`cornerstone-wado-image-loader`、`dicom-parser`：医学影像 DICOM 解析与交互
- `react`、`react-dom`：核心前端库

## 开发与测试

- 代码格式化：推荐使用 [Black](https://black.readthedocs.io/)（如有 Python 后端）和 Prettier（前端）。
- 代码质量：使用 ESLint 进行静态检查。
- 单元测试：建议集成 [Jest](https://jestjs.io/) 或 [React Testing Library](https://testing-library.com/)。
- 模拟数据：`src/mocks/` 目录下提供丰富的 mock 数据，便于前端独立开发和测试。

## 贡献指南

1. Fork 本仓库并新建分支进行开发。
2. 保持代码风格一致，建议遵循 PEP8（Python）和 ESLint（TypeScript）。
3. 提交前请确保通过所有 lint 检查和单元测试。
4. 提交合并请求（PR）时请详细描述变更内容。

## License

本项目采用 MIT License，详见 [LICENSE](./LICENSE)。
