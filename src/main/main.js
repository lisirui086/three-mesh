/* 
  灯光与阴影的关系
*/
// 1. 引入threejs
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
const directional = new THREE.DirectionalLight(0xffffff, 1)
// 设置平行光照射位置
directional.position.set(10, 10, 10)
// 产生动态阴影
directional.castShadow = true
// 将环境光添加到场景
// scene.add(light)
scene.add(directional)
// 创建几何体 物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
// 标准网格材质 创建材质
const meshMaterial = new THREE.MeshStandardMaterial({})
// 球体
const sphere = new THREE.Mesh(sphereGeometry, meshMaterial)
// 球体投射阴影
sphere.castShadow = true
// 将球体添加到场景
scene.add(sphere)
// 创建几何体 平面
const planeGeometry = new THREE.PlaneGeometry(10, 10)
// 平面
const plane = new THREE.Mesh(planeGeometry, meshMaterial)
// 将平面偏移
plane.position.set(0, -1, 0)
// 将平面旋转
plane.rotation.x = -Math.PI / 2
// 平面接收阴影
plane.receiveShadow = true
// 将平面添加到场景
scene.add(plane)

// 4.1 初始化渲染器
const rennder = new THREE.WebGLRenderer({ antialias: true })
// 4.2 设置渲染器的尺寸大小
rennder.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影图
rennder.shadowMap.enabled = true
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