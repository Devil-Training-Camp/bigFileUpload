import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import eslintPlugin from 'vite-plugin-eslint'
import fs from 'fs'
import dotenv, { DotenvParseOutput } from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 定义文件前缀
  const envFilePrefix: string = '.env.'
  // 获取当前模式下对应的环境变量文件
  const curEnvFileName = `${envFilePrefix}${mode}`
  // 读取环境变量文件
  const envData = fs.readFileSync(curEnvFileName)
  // 把读取到的结果解析成对象
  const envMap: DotenvParseOutput = dotenv.parse(envData)
  console.log('🚀🚀 ~ envMap', envMap)

  return {
    resolve: {
      //设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      vueSetupExtend({
        enableAutoExpose: true,
      }),
      // eslintPlugin(),
    ],
    server: {
      hmr: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
        },
      },
    },
  }
})
