import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const clamp01 = (v) => Math.max(0, Math.min(1, v))
const smooth = (t) => t * t * (3 - 2 * t)
// remap p from [a,b] -> [0,1] then smoothstep
const seg = (p, a, b) => smooth(clamp01((p - a) / (b - a)))
const lerp = THREE.MathUtils.lerp

// rounded-rectangle Shapethe soft cross-section of a cloth ribbon
function roundedRectShape(w, h, r) {
  const hw = w / 2, hh = h / 2
  r = Math.min(r, hw, hh)
  const s = new THREE.Shape()
  s.moveTo(-hw + r, -hh)
  s.lineTo(hw - r, -hh)
  s.quadraticCurveTo(hw, -hh, hw, -hh + r)
  s.lineTo(hw, hh - r)
  s.quadraticCurveTo(hw, hh, hw - r, hh)
  s.lineTo(-hw + r, hh)
  s.quadraticCurveTo(-hw, hh, -hw, hh - r)
  s.lineTo(-hw, -hh + r)
  s.quadraticCurveTo(-hw, -hh, -hw + r, -hh)
  return s
}

// A soft, slightly-cambered satin strap that sweeps along a drape path so it
// hugs the box silhouette (no hard cubic edges, nothing sticking past faces).
// coords are [acrossAxis, y]; axis 'z' runs front-back, 'x' runs left-right.
// shape.x -> path normal (ribbon thickness), shape.y -> binormal (ribbon width)
function softWrapGeo(coords, bw, bt, axis) {
  const pts = coords.map(([a, y]) =>
    axis === 'z' ? new THREE.Vector3(0, y, a) : new THREE.Vector3(a, y, 0))
  const path = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.4)
  // shape.x -> Frenet normal (lies across the face = ribbon width),
  // shape.y -> binormal (points out of the face = ribbon thickness)
  const shape = roundedRectShape(bw, bt, bt * 0.49)
  return new THREE.ExtrudeGeometry(shape, {
    steps: Math.max(80, coords.length * 14),
    bevelEnabled: false,
    extrudePath: path,
  })
}

