import { defineConfig } from 'vite'
import rawPlugin from 'vite-plugin-raw'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: './', // GitHub Pages サブフォルダ公開なら '/skyforge/'
  plugins: [
    rawPlugin({ match: /\.glsl$/ }),
    viteStaticCopy({
      targets: [{ src: 'public/**/*', dest: '' }]
    })
  ]
})
