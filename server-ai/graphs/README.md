# Graphs 目录

存放完整的工作流定义。

## 工作流结构

一个完整的工作流应该包括：

1. 状态定义
2. 节点定义
3. 边（连接）定义
4. 编译和导出

## 示例工作流

```javascript
// graphs/exampleGraph.js
import { StateGraph } from "@langchain/langgraph";
import { node1, node2 } from "../nodes/index.js";

export function createExampleGraph() {
  const workflow = new StateGraph({
    channels: {
      input: null,
      output: null
    }
  });

  workflow.addNode("node1", node1);
  workflow.addNode("node2", node2);

  workflow.setEntryPoint("node1");
  workflow.addEdge("node1", "node2");
  workflow.addEdge("node2", "__end__");

  return workflow.compile();
}
```

## 工作流类型

- **线性工作流**: 顺序执行的节点链
- **分支工作流**: 包含条件分支的流程
- **循环工作流**: 包含循环或迭代的流程
- **并行工作流**: 多个节点并行执行
