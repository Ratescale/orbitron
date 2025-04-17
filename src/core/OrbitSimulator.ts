import * as THREE from 'three'

export interface OrbitalState {
  semiMajor: number      // 半長軸 a [km]
  eccentricity: number   // 偏心率 e
  trueAnomaly: number    // 真近点角 ν [rad]
}

/** 地球標準重力定数 μ = 398600.4418 km³/s² */
export function propagate(
  state: OrbitalState,
  μ = 398600.4418
): THREE.Vector3 {
  const { semiMajor: a, eccentricity: e, trueAnomaly: ν } = state
  const r = (a * (1 - e ** 2)) / (1 + e * Math.cos(ν)) // 軌道方程式
  return new THREE.Vector3(r * Math.cos(ν), 0, r * Math.sin(ν))
}
