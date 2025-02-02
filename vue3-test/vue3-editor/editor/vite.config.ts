import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
	 alias : {
    "@" : path.resolve(__dirname, './src')
  },
  plugins: [vue(), vueJSX()]
})
