# CLAUDE.md - AI Assistant Guide for vue3-vs-vue2 Repository

## Repository Overview

This is a **comprehensive learning and comparison repository** for Vue 3 vs Vue 2, created as an educational resource. It contains 38+ distinct sub-projects exploring different aspects of Vue 3's architecture, performance, and capabilities compared to Vue 2.

**Repository Type:** Learning/Experimental (not production code)
**Primary Language:** JavaScript/TypeScript (with some C++ for algorithm learning)
**License:** MIT
**Created:** ~2020 (Vue 3 beta era)

## Project Purpose

This repository serves as:
- A comprehensive comparison between Vue 2 and Vue 3 implementations
- An exploration of Vue 3's new features (Composition API, reactivity system, custom renderers)
- A collection of working examples and mini-projects for learning
- Performance benchmarking (SSR, update cycles)
- Teaching materials for Vue 3 concepts

## Repository Structure

### Core Comparison Projects

#### Vue 3 Demonstrations
- **`vue3-demo-vite/`** - Vue 3 with Vite (modern, fast bundler)
- **`vue3-demo-cli/`** - Vue 3 via Vue CLI setup
- **`vue3-demo-webpack/`** - Vue 3 with Webpack configuration
- **`todo-vue3/`** - TodoMVC using Vue 3 Composition API with custom hooks
- **`vue3-todomvc/`** - Alternative TodoMVC implementation with Vite
- **`vue3-test/`** - Vue 3 testing examples

#### Vue 2 Demonstrations (for comparison)
- **`vue2-demo/`** - Basic Vue 2 demonstration
- **`todo-vue2/`** - TodoMVC using Vue 2 Options API (direct comparison with todo-vue3)

### Advanced Features & Concepts

#### Reactivity System Deep Dive
**`reactivity/`** - Explores Vue 3's reactivity system:
- `LocalStorage.js` - Reactive localStorage wrapper
- `HTTPRequest.js` - Reactive HTTP request abstraction
- `Timer.js`, `TimeLine.js` - Time-based reactivity
- `ThreeRender.js` - Three.js integration
- `Fragment.vue` - Fragment component examples
- `vanilla-main.js` - Native JavaScript data binding (no framework)

#### Custom Renderers (Advanced Vue 3 Feature)
- **`custom-renderer/`** - Custom renderers for Canvas and Three.js
  - Canvas renderer for 2D drawing
  - Three.js renderer for 3D graphics
- **`custom-renderer-pixijs/`** - Pixi.js renderer with game demo
- **`vue3-runtime-canvas/`** - Canvas-based runtime implementation

#### API Comparison
**`compostion-vs-option/`** - Side-by-side API comparison:
- `option.vue` - Vue 2 Options API (data, methods, computed, watch)
- `compisition.vue` - Vue 3 Composition API (setup, composables, reactive)

#### Performance Testing
- **`ssr2/`** - Vue 2 Server-Side Rendering
- **`ssr3/`** - Vue 3 Server-Side Rendering
  - Benchmark results: Vue 3 is ~2.2x faster (288 QPS vs 130 QPS)
  - Test components use 3:1 static-to-dynamic content ratio

### Build Tools & Bundlers

- **`vite-master/`** - Vite bundler exploration
- **`vite-mini/`** - Minimal Vite setup with Koa backend
- **`webpack/`** - Webpack configuration examples

### Framework Implementations

- **`mini-vue/`** - Minimal Vue implementation from scratch
- **`mini-vue-cur/`** - Current minimal Vue implementation
- **`vue-next/`** - Vue 3 source code exploration
- **`vue-comp/`** - Vue template compiler utilities

### Large Projects

#### Skedo - Educational Framework
**`skedo/`** - Monorepo-style educational framework:
- 15+ packages (CLI, code editor, creator, runtime, etc.)
- TypeScript-based with Rollup bundling
- Full Express backend
- Service layer architecture (faas, packager, runtime)

### Other Technologies

- **`react/`** - React examples for comparison
- **`ts/`** - TypeScript integration examples
- **`animate/`** - Animation examples (both Composition and Options API)
- **`lowcode-engine/`** - Low-code framework exploration
- **`workshop/`** - Teaching/workshop materials

### Utility Projects
- **`c++/`, `cpp/`** - C++ algorithm learning (not web-related)
- **`xlm/`, `myxlm/`** - XML/XLSX utilities
- **`doc-int/`** - Documentation integration
- **`assets/`** - Performance comparison GIFs and images

## Technologies Used

### Core Frameworks
- **Vue 3** (beta versions: 3.0.0-beta.1 to 3.0.0-beta.15)
- **Vue 2** (for comparison)
- **React** (for framework comparison)

