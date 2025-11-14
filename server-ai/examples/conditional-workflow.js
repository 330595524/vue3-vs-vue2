import { StateGraph, END } from "@langchain/langgraph";

/**
 * 示例：条件分支工作流
 * 演示如何根据状态条件选择不同的执行路径
 */

// 输入节点
async function inputNode(state) {
  console.log("📥 接收输入");
  const value = state.inputValue || Math.random();

  return {
    ...state,
    value,
    path: null
  };
}

// 条件判断节点
async function decisionNode(state) {
  console.log("🤔 进行决策判断");

  const { value } = state;
  let path;

  if (value > 0.7) {
    path = "high";
  } else if (value > 0.3) {
    path = "medium";
  } else {
    path = "low";
  }

  console.log(`   值: ${value.toFixed(2)}, 路径: ${path}`);

  return {
    ...state,
    path
  };
}

// 高优先级处理
async function highPriorityNode(state) {
  console.log("🔴 高优先级处理");
  return {
    ...state,
    result: "高优先级任务完成",
    priority: "high"
  };
}

// 中优先级处理
async function mediumPriorityNode(state) {
  console.log("🟡 中优先级处理");
  return {
    ...state,
    result: "中优先级任务完成",
    priority: "medium"
  };
}

// 低优先级处理
async function lowPriorityNode(state) {
  console.log("🟢 低优先级处理");
  return {
    ...state,
    result: "低优先级任务完成",
    priority: "low"
  };
}

// 条件路由函数
function routeByPriority(state) {
  return state.path;
}

// 创建条件工作流
export function createConditionalWorkflow() {
  const workflow = new StateGraph({
    channels: {
      inputValue: null,
      value: null,
      path: null,
      result: null,
      priority: null
    }
  });

  // 添加节点
  workflow.addNode("input", inputNode);
  workflow.addNode("decision", decisionNode);
  workflow.addNode("high", highPriorityNode);
  workflow.addNode("medium", mediumPriorityNode);
  workflow.addNode("low", lowPriorityNode);

  // 设置入口
  workflow.setEntryPoint("input");

  // 基本流程
  workflow.addEdge("input", "decision");

  // 条件分支
  workflow.addConditionalEdges(
    "decision",
    routeByPriority,
    {
      high: "high",
      medium: "medium",
      low: "low"
    }
  );

  // 所有路径都通向结束
  workflow.addEdge("high", END);
  workflow.addEdge("medium", END);
  workflow.addEdge("low", END);

  return workflow.compile();
}

// 运行示例
async function runExample() {
  console.log("🚀 运行条件分支工作流示例\n");

  const app = createConditionalWorkflow();

  // 运行多次以演示不同路径
  for (let i = 0; i < 3; i++) {
    console.log(`\n--- 执行 ${i + 1} ---`);
    const result = await app.invoke({ inputValue: Math.random() });
    console.log(`✅ 结果: ${result.result} (优先级: ${result.priority})\n`);
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runExample();
}
