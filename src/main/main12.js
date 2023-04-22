/* 
  金属度与金属贴图
*/
// 1. 引入threejs
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 引入图片
import green from '../assets/image/green.png'
import desert from '../assets/image/desert.jpg'
import people from '../assets/image/people.jpg'
// 门
import door from '../assets/image/textures/door/color.jpg'
// 透明
import alphaMap from '../assets/image/textures/door/alpha.jpg'
// AO
import doorAoTextureImg from '../assets/image/textures/door/ambientOcclusion.jpg'
// 置换图
import doorHightTextureImg from '../assets/image/textures/door/height.jpg'
// 16*16
import kenan16 from '../assets/image/1616.png'
// 粗糙图
import roughnessTextureImg from '../assets/image/textures/door/roughness.jpg'
// 今属土
import metalnessTextureImg from '../assets/image/textures/door/metalness.jpg'
// 引入纹理
const texture = new THREE.TextureLoader().load(door)
// 透明纹理
const alphaMaptexture = new THREE.TextureLoader().load(alphaMap)
// Ao
const doorAoTexture = new THREE.TextureLoader().load(doorAoTextureImg)
// 光照置换图
const doorHightTexture = new THREE.TextureLoader().load(doorHightTextureImg)
// 粗糙贴图
const roughnessTexture = new THREE.TextureLoader().load(roughnessTextureImg)
// 金属图
const metalnessTexture = new THREE.TextureLoader().load(metalnessTextureImg)

// 2. 创建摄像机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
// 2. 创建场景
const scene = new THREE.Scene()
// 3.1 创建几何体
// 添加物体
const geomtry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100)
// 给geomtry添加Ao
geomtry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(geomtry.attributes.uv.array, 2)
)
// 添加材质
const standardMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  map: texture,
  alphaMap: alphaMaptexture,
  transparent: true,
  aoMap: doorAoTexture,
  // 遮罩强度
  aoMapIntensity: 0.5,
  displacementMap: doorHightTexture,
  displacementScale: 0.05,
  // 粗糙贴图
  roughnessMap: roughnessTexture,
  // 0.0表示平滑的镜面反射，1.0表示完全漫反射
  roughness: 1,
  // 材质与金属的相似度
  metalness: 0.5,
  // 金属纹理
  metalnessMap: metalnessTexture
  // opacity: 0.3,
  // side: THREE.DoubleSide
})
const cube = new THREE.Mesh(geomtry, standardMaterial)
// 添加物体
scene.add(cube)
// 添加平面
const planeGemeotry = new THREE.PlaneGeometry(1, 1, 200, 200)
const plane = new THREE.Mesh(
  // 设置几何体
  planeGemeotry,
  standardMaterial
)
// 对平面设置第二组uv
planeGemeotry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(planeGemeotry.attributes.uv.array, 2)
)
// 平面偏移
plane.position.set(1.5,0,0)
// 将平面添加到场景
scene.add(plane)
// 添加环境光
const light = new THREE.AmbientLight(0x404040)
// 添加平行光
const directional = new THREE.DirectionalLight(0xffffff, 0.5)
// 设置平行光照射位置
directional.position.set(10, 10, 10)
// 将环境光添加到场景
// scene.add(light)
scene.add(directional)
// 4.1 初始化渲染器
const rennder = new THREE.WebGLRenderer({ antialias: true })
// 4.2 设置渲染器的尺寸大小
rennder.setSize(window.innerWidth, window.innerHeight)
// 添加轨道控制器
const controls = new OrbitControls(camera, rennder.domElement)
// 添加辅助对象
const axesHelper = new THREE.AxesHelper(5)
// 将辅助对象添加到场景
scene.add(axesHelper)
// 2.1 将相机、物体添加到场景
scene.add(camera)

rennder.setAnimationLoop( animation );
// 5 将WebGL渲染到canvas内容中添加到body
document.body.appendChild(rennder.domElement)
rennder.render(scene, camera)
function animation( time ) {

	// mesh.rotation.x = time / 2000;
	// mesh.rotation.y = time / 1000;

	rennder.render( scene, camera );
}
// 侦听画面变化， 更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = (window.innerWidth/window.innerHeight)
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  rennder.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  rennder.setPixelRatio(window.devicePixelRatio)
})