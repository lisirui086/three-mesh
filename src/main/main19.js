/* 
  聚光灯各种属性与应用
*/
// 1. 引入threejs
import * as THREE from 'three'
// 引入dat.gui
import * as dat from 'dat.gui'
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
// 添加平行光
const spot = new THREE.SpotLight(0xffffff, 1)
// 设置平行光照射位置
spot.position.set(5,5,5)
// 产生动态阴影
spot.castShadow = true
// 设置阴影边缘模糊度
spot.shadow.radius = 20
// 设置阴影贴图的分辨路
spot.shadow.mapSize.set(2048, 2048)
// 设置聚光灯位置
spot.angle = Math.PI / 6
// 设置聚光灯距离线衰
spot.distance = 0
// 聚光锥的半影衰减百分比。在0和1之间的值。默认为0
spot.penumbra = 0
// 沿着光照距离的衰减量。
spot.decay = 0
scene.add(spot)
// 创建环境光
const ambient = new THREE.AmbientLight(0xffffff)
// 将环境光添加到场景
scene.add(ambient)
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
// 设置聚光灯目标 对球体
spot.target = sphere
// 光照强度
spot.intensity = 2
// 创建几何体 平面
const planeGeometry = new THREE.PlaneGeometry(50, 50)
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
// 是否使用物理上正确的光照模式。 默认是false。
rennder.physicallyCorrectLights = true
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
// 创建dat实例
const gui = new dat.GUI()
// 控制球体的x轴位移
gui
  .add(sphere.position, 'x')
  .min(-5)
  .max(5)
  .step(0.1)
// 聚光灯 spot的文件夹
const spotFolder = gui.addFolder('控制聚光灯参数')
// 控制聚光灯弧度调整
spotFolder
  .add(spot, 'angle')
  .min(0)
  .max(Math.PI / 2)
  .step(0.01)
// 控制聚光灯从光源发出光的最大距离
spotFolder
  .add(spot, 'distance')
  .min(0)
  .max(10)
  .step(0.01)
// 控制聚光锥的半影衰减百分比。在0和1之间的值。默认为0
spotFolder
  .add(spot, 'penumbra')
  .min(0)
  .max(1)
  .step(0.01)
// 控制 沿着光照距离的衰减量。
spotFolder
  .add(spot, 'decay')
  .min(0)
  .max(1)
  .step(0.01)
// 光照强度
spotFolder
  .add(spot, 'intensity')
  .min(0)
  .max(10)
  .step(0.01)
