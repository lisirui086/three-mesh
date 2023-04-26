/* 
  点光源属性与应用
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
// 创建一个小球体
const smallBall = new THREE.Mesh(
  // 几何体
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshStandardMaterial({color:0xff0000})
)
// 小球体位移
smallBall.position.set(2,2,2)
// 添加点光源
const pointLight = new THREE.PointLight(0xff0000, 1)
// 设置点光源照射位置
pointLight.position.set(2,2,2)
// 产生动态阴影
pointLight.castShadow = true
// 设置阴影边缘模糊度
pointLight.shadow.radius = 20
// 设置阴影贴图的分辨路
pointLight.shadow.mapSize.set(512, 512)
// intensity - (可选参数) 光照强度。 缺省值 1。
pointLight.intensity = 1
// 这个距离表示从光源到光照强度为0的位置
pointLight.distance = 0
// decay - 沿着光照距离的衰退量。缺省值 2。
pointLight.decay = 0
/* // 将点光源添加到场景
scene.add(pointLight) */
// 将点光源添加到小球体内
smallBall.add(pointLight)
// 将小球体添加到场景
scene.add(smallBall)
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
pointLight.target = sphere
// 光照强度
pointLight.intensity = 2
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
// 设置时钟
const clock = new THREE.Clock()
rennder.setAnimationLoop( animation )
// 5 将WebGL渲染到canvas内容中添加到body
document.body.appendChild(rennder.domElement)
rennder.render(scene, camera)
function animation() {
  let timer = clock.getElapsedTime()
  // 谨慎开启比较消耗cpu
  // console.log('timer是：', timer)
  /* smallBall.position.x = Math.sin(timer) * 3
  smallBall.position.z = Math.cos(timer) * 3
  smallBall.position.y = 2 +Math.sign(timer) * 0.5
   */
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
// 点光源文件夹
const pointLightFolder = gui.addFolder('点光源参数')
// 点光源光照强度
pointLightFolder
  .add(pointLight, 'intensity')
  .min(0)
  .max(5)
  .step(0.01)
// 点光源这个距离表示从光源到光照强度为0的位置
pointLightFolder
  .add(pointLight, 'distance')
  .min(0)
  .max(5)
  .step(0.01)
// decay - 沿着光照距离的衰退量。缺省值 2。
pointLightFolder
  .add(pointLight, 'decay')
  .min(0)
  .max(5)
  .step(0.01  )