### Build Tools
- **Vite** (0.19.0 - 1.0.0) - Modern, fast bundler
- **Webpack** - Traditional bundling
- **Vue CLI** - Quick prototyping and scaffolding
- **Rollup** - Used in Skedo monorepo

### Rendering & Graphics
- **Three.js** - 3D rendering
- **Pixi.js** - 2D WebGL rendering
- **Canvas API** - 2D drawing

### Backend & SSR
- **Express** - Backend framework for SSR examples
- **Koa** - Alternative backend framework
- **@vue/server-renderer** - Vue 3 SSR

### UI Libraries
- **Element UI** - Vue 2 component library
- **Element Plus** - Vue 3 component library

### Additional Libraries
- **Axios** - HTTP requests
- **RxJS** - Reactive programming
- **TypeScript** - Type safety in advanced projects

## Code Conventions & Patterns

### Vue 3 Composition API Pattern

```javascript
import { reactive, computed, ref, toRefs } from "vue"

export default {
  setup() {
    // State management
    const state = reactive({
      count: 0,
      items: []
    })

    // Computed properties
    const total = computed(() => state.items.length)

    // Methods
    const increment = () => {
      state.count++
    }

    // Return reactive state and methods
    return {
      ...toRefs(state),
      total,
      increment
    }
  }
}
```

### Composable Functions Pattern (Custom Hooks)

```javascript
// Reusable logic as composable functions
import { ref, onMounted, onUnmounted } from "vue"

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  const update = (e) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

### Reactive Utilities Pattern

```javascript
// Creating reactive abstractions (see reactivity/LocalStorage.js)
import { reactive, effect } from '@vue/reactivity'

export function LocalStorage(key, defaultValue) {
  let data = reactive(defaultValue)

  // Load from localStorage
  const stored = localStorage.getItem(key)
  if (stored) {
    Object.assign(data, JSON.parse(stored))
  }

  // Auto-save on changes
  effect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  })

  return data
}
```

### Custom Renderer Pattern

```javascript
import { createRenderer } from '@vue/runtime-core'

const { createApp } = createRenderer({
  createElement(type) {
    // Create element for custom platform
  },
  insert(child, parent, anchor) {
    // Insert element into parent
  },
  patchProp(el, key, prevValue, nextValue) {
    // Update element properties
  },
  remove(el) {
    // Remove element
  },
  setElementText(node, text) {
    // Set text content
  }
})

