import { defineConfig } from 'vite'
import rawPlugin from 'vite-plugin-raw'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: '/orbitron/', // GitHub Pagesのリポジトリ名に合わせて設定
  plugins: [
    rawPlugin({ match: /\.glsl$/ }),
    viteStaticCopy({
      targets: [{ src: 'public/**/*', dest: '' }]
    })
  ]
})
