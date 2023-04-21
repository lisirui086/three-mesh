/* 
  复习使用threejs
*/
// 1. 引入threejs
import * as THREE from 'three'
// 2. 创建摄像机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
// 2. 创建场景
const scene = new THREE.Scene()
// 3.1 创建几何体 x,y,z
const geometry = new THREE.BoxGeometry(1,1,1)
// 3.2 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00a2ff })
// 3.3 根据几何体和材质创建物体
const cube = new THREE.Mesh(geometry, material)
// 4.1 初始化渲染器
const rennder = new THREE.WebGLRenderer({ antialias: true })
// 4.2 设置渲染器的尺寸大小
rennder.setSize(window.innerWidth, window.innerHeight)
// 2.1 将相机、物体添加到场景
scene.add(camera)
scene.add(cube)
rennder.setAnimationLoop( animation );
// 5 将WebGL渲染到canvas内容中添加到body
document.body.appendChild(rennder.domElement)
rennder.render(scene, camera)
function animation( time ) {

	cube.rotation.x = time / 2000;
	cube.rotation.y = time / 1000;

	rennder.render( scene, camera );

}