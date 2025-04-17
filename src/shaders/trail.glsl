// 今回の最小構成では未使用ですが、
// カスタムシェーダーに差し替えたい場合に利用できます。
precision mediump float;
varying float vAlpha;
void main() {
  gl_FragColor = vec4(0.2, 0.6, 1.0, vAlpha);
}
