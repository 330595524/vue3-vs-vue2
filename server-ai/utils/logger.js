/**
 * 简单的日志工具
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

export const logger = {
  info: (message, ...args) => {
    console.log(`${colors.blue}ℹ${colors.reset} ${message}`, ...args);
  },

  success: (message, ...args) => {
    console.log(`${colors.green}✓${colors.reset} ${message}`, ...args);
  },

  warn: (message, ...args) => {
    console.warn(`${colors.yellow}⚠${colors.reset} ${message}`, ...args);
  },

  error: (message, ...args) => {
    console.error(`${colors.red}✗${colors.reset} ${message}`, ...args);
  },

  debug: (message, ...args) => {
    if (process.env.DEBUG) {
      console.log(`${colors.magenta}⚙${colors.reset} ${message}`, ...args);
    }
  },

  step: (step, message) => {
    console.log(`${colors.cyan}[步骤 ${step}]${colors.reset} ${message}`);
  }
};

export default logger;
