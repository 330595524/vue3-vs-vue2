# Server-AI - LangGraph Workflow Implementation

基于 LangGraph 的 AI 工作流实现项目。

## 项目简介

这是一个使用 LangGraph 构建的 AI 图工作流项目，用于实现复杂的 AI agent 交互和任务编排。

## 功能特性

- 🔄 基于图的工作流编排
- 🤖 支持多 Agent 协作
- 🔗 状态管理和持久化
- 📊 可视化工作流执行
- 🛠️ 灵活的节点定义

## 技术栈

- **LangGraph** - 图工作流框架
- **LangChain** - AI 应用开发框架
- **Node.js** - 运行时环境

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 配置环境变量

复制 `.env.example` 为 `.env` 并填写你的 API keys：

```bash
cp .env.example .env
```

### 运行项目

```bash
# 开发模式（带热重载）
npm run dev

# 生产模式
npm start
```

## 项目结构

```
server-ai/
├── index.js          # 入口文件
├── graphs/           # 图定义目录
├── nodes/            # 节点实现
├── agents/           # Agent 定义
├── tools/            # 工具函数
├── utils/            # 工具类
└── examples/         # 示例代码
```

## LangGraph 核心概念

### Graph（图）
工作流的整体结构，由节点和边组成。

### Node（节点）
图中的处理单元，每个节点执行特定的任务。

### Edge（边）
连接节点的路径，定义工作流的执行顺序。

### State（状态）
在节点之间传递的数据。

## 示例用法

```javascript
import { StateGraph } from "@langchain/langgraph";

// 定义状态
const graphState = {
  messages: [],
  currentStep: ""
};

// 创建图
const workflow = new StateGraph({
  channels: graphState
});

// 添加节点
workflow.addNode("step1", async (state) => {
  // 处理逻辑
  return { ...state, currentStep: "completed" };
});

// 定义边
workflow.addEdge("step1", "step2");

// 编译并运行
const app = workflow.compile();
const result = await app.invoke({ messages: [] });
```

## 开发指南

### 添加新节点

在 `nodes/` 目录下创建新的节点文件：

```javascript
// nodes/myNode.js
export async function myNode(state) {
  // 节点处理逻辑
  return {
    ...state,
    // 更新状态
  };
}
```

### 创建新的 Graph

在 `graphs/` 目录下定义新的工作流：

```javascript
// graphs/myWorkflow.js
import { StateGraph } from "@langchain/langgraph";
import { myNode } from "../nodes/myNode.js";

export function createMyWorkflow() {
  const workflow = new StateGraph({...});
  workflow.addNode("myNode", myNode);
  // 添加更多节点和边
  return workflow.compile();
}
```

## 常见用例

- 📝 多步骤内容生成
- 🔍 智能信息检索
- 💬 对话系统
- 🤖 Agent 协作
- 📊 数据处理管道

## 参考资源

- [LangGraph 官方文档](https://langchain-ai.github.io/langgraph/)
- [LangChain 文档](https://js.langchain.com/)
- [示例代码](./examples/)

## License

MIT
