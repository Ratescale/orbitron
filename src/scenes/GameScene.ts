import * as THREE from 'three'
import { propagate, OrbitalState } from '../core/OrbitSimulator'
import trailFrag from '../shaders/trail.glsl?raw'

export class GameScene {
  scene = new THREE.Scene()
  private state: OrbitalState = {
    semiMajor: 7000,  // km
    eccentricity: 0,
    trueAnomaly: 0
  }

  private satellite: THREE.Mesh
  private trail: THREE.Line
  private trailPoints: THREE.Vector3[] = []

  constructor(private camera: THREE.PerspectiveCamera) {
    // 環境光
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const dir = new THREE.DirectionalLight(0xffffff, 0.6)
    dir.position.set(5, 5, 5)
    this.scene.add(dir)

    this.initEarth()
    this.satellite = this.initSatellite()
    this.trail = this.initTrail()

    // カメラを中央へ向ける
    this.camera.lookAt(0, 0, 0)
  }

  /* -------- 初期化 -------- */

  private initEarth() {
    const geo = new THREE.SphereGeometry(6371 * 0.001, 64, 64) // km→scene
    const tex = new THREE.TextureLoader().load('/地球.png')
    const mat = new THREE.MeshPhongMaterial({ map: tex })
    const earth = new THREE.Mesh(geo, mat)
    this.scene.add(earth)
  }

  private initSatellite() {
    const geo = new THREE.BoxGeometry(0.4, 0.4, 0.4)
    const mat = new THREE.MeshStandardMaterial({ color: 0x00ff88 })
    const sat = new THREE.Mesh(geo, mat)
    this.scene.add(sat)
    return sat
  }

  private initTrail() {
    const geo = new THREE.BufferGeometry()
    const mat = new THREE.LineBasicMaterial({
      color: 0x3399ff,
      transparent: true,
      opacity: 0.8
    })
    const line = new THREE.Line(geo, mat)
    this.scene.add(line)
    return line
  }

  /* -------- 毎フレーム -------- */

  update(dt: number) {
    // 軌道を進める
    this.state.trueAnomaly += 0.001 * dt
    const pos = propagate(this.state).multiplyScalar(0.001) // km→scene
    this.satellite.position.copy(pos)

    // トレイル更新
    this.trailPoints.push(pos.clone())
    if (this.trailPoints.length > 300) this.trailPoints.shift()
    this.trail.geometry.setFromPoints(this.trailPoints)
  }
}
