import * as Orillusion from "@orillusion/core";
console.log(Orillusion);

import {
  Engine3D,
  Scene3D,
  Object3D,
  Camera3D,
  ForwardRenderJob,
  LitMaterial,
  BoxGeometry,
  MeshRenderer,
  DirectLight,
  Color,
  HoverCameraController,
} from "@orillusion/core";

(async () => {
  await Engine3D.init();

  const scene3D = new Orillusion.Scene3D();

  // 新建摄像机实例
  let cameraObj: Object3D = new Object3D();
  let camera = cameraObj.addComponent(Camera3D);
  // 根据窗口大小设置摄像机视角
  camera.perspective(60, window.innerWidth / window.innerHeight, 1, 5000.0);
  // 设置相机控制器
  let controller = camera.object3D.addComponent(HoverCameraController);
  controller.setCamera(0, 0, 15);
  // 添加相机节点
  scene3D.addChild(cameraObj);

  // 新建光照
  let light: Object3D = new Object3D();
  // 添加直接光组件
  let component = light.addComponent(DirectLight);
  // 调整光照参数
  light.rotationX = 45;
  light.rotationY = 30;
  component.lightColor = new Color(1.0, 0.6, 0.6, 1);
  component.intensity = 2;
  // 添加光照对象
  scene3D.addChild(light);

  // 新建对象
  const obj = new Object3D();
  // 为对象添 MeshRenderer
  let mr = obj.addComponent(MeshRenderer);
  // 设置几何体
  mr.geometry = new BoxGeometry(5, 5, 5);
  // 设置材质
  mr.material = new LitMaterial();

  scene3D.addChild(obj);

  // 新建前向渲染业务
  let renderJob = new ForwardRenderJob(scene3D);
  // 开始渲染
  Engine3D.startRender(renderJob);
})();
