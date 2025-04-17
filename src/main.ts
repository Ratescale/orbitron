import './style.css'
import * as THREE from 'three'
import { GameScene } from './scenes/GameScene'

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// カメラ
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)
camera.position.set(0, 10, 20)

// シーン
const game = new GameScene(camera)

// ループ
let last = performance.now()
function loop(now: number) {
  const dt = now - last
  last = now
  game.update(dt)
  renderer.render(game.scene, camera)
  requestAnimationFrame(loop)
}
loop(last)

// リサイズ
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
