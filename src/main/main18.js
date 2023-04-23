/* 
  平行光阴影与阴影相机原理
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
// 添加环境光
const light = new THREE.AmbientLight(0xffffff)
// 添加平行光
const directional = new THREE.DirectionalLight(0xffffff, 1)
// 设置平行光照射位置
directional.position.set(5,5,5)
// 产生动态阴影
directional.castShadow = true
// 设置阴影边缘模糊度
directional.shadow.radius = 20
// 设置阴影贴图的分辨路
directional.shadow.mapSize.set(2048, 2048)
// 设置平行光投射相机的属性
// 设置灯光阴影相机的近剪切面的参数
directional.shadow.camera.near = 0.5
// 灯光阴影相机视锥体的远剪切面的距离 默认500
directional.shadow.camera.far = 500
// 灯光阴影相机视锥体的右侧平面的位置  默认值为相机视锥体的宽度的一半
directional.shadow.camera.right = 5
// 灯光阴影相机视锥体的左侧平面的位置。默认值为相机视锥体的宽度的一半的负值
directional.shadow.camera.left = -5
// 灯光阴影相机视锥体的上侧平面的位置。默认值为相机视锥体高度的一半
directional.shadow.camera.top = 5
// 灯光阴影相机视锥体的下侧平面的位置 默认值为相机视锥体高度的一半的负值
directional.shadow.camera.bottom = -5
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
// 创建dat实例
const gui = new dat.GUI()
gui
  .add(directional.shadow.camera, 'near')
  .min(0)
  .max(10)
  .step(0.1)
  .onFinishChange(() => {
    directional.shadow.camera.updateProjectionMatrix()
  })