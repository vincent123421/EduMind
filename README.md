# EduMind - 智能教育辅助系统

## 项目简介

EduMind 是一个基于人工智能的智能教育辅助系统，旨在帮助用户更高效地学习和理解教材内容。系统集成了文档处理、知识点提取、智能问答、思维导图生成等多项功能，为用户提供全方位的学习支持。

## 核心功能

### 📚 文档智能处理
- **多格式支持**：支持 PDF、DOCX、TXT 等多种文档格式
- **OCR 文字识别**：自动提取文档中的文字内容
- **智能目录生成**：基于文档结构自动生成章节目录
- **知识点提取**：利用 AI 技术提取文档中的核心知识点

### 💬 智能问答系统
- **RAG 检索增强**：基于上传文档内容进行精准问答
- **多模型支持**：集成 DeepSeek 等先进 AI 模型
- **引用追溯**：AI 回答自动标注信息来源，支持引用查看
- **对话管理**：支持多轮对话，保存对话历史

### 🧠 思维导图生成
- **可视化展示**：将文档内容转换为直观的思维导图
- **交互式浏览**：支持节点展开/折叠，便于理解文档结构
- **知识点关联**：展示知识点之间的层次关系

### 📝 答题模板系统
- **模板提取**：从问答对中自动提取通用答题模板
- **方法管理**：保存和管理各类答题方法
- **答案重写**：基于选定模板重新组织答案结构

### 🔍 相似内容检索
- **语义搜索**：基于 BERT 模型的语义相似度搜索
- **知识点匹配**：快速找到相关知识点和内容
- **FAISS 索引**：高效的向量检索系统

## 技术架构

### 后端技术栈
- **框架**：Flask (Python)
- **AI 模型**：DeepSeek API、BERT (中文)
- **文档处理**：PyPDF2、python-docx、OCR
- **向量检索**：FAISS、transformers
- **数据存储**：JSON 文件存储

### 前端技术栈
- **框架**：React 18
- **UI 组件**：Ant Design
- **路由**：React Router
- **状态管理**：React Hooks
- **图表展示**：OrgChart.js

### 核心模块

#### 后端模块
```
code/
├── app.py              # Flask 主应用
├── main.py             # 命令行入口
├── config.py           # 配置管理
├── llm_interface.py    # AI 模型接口
├── data_manager.py     # 数据管理
├── text_summarizer.py  # 文本摘要
├── question_rewriter.py # 问题重写
├── search_similar.py   # 相似度搜索
├── embedding.py        # 向量嵌入
├── images_and_ocr.py   # OCR 处理
├── get_catalog.py      # 目录生成
├── get_segment.py      # 内容分段
└── get_orgchart.py     # 思维导图生成
```

#### 前端模块
```
notebook-layout/src/
├── components/
│   ├── Chat/           # 聊天界面
│   ├── Layout/         # 布局组件
│   ├── Modals/         # 弹窗组件
│   ├── ProjectList/    # 项目列表
│   └── Tools/          # 工具面板
├── hooks/              # 自定义 Hooks
├── services/           # API 服务
└── App.js              # 主应用组件
```

## 安装部署

### 环境要求
- Python 3.8+
- Node.js 16+
- CUDA (可选，用于 GPU 加速)

### 后端部署

1. **安装依赖**
```bash
cd code
pip install -r requirements.txt
```

2. **配置环境变量**
```bash
# 创建 .env 文件
DEEPSEEK_API_KEY=your_deepseek_api_key
DASHSCOPE_API_KEY=your_dashscope_api_key
```

3. **启动后端服务**
```bash
python app.py
```

### 前端部署

1. **安装依赖**
```bash
cd notebook-layout
npm install
```

2. **启动开发服务器**
```bash
npm start
```

3. **构建生产版本**
```bash
npm run build
```

## 使用指南

### 1. 创建项目
- 在项目列表页面点击"创建新项目"
- 输入项目名称并确认

### 2. 上传文档
- 选择文件类型（教材/题目）
- 上传 PDF、DOCX 或 TXT 文件
- 系统自动进行后台处理

### 3. 智能问答
- 在聊天界面输入问题
- 选择相关文档作为参考
- AI 基于文档内容提供准确回答

### 4. 查看思维导图
- 在仪表盘中选择已处理的教材
- 生成并查看文档的思维导图结构

### 5. 管理答题模板
- 从文档中提取问答对
- 自动生成答题模板和方法
- 使用模板重写和优化答案

## API 接口

### 项目管理
- `GET /api/projects` - 获取项目列表
- `POST /api/projects` - 创建新项目
- `DELETE /api/projects/{id}` - 删除项目

### 文件管理
- `GET /api/projects/{id}/files` - 获取文件列表
- `POST /api/projects/{id}/upload` - 上传文件

### 聊天功能
- `GET /api/projects/{id}/chat-history` - 获取对话历史
- `POST /api/projects/{id}/chat` - 发送消息
- `GET /api/projects/{id}/export-chat/{chatId}` - 导出对话

### 模板功能
- `GET /api/projects/{id}/templates/list` - 获取模板列表
- `POST /api/projects/{id}/templates/extract-from-file` - 提取模板
- `POST /api/projects/{id}/templates/rewrite-answer` - 重写答案

## 项目特色

### 🎯 精准的 RAG 系统
- 基于文档内容的检索增强生成
- 支持中文语义理解和匹配
- 提供准确的信息来源追溯

### 🚀 高效的处理流程
- 自动化文档处理管道
- 并行处理提升效率
- 智能缓存减少重复计算

### 🎨 直观的用户界面
- 现代化的 React 界面设计
- 响应式布局适配多设备
- 丰富的交互体验

### 🔧 灵活的扩展性
- 模块化架构设计
- 支持多种 AI 模型接入
- 可配置的处理参数

## 开发计划

### 近期目标
- [ ] 网站维护
- [ ] 匹配算法改进
- [ ] 完善思维导图功能
- [ ] 开源大模型的适应性微调
- [ ] 引用功能的改进
- [ ] 数据库迁移


### 长期规划
- [ ] 支持多语言文档处理
- [ ] 构建EduMind自己的大模型
- [ ] 开发移动端应用
- [ ] 构建知识图谱系统

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目！

### 开发环境设置
1. Fork 本仓库
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

### 代码规范
- Python 代码遵循 PEP 8 规范
- JavaScript 代码使用 ESLint 检查
- 提交信息使用清晰的描述

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues：[GitHub Issues](https://github.com/vincent123421/EduMind/issues)
- 邮箱：vincent851018@qq.com

---

**EduMind** - 让学习更智能，让知识更易得！