export { createApp }
```

### Vue 2 Options API Pattern (for comparison)

```javascript
export default {
  data() {
    return {
      count: 0,
      items: []
    }
  },
  computed: {
    total() {
      return this.items.length
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // Lifecycle hook
  }
}
```

## Development Workflows

### Working with Individual Projects

Most sub-projects are standalone and can be run independently:

```bash
# Navigate to a project
cd todo-vue3/

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
npm run serve

# Build for production
npm run build
```

### Common Build Commands

- **Vite projects:** `npm run dev` (development), `npm run build` (production)
- **Vue CLI projects:** `npm run serve` (development), `npm run build` (production)
- **Webpack projects:** `npm run dev` or `npm start`

### SSR Testing Projects

```bash
# For ssr2 and ssr3
cd ssr3/
npm install

# Link shared component (if needed)
cd ../vue-comp/
npm link

cd ../ssr3/
npm link vue-comp

# Run server
npm start
# Server runs on http://localhost:9093/
```

### Performance Testing

The repository includes wrk benchmarking for SSR:

```bash
# Install wrk (if not already installed)
# On macOS: brew install wrk

# Test Vue 3 SSR
wrk -t12 -c400 -d10s http://localhost:9093/

# Test Vue 2 SSR
wrk -t12 -c400 -d10s http://localhost:9092/
```

## Key Files & Configurations

### Build Configurations
- `vite.config.js/ts` - Vite configuration
- `webpack.config.js` - Webpack configuration
- `vue.config.js` - Vue CLI configuration
- `tsconfig.json` - TypeScript configuration
- `babel.config.js` - Babel transpilation

### Package Management
- `package.json` - Dependencies and scripts
- Both npm and yarn are used across projects

### Common Dependencies Pattern

Vue 3 projects typically include:
```json
{
  "dependencies": {
    "vue": "^3.0.0-beta.x",
    "@vue/compiler-sfc": "^3.0.0-beta.x"
  },
  "devDependencies": {
    "vite": "^0.x.x" // or webpack/vue-cli
  }
}
```

## Git Workflow

### Branch Naming Convention
- Feature branches follow pattern: `claude/claude-md-[session-id]`
- Main development happens on feature branches
- Example: `claude/claude-md-mhyimj4y6uz69d7y-01Bv4KLxnGBiMZjkFEwak1RC`

### Commit Best Practices
- Use descriptive commit messages in Chinese or English
- Common prefixes: `feat:`, `fix:`, `docs:`, `refactor:`
- Example: `feat: add custom renderer for canvas`

### Pushing Changes
```bash
# Always push to feature branch with -u flag
git push -u origin claude/[branch-name]

# Retry with exponential backoff if network fails (2s, 4s, 8s, 16s)
```

## Important Notes for AI Assistants

### Project Context
1. **This is NOT production code** - It's a learning repository with experimental code
2. **Multiple implementations exist** - Same features are often implemented in both Vue 2 and Vue 3
3. **Code is from 2020** - Uses Vue 3 beta versions and early Vite versions
4. **Chinese documentation** - Some comments and README sections are in Chinese
5. **No strict testing** - Minimal test coverage, focus is on demonstration

### When Working with This Repository

#### DO:
- ✅ Explore both Vue 2 and Vue 3 implementations for comparison
- ✅ Run individual projects independently
- ✅ Use the reactivity examples as learning references
- ✅ Test performance comparisons between Vue 2 and Vue 3
- ✅ Experiment with custom renderers
- ✅ Reference the composable patterns in todo-vue3
- ✅ Check multiple projects for pattern consistency

#### DON'T:
- ❌ Expect production-grade error handling
- ❌ Look for comprehensive test coverage
- ❌ Assume all projects use the latest Vue/Vite versions
- ❌ Expect CI/CD configurations
- ❌ Assume type safety (mostly JavaScript)
- ❌ Expect monorepo tooling (except in Skedo)

### Code Quality Observations
- Clean, readable component structure
- Good separation of concerns (composables, utilities)
- Modern ES6+ features (arrow functions, destructuring, async/await)
- Minimal linting enforcement
- Commented-out code shows alternatives
- Educational focus over production robustness

### Common Patterns to Follow

1. **Composable Functions:** Extract reusable logic into functions (see todo-vue3/hooks/)
2. **Reactive Utilities:** Wrap external APIs with Vue reactivity (see reactivity/LocalStorage.js)
3. **Custom Renderers:** Use createRenderer for non-DOM targets (see custom-renderer/)
4. **Side-by-side Comparison:** Maintain parallel Vue 2/Vue 3 implementations

## Project-Specific Notes

### todo-vue3 vs todo-vue2
- Identical functionality, different API approaches
- todo-vue3 uses custom hooks: useLocalStorage, useScroll, useMouse
- todo-vue2 uses Options API with mixins
- Direct comparison for learning Composition API benefits

### Reactivity Projects
- **Fragment.vue** - Demonstrates Vue 3 Fragment feature (multiple root elements)
- **HTTPRequest.js** - Shows reactive data fetching
- **LocalStorage.js** - Reactive persistence layer
- **vanilla-main.js** - Pure JavaScript reactivity without Vue

### Custom Renderer Projects
- **Canvas rendering** - createRenderer for <canvas> elements
- **Three.js rendering** - createRenderer for 3D scenes
- **Pixi.js rendering** - Game demo showing WebGL integration
- Use these as templates for custom platform targets

### SSR Projects
- ssr2 and ssr3 share components via npm link
- Performance benchmarks show Vue 3 is ~2.2x faster
- Test component: 1000 lists with 3:1 static-to-dynamic ratio

### Skedo Project
- Largest sub-project with monorepo structure
- Contains CLI tools, code editor, creator, runtime
- Uses Rollup for packaging
- Express backend with service architecture
- Educational framework for teaching web development

## Quick Reference

### Most Important Directories
```
todo-vue2/          # Vue 2 Options API example
todo-vue3/          # Vue 3 Composition API example
reactivity/         # Reactivity system exploration
custom-renderer/    # Custom renderer examples
compostion-vs-option/  # Direct API comparison
ssr2/, ssr3/       # SSR performance comparison
skedo/             # Large monorepo project
```

### Key Concepts Demonstrated
- ✨ Composition API vs Options API
- ⚡ Performance improvements (update cycles, SSR)
- 🎨 Custom renderers (Canvas, Three.js, Pixi.js)
- 🔄 Reactivity system (reactive, effect, computed, ref)
- 📦 Multiple build tools (Vite, Webpack, Vue CLI)
- 🧩 Composable functions (custom hooks)
- 🌐 Server-side rendering

## Resources

### Official Documentation
- Vue 3: https://v3.vuejs.org/
- Vite: https://vitejs.dev/
- Vue CLI: https://cli.vuejs.org/

### Repository Documentation
- Main README: `/README.md` (Chinese, with performance benchmarks)
- Individual project READMEs in each subdirectory

---

**Last Updated:** 2025-11-14
**Repository:** vue3-vs-vue2
**Purpose:** Learning and comparison of Vue 2 vs Vue 3

For questions or clarifications about this codebase, refer to the README.md or explore the specific sub-project directories listed above.
