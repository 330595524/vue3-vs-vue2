import { StateGraph } from "@langchain/langgraph";

/**
 * 示例：简单的三步工作流
 * 演示如何创建一个基本的 LangGraph 工作流
 */

// 步骤1：数据收集
async function collectData(state) {
  console.log("📊 步骤1: 收集数据");

  return {
    ...state,
    data: {
      timestamp: new Date().toISOString(),
      source: "user_input"
    }
  };
}

// 步骤2：数据处理
async function processData(state) {
  console.log("⚙️  步骤2: 处理数据");

  const processed = {
    ...state.data,
    processed: true,
    processingTime: Date.now()
  };

  return {
    ...state,
    data: processed
  };
}

// 步骤3：生成结果
async function generateResult(state) {
  console.log("✨ 步骤3: 生成结果");

  return {
    ...state,
    result: {
      success: true,
      message: "工作流完成",
      data: state.data
    }
  };
}

// 创建简单工作流
export function createSimpleWorkflow() {
  const workflow = new StateGraph({
    channels: {
      data: null,
      result: null
    }
  });

  // 添加节点
  workflow.addNode("collect", collectData);
  workflow.addNode("process", processData);
  workflow.addNode("generate", generateResult);

  // 设置流程
  workflow.setEntryPoint("collect");
  workflow.addEdge("collect", "process");
  workflow.addEdge("process", "generate");
  workflow.addEdge("generate", "__end__");

  return workflow.compile();
}

// 运行示例
async function runExample() {
  console.log("🚀 运行简单工作流示例\n");

  const app = createSimpleWorkflow();
  const result = await app.invoke({});

  console.log("\n✅ 结果:", JSON.stringify(result, null, 2));
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runExample();
}