// ---- procedural textures -------------------------------------------------
function wrapTexture(base, dot) {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const x = c.getContext('2d')
  x.fillStyle = base
  x.fillRect(0, 0, 256, 256)
  // subtle paper fibre
  for (let i = 0; i < 1400; i++) {
    x.fillStyle = `rgba(0,0,0,${Math.random() * 0.04})`
    x.fillRect(Math.random() * 256, Math.random() * 256, 1, 1)
  }
  // polka dots
  x.fillStyle = dot
  const g = 48
  for (let yy = 0; yy <= 256; yy += g) {
    for (let xx = 0; xx <= 256; xx += g) {
      const ox = (Math.floor(yy / g) % 2) * (g / 2)
      x.beginPath()
      x.arc(xx + ox, yy, 4.2, 0, Math.PI * 2)
      x.fill()
    }
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(2, 2)
  t.anisotropy = 4
  return t
}

// The "favorite day" festive wrap: two-tone red (deep base + brighter-red
// silhouettes) with gold line-artbaubles with floral medallions, a central
// poinsettia, candles, fir trees, snowflakes and rosette gift squares.
function redGoldWrap(base, opts = {}) {
  const gold = opts.gold || '#d6ad57'
  const bright = opts.bright || '#c2392e'
  const S = 660
  const c = document.createElement('canvas')
  c.width = c.height = S
  const x = c.getContext('2d')
  x.fillStyle = base
  x.fillRect(0, 0, S, S)
  for (let i = 0; i < 2600; i++) {
    x.fillStyle = `rgba(0,0,0,${Math.random() * 0.04})`
    x.fillRect(Math.random() * S, Math.random() * S, 1, 1)
  }
  const G = (w = 2.2) => { x.strokeStyle = gold; x.fillStyle = gold; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round' }
  const B = () => { x.fillStyle = bright }
  const roundRect = (px, py, w, h, r) => { x.beginPath(); x.moveTo(px + r, py); x.arcTo(px + w, py, px + w, py + h, r); x.arcTo(px + w, py + h, px, py + h, r); x.arcTo(px, py + h, px, py, r); x.arcTo(px, py, px + w, py, r); x.closePath() }

  const floralMedallion = (cx, cy, r) => {
    G(2); x.save(); x.translate(cx, cy)
    for (let a = 0; a < 4; a++) { x.rotate(Math.PI / 2); x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(r * 0.55, -r * 0.45, r * 0.55, -r, 0, -r * 1.02); x.bezierCurveTo(-r * 0.55, -r, -r * 0.55, -r * 0.45, 0, 0); x.stroke() }
    x.beginPath(); x.arc(0, 0, r * 0.16, 0, Math.PI * 2); x.fill(); x.restore()
  }
  const bauble = (cx, cy, r) => {
    B(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    G(2)
    x.strokeRect(cx - 5, cy - r - 10, 10, 7); x.beginPath(); x.moveTo(cx, cy - r - 3); x.lineTo(cx, cy - r); x.stroke()
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.clip()
    x.beginPath(); x.moveTo(cx - r, cy - r * 0.34); x.lineTo(cx + r, cy - r * 0.34); x.moveTo(cx - r, cy + r * 0.34); x.lineTo(cx + r, cy + r * 0.34); x.stroke(); x.restore()
    floralMedallion(cx, cy, r * 0.6)
  }
  const rosette = (cx, cy, r) => {
    G(2); x.save(); x.translate(cx, cy)
    for (let a = 0; a < 8; a++) { x.rotate(Math.PI / 4); x.beginPath(); x.ellipse(0, -r * 0.5, r * 0.26, r * 0.5, 0, 0, Math.PI * 2); x.stroke() }
    x.beginPath(); x.arc(0, 0, r * 0.12, 0, Math.PI * 2); x.fill(); x.restore()
  }
  const giftSquare = (cx, cy, s) => {
    B(); roundRect(cx - s, cy - s, s * 2, s * 2, 8); x.fill(); rosette(cx, cy, s * 0.82)
    G(2); x.beginPath(); x.moveTo(cx - s, cy + s); x.lineTo(cx - s - 14, cy + s + 7); x.lineTo(cx - s, cy + s + 14); x.stroke()
  }
  const poinsettia = (cx, cy, r) => {
    B(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    G(2); x.save(); x.translate(cx, cy)
    for (let a = 0; a < 8; a++) { x.rotate(Math.PI / 4); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(r * 0.2, -r * 0.5, 0, -r * 0.92); x.quadraticCurveTo(-r * 0.2, -r * 0.5, 0, 0); x.stroke() }
    x.beginPath(); x.arc(0, 0, r * 0.12, 0, Math.PI * 2); x.fill(); x.restore()
  }
  const snowflake = (cx, cy, r) => {
    G(2); x.save(); x.translate(cx, cy)
    for (let a = 0; a < 6; a++) { x.rotate(Math.PI / 3); x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -r); x.stroke(); x.beginPath(); x.moveTo(0, -r * 0.6); x.lineTo(-r * 0.22, -r * 0.78); x.moveTo(0, -r * 0.6); x.lineTo(r * 0.22, -r * 0.78); x.stroke() }
    x.restore()
  }
  const firtree = (cx, cy, h) => {
    G(1.8); x.beginPath(); x.moveTo(cx, cy - h / 2); x.lineTo(cx, cy + h / 2); x.stroke()
    for (let k = 0; k < 4; k++) { const yy = cy - h / 2 + h * 0.2 * (k + 0.5); const w = 6 + k * 5; x.beginPath(); x.moveTo(cx, yy); x.lineTo(cx - w, yy + 11); x.moveTo(cx, yy); x.lineTo(cx + w, yy + 11); x.stroke() }
  }
  const candle = (cx, cy, h) => {
    B(); x.fillRect(cx - 7, cy - h / 2, 14, h); G(2); x.strokeRect(cx - 7, cy - h / 2, 14, h)
    x.beginPath(); x.moveTo(cx, cy - h / 2 - 4); x.quadraticCurveTo(cx - 6, cy - h / 2 - 14, cx, cy - h / 2 - 22); x.quadraticCurveTo(cx + 6, cy - h / 2 - 14, cx, cy - h / 2 - 4); x.stroke()
  }
  const diamond = (cx, cy, s) => { G(2); x.beginPath(); x.moveTo(cx, cy - s); x.lineTo(cx + s, cy); x.lineTo(cx, cy + s); x.lineTo(cx - s, cy); x.closePath(); x.stroke() }
  const goldDot = (cx, cy, r) => { G(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }

  // ---- symmetric festive composition ----
  bauble(150, 150, 74); bauble(510, 150, 74)
  giftSquare(120, 500, 58); giftSquare(540, 500, 58)
  poinsettia(330, 320, 80)
  candle(220, 330, 74); candle(440, 330, 74)
  snowflake(330, 80, 36); snowflake(60, 330, 26); snowflake(600, 330, 26)
  firtree(270, 540, 56); firtree(390, 540, 56)
  diamond(330, 190, 9); diamond(330, 452, 9); diamond(330, 600, 8)
  goldDot(330, 230, 3); goldDot(200, 470, 3); goldDot(460, 470, 3)

  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(1.15, 1.15)
  t.anisotropy = 8
  return t
}

// A gold-foil monogram disc for the lid top (transparent background).
function monogramTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const x = c.getContext('2d')
  x.clearRect(0, 0, 256, 256)
  const grd = x.createLinearGradient(70, 70, 190, 190)
  grd.addColorStop(0, '#f0d693')
  grd.addColorStop(0.5, '#c7a24e')
  grd.addColorStop(1, '#9e7c30')
  x.strokeStyle = grd
  x.fillStyle = grd
  x.lineWidth = 3
  x.beginPath(); x.arc(128, 128, 70, 0, Math.PI * 2); x.stroke()
  x.beginPath(); x.arc(128, 128, 60, 0, Math.PI * 2); x.lineWidth = 1.4; x.stroke()
  x.font = '600 96px Georgia, serif'
  x.textAlign = 'center'
  x.textBaseline = 'middle'
  x.fillText('T', 128, 132)
  const t = new THREE.CanvasTexture(c)
  t.anisotropy = 8
  return t
}

function softShadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const x = c.getContext('2d')
  const g = x.createRadialGradient(128, 128, 10, 128, 128, 124)
  g.addColorStop(0, 'rgba(40,28,16,0.5)')
  g.addColorStop(1, 'rgba(40,28,16,0)')
  x.fillStyle = g
  x.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

// A wrapped gift box that unwraps with scroll progress (0..1) and a camera
// that dollies in and dives inside. Reads progressRef.current every frame.
export function GiftBoxScene({ progressRef, onReady }) {
  const mount = useRef(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return
    // WebGL capability check
    try {
      const t = document.createElement('canvas')
      if (!(t.getContext('webgl') || t.getContext('experimental-webgl'))) return
    } catch (e) {
      return
    }

    let width = el.clientWidth
    let height = el.clientHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog('#f1e4c9', 24, 58)

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.06
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // premium warm gradient backdrop (studio sweep)
    const bgC = document.createElement('canvas')
    bgC.width = 8
    bgC.height = 256
    const bgx = bgC.getContext('2d')
    const bgg = bgx.createLinearGradient(0, 0, 0, 256)
    bgg.addColorStop(0, '#fdf7ea')
    bgg.addColorStop(0.55, '#f8edd8')
    bgg.addColorStop(1, '#f1e4c9')
    bgx.fillStyle = bgg
    bgx.fillRect(0, 0, 8, 256)
    scene.background = new THREE.CanvasTexture(bgC)

    // soft gradient environment so gold/metal reflects realistically
    const envC = document.createElement('canvas')
    envC.width = 16
    envC.height = 256
    const envx = envC.getContext('2d')
    const envg = envx.createLinearGradient(0, 0, 0, 256)
    envg.addColorStop(0, '#fff9ec')
    envg.addColorStop(0.5, '#f1deb0')
    envg.addColorStop(1, '#cfae6f')
    envx.fillStyle = envg
    envx.fillRect(0, 0, 16, 256)
    const envTex = new THREE.CanvasTexture(envC)
    envTex.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = envTex

    // ---- materials (luxe matte burgundy + antique gold) ----
    // deep crimson matched to the TanTam logo (#7e1d1a), two-tone motif fields
    const bodyTex = redGoldWrap('#7e1d1a', { bright: '#9e2622' })
    const lidTex = redGoldWrap('#8a201c', { bright: '#a82c28' })
    // double-sided so the interior shows the lined wrap (no z-fighting helper faces)
    const boxMat = new THREE.MeshStandardMaterial({ map: bodyTex, roughness: 0.78, metalness: 0.08, envMapIntensity: 0.55, side: THREE.DoubleSide })
    const lidMat = new THREE.MeshStandardMaterial({ map: lidTex, roughness: 0.72, metalness: 0.1, envMapIntensity: 0.6, side: THREE.DoubleSide })
    const innerMat = new THREE.MeshStandardMaterial({ color: '#3a0f14', roughness: 0.95 })
    // satin-gold cloth: no metalness, soft fabric sheen (not stiff metal)
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: '#d7a23c',
      roughness: 0.52,
      metalness: 0.0,
      sheen: 1.0,
      sheenColor: new THREE.Color('#ffe7ab'),
      sheenRoughness: 0.42,
      clearcoat: 0.18,
      clearcoatRoughness: 0.6,
      envMapIntensity: 0.7,
      emissive: '#4a3611',
      emissiveIntensity: 0.16,
    })
    const monoMat = new THREE.MeshStandardMaterial({
      map: monogramTexture(),
      transparent: true,
      roughness: 0.3,
      metalness: 0.8,
      emissive: '#7a5c1e',
      emissiveIntensity: 0.15,
    })
    const glowMat = new THREE.MeshBasicMaterial({ color: '#ffdca0', transparent: true, opacity: 0 })

    // ---- desk + soft shadow ----
    const desk = new THREE.Mesh(
      new THREE.CircleGeometry(60, 64),
      new THREE.MeshStandardMaterial({ color: '#f3e6cb', roughness: 0.96 }),
    )
    desk.rotation.x = -Math.PI / 2
    desk.position.y = -0.01
    desk.receiveShadow = true
    scene.add(desk)

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(17, 17),
      new THREE.MeshBasicMaterial({ map: softShadowTexture(), transparent: true, depthWrite: false }),
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = 0.02
    scene.add(shadow)

    // ---- gift box group (idle bob/rotate) ----
    const gift = new THREE.Group()
    gift.scale.setScalar(1.16) // bigger, commanding launch box (without clipping)
    scene.add(gift)

    // box body: bottom + 4 walls (open top), so the camera can see inside
    const W = 5.6
    const H = 3.4
    const T = 0.32
    const body = new THREE.Group()
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(W, T, W), boxMat)
    bottom.position.y = T / 2
    bottom.castShadow = bottom.receiveShadow = true
    body.add(bottom)
    const wallGeoX = new THREE.BoxGeometry(W, H, T)
    const wallGeoZ = new THREE.BoxGeometry(T, H, W)
    const wy = T + H / 2
    const mkWall = (geo, x, z) => {
      const m = new THREE.Mesh(geo, boxMat)
      m.position.set(x, wy, z)
      m.castShadow = m.receiveShadow = true
      body.add(m)
    }
    mkWall(wallGeoX, 0, W / 2 - T / 2)
    mkWall(wallGeoX, 0, -(W / 2 - T / 2))
    mkWall(wallGeoZ, W / 2 - T / 2, 0)
    mkWall(wallGeoZ, -(W / 2 - T / 2), 0)
    // dark interior liner floor so the cavity reads with depth
    const liner = new THREE.Mesh(new THREE.PlaneGeometry(W - T * 1.6, W - T * 1.6), innerMat)
    liner.rotation.x = -Math.PI / 2
    liner.position.y = T + 0.02
    body.add(liner)
    gift.add(body)

    // inner glow plane + light (the warmth that spills out when opened)
    const glowPlane = new THREE.Mesh(new THREE.PlaneGeometry(W - T, W - T), glowMat)
    glowPlane.rotation.x = -Math.PI / 2
    glowPlane.position.y = T + 0.05
    gift.add(glowPlane)
    const innerLight = new THREE.PointLight('#ffce86', 0, 18, 2)
    innerLight.position.set(0, 1.6, 0)
    gift.add(innerLight)

    // ---- contents: little gifts + ornament that bloom out ----
    const contents = new THREE.Group()
    contents.position.y = T + 0.2
    gift.add(contents)
    const giftColors = ['#7e1d1a', '#c7a24e', '#f3e7c9', '#a8362c']
    const minis = []
    for (let i = 0; i < 5; i++) {
      const s = 0.7 + Math.random() * 0.5
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(s, s, s),
        new THREE.MeshStandardMaterial({ color: giftColors[i % giftColors.length], roughness: 0.6 }),
      )
      const ang = (i / 5) * Math.PI * 2
      m.position.set(Math.cos(ang) * 1.3, 0, Math.sin(ang) * 1.3)
      m.rotation.set(Math.random(), Math.random(), Math.random())
      m.castShadow = true
      m.userData = { ang, rise: 1.6 + Math.random() * 2.2, spin: 0.4 + Math.random() }
      contents.add(m)
      minis.push(m)
    }
    const ornament = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.MeshPhysicalMaterial({ color: '#eccf80', roughness: 0.24, metalness: 0.72, envMapIntensity: 1.2, clearcoat: 0.7, emissive: '#6a5018', emissiveIntensity: 0.2 }),
    )
    ornament.position.y = 0.2
    ornament.castShadow = true
    contents.add(ornament)

    // sparkle particles
    const sparkleCount = 90
    const sp = new Float32Array(sparkleCount * 3)
    const spSeed = []
    for (let i = 0; i < sparkleCount; i++) {
      const r = Math.random() * 2.2
      const a = Math.random() * Math.PI * 2
      sp[i * 3] = Math.cos(a) * r
      sp[i * 3 + 1] = Math.random() * 0.5
      sp[i * 3 + 2] = Math.sin(a) * r
      spSeed.push({ a, r, y: Math.random(), speed: 0.4 + Math.random() * 0.8 })
    }
    const spGeo = new THREE.BufferGeometry()
    spGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
    const sparkles = new THREE.Points(
      spGeo,
      new THREE.PointsMaterial({ color: '#ffdca0', size: 0.16, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    )
    sparkles.position.y = T + 0.4
    gift.add(sparkles)

    // ---- lid (separate, lifts off) ----
    const lid = new THREE.Group()
    const lidTop = new THREE.Mesh(new THREE.BoxGeometry(W + 0.5, 0.5, W + 0.5), lidMat)
    lidTop.castShadow = true
    lid.add(lidTop)
    // gold-foil monogram embossed on the lid top
    const mono = new THREE.Mesh(new THREE.PlaneGeometry((W + 0.5) * 0.46, (W + 0.5) * 0.46), monoMat)
    mono.rotation.x = -Math.PI / 2
    mono.position.y = 0.26
    lid.add(mono)
    const lipH = 0.9
    const lipX = new THREE.BoxGeometry(W + 0.5, lipH, T)
    const lipZ = new THREE.BoxGeometry(T, lipH, W + 0.5)
    ;[
      [lipX, 0, (W + 0.5) / 2 - T / 2],
      [lipX, 0, -((W + 0.5) / 2 - T / 2)],
      [lipZ, (W + 0.5) / 2 - T / 2, 0],
      [lipZ, -((W + 0.5) / 2 - T / 2), 0],
    ].forEach(([g, x, z]) => {
      const m = new THREE.Mesh(g, lidMat)
      m.position.set(x, -lipH / 2 - 0.25 + 0.25, z)
      m.castShadow = true
      lid.add(m)
    })
    const lidClosedY = H + T + 0.25
    lid.position.y = lidClosedY
    gift.add(lid)

    // ---- ribbon group (soft cloth wrap + bow), pulls off first ----
    const ribbon = new THREE.Group()
    const lidTopY = lidClosedY + 0.25
    // Two continuous satin straps that climb each face, crest softly over the
    // lid and fall back down the far facehugging the silhouette so nothing
    // sticks out past the edges. A faint outward bulge mid-face reads as slack.
    const runZ = W / 2 + 0.12
    const apexY = lidTopY + 0.16
    const drape = [
      [runZ, 0.1], [runZ + 0.06, 1.4], [runZ + 0.06, 2.7], [runZ, lidTopY - 0.45],
      [runZ - 0.5, lidTopY + 0.04], [runZ * 0.5, apexY - 0.03], [0, apexY],
      [-runZ * 0.5, apexY - 0.03], [-(runZ - 0.5), lidTopY + 0.04],
      [-runZ, lidTopY - 0.45], [-(runZ + 0.06), 2.7], [-(runZ + 0.06), 1.4], [-runZ, 0.1],
    ]
    const wrapZ = new THREE.Mesh(softWrapGeo(drape, 1.06, 0.12, 'z'), ribbonMat)
    const wrapX = new THREE.Mesh(softWrapGeo(drape, 1.06, 0.12, 'x'), ribbonMat)
    wrapX.position.y = 0.02 // sit a hair higher so the crossing reads as over/under
    ribbon.add(wrapZ, wrapX)
    // bow: soft flared fabric loops + a gathered centre knot
    const bow = new THREE.Group()
    bow.position.y = lidTopY + 0.16
    // teardrop loop that swells at the outer tip and pinches at the knot, with a
    // little downward droop on the far side (gravity) so it reads as cloth
    const loopCurve = (sx) => new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(sx * 0.28, 0.44, 0.05),
      new THREE.Vector3(sx * 0.74, 0.60, 0.0),
      new THREE.Vector3(sx * 1.16, 0.30, -0.06),
      new THREE.Vector3(sx * 1.0, -0.12, -0.05),
      new THREE.Vector3(sx * 0.44, -0.24, 0.0),
      new THREE.Vector3(sx * 0.1, -0.06, 0.0),
    ], true, 'catmullrom', 0.5)
    const mkLoop = (sx) => {
      const m = new THREE.Mesh(new THREE.TubeGeometry(loopCurve(sx), 90, 0.125, 16, true), ribbonMat)
      m.scale.z = 0.36 // flatten so each loop reads as a flat ribbon, not rope
      m.rotation.x = -0.34 // droop back
      m.rotation.z = sx * 0.13 // splay outward
      return m
    }
    const loopL = mkLoop(-1)
    const loopR = mkLoop(1)
    bow.add(loopL, loopR)
    // gathered centre knot — a small folded band (not a bead)
    const knotGeo = new THREE.ExtrudeGeometry(roundedRectShape(0.32, 0.46, 0.15), {
      depth: 0.32, steps: 1, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2,
    })
    knotGeo.center()
    const knot = new THREE.Mesh(knotGeo, ribbonMat)
    knot.position.set(0, 0.04, 0.04)
    knot.rotation.x = -0.1
    bow.add(knot)
    // a soft, warm gold star crowning the gift — rounded points, puffier body,
    // tilted toward the camera so it catches the light (no dark silhouette)
    const starShape = new THREE.Shape()
    const spikes = 5, ro = 0.56, ri = 0.27
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? ro : ri
      const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      i === 0 ? starShape.moveTo(x, y) : starShape.lineTo(x, y)
    }
    starShape.closePath()
    const starGeo = new THREE.ExtrudeGeometry(starShape, { depth: 0.2, bevelEnabled: true, bevelSize: 0.07, bevelThickness: 0.06, bevelSegments: 3 })
    starGeo.center()
    const starMat = new THREE.MeshPhysicalMaterial({ color: '#f2d486', roughness: 0.36, metalness: 0.42, envMapIntensity: 1.0, clearcoat: 0.5, clearcoatRoughness: 0.42, emissive: '#7c5d1d', emissiveIntensity: 0.45 })
    const star = new THREE.Mesh(starGeo, starMat)
    star.position.set(0, 0.86, 0.14)
    star.rotation.x = 0.3 // lean the face toward the front-above camera
    star.castShadow = true
    bow.add(star)
    // two soft tails fanning over the lid (these retract first"pulling threads")
    const tailShape = roundedRectShape(0.34, 0.08, 0.04)
    const tailGeo = new THREE.ExtrudeGeometry(tailShape, {
      depth: 2.1, steps: 1, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1,
    })
    const tailL = new THREE.Mesh(tailGeo, ribbonMat)
    tailL.position.set(-0.14, -0.05, 0.16)
    tailL.rotation.set(0.22, 0.4, 0.05)
    const tailR = new THREE.Mesh(tailGeo, ribbonMat)
    tailR.position.set(0.14, -0.05, 0.16)
    tailR.rotation.set(0.22, -0.4, -0.05)
    bow.add(tailL, tailR)
    ribbon.add(bow)
    gift.add(ribbon)

    // make ribbon materials able to fade
    ribbonMat.transparent = true
    starMat.transparent = true

    // ---- surrounding gift scene (props around the hero box) ----
    const props = new THREE.Group()
    scene.add(props)
    const smallWrap = redGoldWrap('#7e1d1a', { bright: '#9e2622' })
    const smallGift = (size, x, z, rot, gold) => {
      const grp = new THREE.Group()
      const mat = new THREE.MeshStandardMaterial({ map: gold ? lidTex : smallWrap, roughness: 0.8, metalness: 0.08, envMapIntensity: 0.5 })
      const box = new THREE.Mesh(new THREE.BoxGeometry(size, size * 0.82, size), mat)
      box.position.y = size * 0.41
      box.castShadow = box.receiveShadow = true
      grp.add(box)
      const rW = size * 0.13
      const r1 = new THREE.Mesh(new THREE.BoxGeometry(rW, size * 0.84, size * 1.02), ribbonMat)
      const r2 = new THREE.Mesh(new THREE.BoxGeometry(size * 1.02, size * 0.84, rW), ribbonMat)
      r1.position.y = r2.position.y = size * 0.41
      const knot = new THREE.Mesh(new THREE.SphereGeometry(size * 0.15, 16, 16), ribbonMat)
      knot.position.y = size * 0.82
      grp.add(r1, r2, knot)
      grp.position.set(x, 0, z)
      grp.rotation.y = rot
      grp.userData = { phase: Math.random() * 6, spin: (Math.random() - 0.5) * 0.4 }
      props.add(grp)
    }
    smallGift(2.3, -8.6, 0.5, 0.4, false)
    smallGift(1.9, 8.4, -0.8, -0.5, true)
    smallGift(1.5, 6.4, 3.2, 0.2, false)

    const ornGold = new THREE.MeshPhysicalMaterial({ color: '#eccf80', roughness: 0.24, metalness: 0.7, envMapIntensity: 1.15, clearcoat: 0.6, emissive: '#5a4416', emissiveIntensity: 0.12 })
    const ornRed = new THREE.MeshStandardMaterial({ color: '#7e1d1a', roughness: 0.3, metalness: 0.5, envMapIntensity: 0.8 })
    const ornamentProp = (r, x, y, z, mat) => {
      const o = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 24), mat)
      o.position.set(x, y, z)
      o.castShadow = true
      o.userData = { phase: Math.random() * 6, baseY: y, float: true }
      props.add(o)
    }
    ornamentProp(0.7, -9.8, 0.7, 1.8, ornGold)
    ornamentProp(0.55, 9.8, 0.55, 1.4, ornRed)

    // ---- ambient gold dust (whole scene) ----
    const dustCount = 140
    const dustPos = new Float32Array(dustCount * 3)
    const dustSeed = []
    for (let i = 0; i < dustCount; i++) {
      const x = (Math.random() - 0.5) * 32
      const y = Math.random() * 17
      const z = (Math.random() - 0.5) * 26
      dustPos[i * 3] = x
      dustPos[i * 3 + 1] = y
      dustPos[i * 3 + 2] = z
      dustSeed.push({ x, z, sp: 0.15 + Math.random() * 0.4, ph: Math.random() * 6 })
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: '#e6c87a', size: 0.09, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }))
    scene.add(dust)

    // ---- lights (warm studio that flatters burgundy + gold) ----
    scene.add(new THREE.AmbientLight('#efe3cc', 0.34))
    const hemi = new THREE.HemisphereLight('#ffeccb', '#5a3a2e', 0.42)
    scene.add(hemi)
    // key: a soft spotlight from upper-left for a product-shot falloff
    const key = new THREE.SpotLight('#fff1d6', 2.1, 60, 0.7, 0.6, 1.2)
    key.position.set(-11, 17, 11)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    key.shadow.camera.near = 1
    key.shadow.camera.far = 60
    key.shadow.bias = -0.0004
    scene.add(key)
    key.target.position.set(0, 2, 0)
    scene.add(key.target)
    // gold-catching rim from behind
    const rim = new THREE.DirectionalLight('#ffe6a8', 0.9)
    rim.position.set(9, 7, -10)
    scene.add(rim)
    // cool kicker for separation
    const kick = new THREE.DirectionalLight('#cfe0ff', 0.35)
    kick.position.set(7, 3, 8)
    scene.add(kick)
    // subtle warm backdrop glow plane behind the box
    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 70),
      new THREE.MeshBasicMaterial({ color: '#f4ead6', fog: false }),
    )
    backdrop.position.set(0, 18, -30)
    scene.add(backdrop)

    if (onReady) onReady()

    // ---- resize ----
    const onResize = () => {
      width = el.clientWidth
      height = el.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    // ---- animation loop ----
    const clock = new THREE.Clock()
    let raf
    // smoothed camera state
    const camPos = new THREE.Vector3(6.8, 10.2, 23.5)
    const camTarget = new THREE.Vector3(0, 8.4, 0)
    const tmpPos = new THREE.Vector3()
    const tmpTar = new THREE.Vector3()

    function animate() {
      const t = clock.getElapsedTime()
      const p = clamp01(progressRef?.current ?? 0)

      // progress segments
      const pPull = seg(p, 0.0, 0.12) // tails retract
      const pRibbon = seg(p, 0.08, 0.32) // ribbon lifts & fades off
      const pLid = seg(p, 0.3, 0.56) // lid lifts/tilts away
      const pBloom = seg(p, 0.48, 0.78) // contents rise, glow, sparkles
      const pDive = seg(p, 0.7, 1.0) // camera dives in (after the contents beat)
      const idle = 1 - seg(p, 0.0, 0.2)

      // idle bob + slow turn (settles as you scroll)
      gift.position.y = Math.sin(t * 1.1) * 0.12 * idle
      gift.rotation.y = Math.sin(t * 0.4) * 0.12 * idle + p * 0.25
      shadow.material.opacity = 0.55 - pDive * 0.4

      // surrounding props: gentle idle motion, hidden once we dive in
      props.children.forEach((pr) => {
        const u = pr.userData
        if (u.float) {
          pr.position.y = u.baseY + Math.sin(t * 0.8 + u.phase) * 0.2
          pr.rotation.y += 0.005
        } else {
          pr.position.y = Math.sin(t * 0.7 + u.phase) * 0.12
          pr.rotation.y += 0.0015 + u.spin * 0.003
        }
      })
      props.visible = pDive < 0.55

      // ambient gold dust drift
      const dpos = dust.geometry.attributes.position
      for (let i = 0; i < dustCount; i++) {
        const s = dustSeed[i]
        dpos.array[i * 3 + 1] = ((s.ph / 6 + t * 0.02 * s.sp) % 1) * 17
        dpos.array[i * 3] = s.x + Math.sin(t * 0.3 + s.ph) * 0.6
      }
      dpos.needsUpdate = true
      dust.material.opacity = 0.5 * (1 - pDive)

      // pull tails: retract into bow then ribbon loosens
      tailL.scale.z = 1 - pPull * 0.9
      tailR.scale.z = 1 - pPull * 0.9
      bow.scale.setScalar(1 + pPull * 0.12 - pRibbon * 0.2)

      // ribbon lifts straight up, expands slightly, fades out
      ribbon.position.y = pRibbon * 7
      ribbon.scale.setScalar(1 + pRibbon * 0.18)
      ribbonMat.opacity = 1 - pRibbon
      starMat.opacity = 1 - pRibbon
      ribbon.visible = ribbonMat.opacity > 0.02

      // lid: lift up, slide back, tilt off
      lid.position.y = lidClosedY + pLid * 6.5
      lid.position.x = pLid * 4.5
      lid.position.z = pLid * 1.5
      lid.rotation.z = -pLid * 0.7
      lid.rotation.x = pLid * 0.2
      lid.visible = pLid < 0.995

      // contents bloom
      contents.children.forEach((m, i) => {
        if (m === ornament) {
          ornament.scale.setScalar(0.001 + pBloom)
          ornament.position.y = 0.2 + pBloom * 1.4
          ornament.rotation.y = t * 0.6
        } else {
          const u = m.userData
          m.scale.setScalar(0.001 + pBloom)
          m.position.y = pBloom * u.rise
          m.position.x = Math.cos(u.ang + pBloom * 0.6) * 1.3 * (0.6 + pBloom * 0.7)
          m.position.z = Math.sin(u.ang + pBloom * 0.6) * 1.3 * (0.6 + pBloom * 0.7)
          m.rotation.x += 0.01 * u.spin
          m.rotation.y += 0.012 * u.spin
        }
      })

      // glow + inner light
      glowMat.opacity = pBloom * 0.85
      innerLight.intensity = pLid * 6 + pBloom * 26
      glowPlane.scale.setScalar(1 + pBloom * 0.6)

      // sparkles rise + twinkle
      sparkles.material.opacity = pBloom * (0.55 + 0.45 * Math.sin(t * 3))
      const pos = sparkles.geometry.attributes.position
      for (let i = 0; i < sparkleCount; i++) {
        const s = spSeed[i]
        const yy = ((s.y + t * 0.12 * s.speed) % 1)
        pos.array[i * 3 + 1] = yy * 5 * pBloom
        pos.array[i * 3] = Math.cos(s.a + t * 0.2 * s.speed) * s.r
        pos.array[i * 3 + 2] = Math.sin(s.a + t * 0.2 * s.speed) * s.r
      }
      pos.needsUpdate = true

      // ---- camera choreography ----
      // 1) close, commanding 3/4 hero shot  2) rise to look down as lid opens
      //    3) dive inside to the glow
      // start: box small + low (bottom third) so the headline reads on clean
      // cream above it; as you scroll it grows/centres to unwrap.
      tmpPos.set(
        lerp(6.8, 0, pDive),
        lerp(10.2, lerp(10.8, 3.2, pDive), Math.max(pLid, pDive)),
        lerp(23.5, lerp(8.0, 0.5, pDive), Math.max(pLid, pDive)),
      )
      // gentle mouse-free orbit before opening
      tmpPos.x += Math.sin(t * 0.22) * 0.35 * idle
      tmpTar.set(0, lerp(8.4, lerp(2.4, -2.2, pDive), Math.max(pLid, pDive)), 0)

      camPos.lerp(tmpPos, 0.07)
      camTarget.lerp(tmpTar, 0.09)
      camera.position.copy(camPos)
      camera.lookAt(camTarget)

      // fade whole canvas out at the very end (hand off to the site)
      renderer.domElement.style.opacity = String(1 - seg(p, 0.92, 1.0))

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
      })
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [progressRef, onReady])

  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />
}
