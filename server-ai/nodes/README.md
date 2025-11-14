# Nodes 目录

存放 LangGraph 工作流中的节点实现。

## 节点规范

每个节点应该：

1. 是一个异步函数
2. 接收当前状态作为参数
3. 返回更新后的状态对象

## 示例节点

```javascript
// nodes/exampleNode.js
export async function exampleNode(state) {
  // 执行某些操作
  const result = await someOperation(state.data);

  // 返回更新的状态
  return {
    ...state,
    result,
    timestamp: Date.now()
  };
}
```

## 节点类型

### 1. 处理节点
执行数据转换或业务逻辑

### 2. 决策节点
根据条件决定下一步路径

### 3. 调用节点
调用外部 API 或服务

### 4. 聚合节点
合并多个输入源的数据
