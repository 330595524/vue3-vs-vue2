import 'dotenv/config';
import { StateGraph } from "@langchain/langgraph";

/**
 * 示例：简单的 LangGraph 工作流
 */

// 定义状态类型
const GraphState = {
  messages: [],
  currentStep: "",
  result: null
};

// 节点1：处理输入
async function processInput(state) {
  console.log("📥 处理输入...");
  return {
    ...state,
    currentStep: "input_processed",
    messages: [...state.messages, "输入已处理"]
  };
}

// 节点2：执行任务
async function executeTask(state) {
  console.log("⚙️  执行任务...");
  return {
    ...state,
    currentStep: "task_executed",
    messages: [...state.messages, "任务已执行"],
    result: { success: true, data: "处理完成" }
  };
}

// 节点3：输出结果
async function outputResult(state) {
  console.log("📤 输出结果...");
  console.log("最终结果:", state.result);
  return {
    ...state,
    currentStep: "completed",
    messages: [...state.messages, "结果已输出"]
  };
}

// 创建工作流
function createWorkflow() {
  // 初始化状态图
  const workflow = new StateGraph({
    channels: GraphState
  });

  // 添加节点
  workflow.addNode("processInput", processInput);
  workflow.addNode("executeTask", executeTask);
  workflow.addNode("outputResult", outputResult);

  // 设置入口点
  workflow.setEntryPoint("processInput");

  // 添加边（定义执行顺序）
  workflow.addEdge("processInput", "executeTask");
  workflow.addEdge("executeTask", "outputResult");
  workflow.addEdge("outputResult", "__end__");

  // 编译图
  return workflow.compile();
}

// 主函数
async function main() {
  console.log("🚀 启动 LangGraph 工作流...\n");

  try {
    // 创建并编译工作流
    const app = createWorkflow();

    // 初始化状态
    const initialState = {
      messages: [],
      currentStep: "start",
      result: null
    };

    // 执行工作流
    const result = await app.invoke(initialState);

    console.log("\n✅ 工作流执行完成!");
    console.log("📋 消息历史:", result.messages);
    console.log("🎯 最终状态:", result.currentStep);

  } catch (error) {
    console.error("❌ 错误:", error.message);
    process.exit(1);
  }
}

// 运行主函数
main();
