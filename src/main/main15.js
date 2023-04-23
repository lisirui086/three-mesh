/* 
  创建球体和环境贴图
*/
// 1. 引入threejs
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 设置cube纹理加器
const cubeTextureLoader = new THREE.CubeTextureLoader()
// 环境纹理
// 六张图片分别是朝前的（posz）、朝后的（negz）、
// 朝上的（posy）、朝下的（negy）、
// 朝右的（posx）和朝左的（negx）。
// 设置cube纹理加载器
import px from '../assets/image/textures/environmentMaps/1/px.jpg'
import nx from '../assets/image/textures/environmentMaps/1/nx.jpg'
import py from '../assets/image/textures/environmentMaps/1/py.jpg'
import ny from '../assets/image/textures/environmentMaps/1/ny.jpg'
import pz from '../assets/image/textures/environmentMaps/1/pz.jpg'
import nz from '../assets/image/textures/environmentMaps/1/nz.jpg'
const envMapTexture = cubeTextureLoader.load([
  px, nx,
  py, ny,
  pz,nz
])
// 2. 创建场景
const scene = new THREE.Scene()
// 2. 创建摄像机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
// 2.1 将相机、物体添加到场景
scene.add(camera)
// 添加环境光
const light = new THREE.AmbientLight(0xffffff)
// 添加平行光
const directional = new THREE.DirectionalLight(0xffffff, 0.5)
// 设置平行光照射位置
directional.position.set(10, 10, 10)
// 将环境光添加到场景
scene.add(light)
scene.add(directional)
// 创建几何体 物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
// 添加vu2
/* sphereGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2)
) */
// 标准网格材质 创建材质
const meshMaterial = new THREE.MeshStandardMaterial({
  // 设置金属度
  metalness: 0.7,
  // // 粗糙度
  roughness: 0.1,
  // 设置环境纹理
  envMap: envMapTexture
})
// 将环境贴图应用到场景背景
scene.background = envMapTexture
// 球体
const sphere = new THREE.Mesh(sphereGeometry, meshMaterial)
// 将球体添加到场景
scene.add(sphere)



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