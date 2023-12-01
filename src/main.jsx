import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Raycaster,
  Vector2,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  Vector4,
} from "three";
import App from "./App";

const scene = new THREE.Scene();
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const manager = new THREE.LoadingManager();
const clock = new THREE.Clock();
const clock1 = new THREE.Clock();
const clock2 = new THREE.Clock();
var scene2, renderer2;

var Element = function () {
  var div = document.createElement("div");
  div.style.width = "520px";
  div.style.height = "340px";
  div.style.borderRadius = "10px";
  div.style.backgroundColor = "#000";
  var iframe = document.createElement("iframe");
  iframe.style.width = "520px";
  iframe.style.height = "340px";
  iframe.style.border = "0px";
  iframe.style.borderRadius = "10px";
  iframe.setAttribute("allowfullscreen", true);
  iframe.src = "https://www.youtube.com/embed/r568hvQ4qqE";
  div.appendChild(iframe);
  var object = new CSS3DObject(div);
  object.position.set(610, -400, -1850);
  object.rotation.y = 5.5;
  return object;
};

init();

function init() {
  var container = document.getElementById("container");

  scene2 = new THREE.Scene();
  renderer2 = new CSS3DRenderer();
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  renderer2.domElement.style.top = 0;
  container.appendChild(renderer2.domElement);

  scene2.add(Element());

  window.addEventListener("resize", onWindowResize, false);

  // Block iframe events when dragging camera

  document.addEventListener("mousedown", function () {});
  document.addEventListener("mouseup", function () {});
}

const light = new THREE.PointLight(0xff0f1a, 1, 100);
light.position.set(-3.4, 1, -3.2);
light.lookAt(-3.4, 10, -3.2);
scene.add(light);

const light1 = new THREE.PointLight(0xffffff, 2.3, 100);
light1.position.set(2, 1, 1);
scene.add(light1);
const light2 = new THREE.PointLight(0x5b1800, 3);
light2.position.set(0, -0.1, -1.2);
scene.add(light2);
const light3 = new THREE.PointLight(0xffffff, 3, 100);
light3.position.set(0, -0.2, -1.2);
scene.add(light3);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene.add(camera);
camera.zoom;
camera.position.set(1, 1.5, 1.5);
//camera.position.set(200, 350, 250);
const renderer = new THREE.WebGLRenderer();
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);
spotLight.map = new THREE.TextureLoader().load(light.html);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
//controls.enabled = false;
//controls.enablePan = false;
//controls.enableRotate = false;

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  // Loading başladığında yapılacaklar
  console.log("Loading started");
  showLoadingScreen();
};
loadingManager.onLoad = () => {
  // Tüm dosyalar yüklendiğinde yapılacaklar
  console.log("Loading complete");
  hideLoadingScreen();
};
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  // Dosya yüklendiğinde yapılacaklar
  console.log(
    `Loading file: ${url}. ${itemsLoaded} of ${itemsTotal} files loaded.`
  );
};
loadingManager.onError = (url) => {
  // Yükleme hatası oluştuğunda yapılacaklar
  console.error(`Failed to load file: ${url}`);
};

function showLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  const loadingGif = new Image();
  loadingGif.src = "loading.gif"; // GIF dosyasının URL'si
  loadingScreen.appendChild(loadingGif);
  document.body.appendChild(loadingScreen);

  return loadingGif;
}

function hideLoadingScreen() {
  // Loading ekranını kaldırmak için burada gerekli kodları yazabilirsiniz
  loadingGif.style.display = "none";
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.remove();
}

const loadingGif = showLoadingScreen();
loadingGif.onload = function () {
  const loader = new GLTFLoader();
  loader.load("components/table/scene.gltf", function (gltf) {
    gltf.scene.position.x = 0;
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 0;
    gltf.scene.receiveShadow = false;
    gltf.scene.castShadow = false;
    scene.add(gltf.scene);

    hideLoadingScreen(loadingGif);
  });
};

// Yükleme işlemi burada gerçekleştirilir

const loader = new GLTFLoader(loadingManager);
loader.load("components/table/scene.gltf", function (gltf) {
  gltf.scene.position.x = 0;
  gltf.scene.position.y = 0;
  gltf.scene.position.z = 0;
  scene.add(gltf.scene);
});

loader.load("components/dedeler/DEDE1/DEDE1.gltf", function (dede) {
  dede.scene.position.x = -0.5;
  dede.scene.position.y = -0.2;
  dede.scene.position.z = -0.4;
  dede.scene.scale.set(0.225, 0.225, 0.225);
  dede.scene.rotation.y = THREE.MathUtils.degToRad(90);
  scene.add(dede.scene);
});

loader.load("components/dedeler/DEDE2/DEDE2.gltf", function (dede2) {
  dede2.scene.position.x = -0.1;
  dede2.scene.position.y = -0.2;
  dede2.scene.position.z = 1.2;
  dede2.scene.scale.set(0.21, 0.21, 0.21);
  dede2.scene.rotation.y = THREE.MathUtils.degToRad(180);
  scene.add(dede2.scene);
});
loader.load("components/dedeler/DEDE3/DEDE3.gltf", function (dede3) {
  dede3.scene.position.x = -0.5;
  dede3.scene.position.y = -0.2;
  dede3.scene.position.z = 0.5;
  dede3.scene.scale.set(0.21, 0.21, 0.21);
  dede3.scene.rotation.y = THREE.MathUtils.degToRad(90);
  scene.add(dede3.scene);
});
loader.load("components/dedeler/DEDE5/DEDE5.gltf", function (dede4) {
  dede4.scene.position.x = 0.5;
  dede4.scene.position.y = -0.2;
  dede4.scene.position.z = 0.5;
  dede4.scene.scale.set(0.22, 0.2, 0.2);
  dede4.scene.rotation.y = THREE.MathUtils.degToRad(270);
  scene.add(dede4.scene);
});
loader.load("components/dedeler/DEDE4/DEDE4.gltf", function (dede5) {
  dede5.scene.position.x = 0.5;
  dede5.scene.position.y = -0.2;
  dede5.scene.position.z = -0.4;
  dede5.scene.scale.set(0.21, 0.21, 0.21);
  dede5.scene.rotation.y = THREE.MathUtils.degToRad(270);
  scene.add(dede5.scene);
});

loader.load("components/tv/scene.gltf", function (tv) {
  tv.scene.position.x = 2.7;
  tv.scene.position.y = -0.1;
  tv.scene.position.z = -3.1;
  tv.scene.scale.set(1, 1, 1);
  tv.scene.rotation.y = THREE.MathUtils.degToRad(-50);
  scene.add(tv.scene);
});

loader.load("components/altYazi/altYazi.gltf", function (altYazi) {
  altYazi.scene.position.x = -2.2;
  altYazi.scene.position.y = 1.4;
  altYazi.scene.position.z = -4.2;
  altYazi.scene.scale.set(0.2, 0.2, 0.2);
  altYazi.scene.rotation.y = THREE.MathUtils.degToRad(0);
  scene.add(altYazi.scene);
});

loader.load("components/ortaYazi/ortaYazi.gltf", function (ortaYazi) {
  ortaYazi.scene.position.x = -1.5;
  ortaYazi.scene.position.y = 1.8;
  ortaYazi.scene.position.z = -4.2;
  ortaYazi.scene.scale.set(0.2, 0.2, 0.2);
  ortaYazi.scene.rotation.y = THREE.MathUtils.degToRad(0);
  scene.add(ortaYazi.scene);
});

const romaPromise = new Promise((resolve, reject) => {
  loader.load(
    "components/roma/scene.gltf",
    function (gltf) {
      const roma = gltf.scene;

      roma.position.x = 0.4;
      roma.position.y = 0.44;
      roma.position.z = -3.5;
      roma.scale.set(0.7, 0.7, 0.7);
      roma.rotation.y = THREE.MathUtils.degToRad(-50);
      scene.add(roma);

      resolve(roma);
    },
    undefined,
    reject
  );
});
const kadinPromise = new Promise((resolve, reject) => {
  loader.load(
    "components/kadin/scene.gltf",
    function (gltf) {
      const kadin = gltf.scene;

      kadin.position.x = -1.4;
      kadin.position.y = -0.2;
      kadin.position.z = -3.5;
      kadin.scale.set(0.4, 0.4, 0.4);
      kadin.rotation.y = THREE.MathUtils.degToRad(60);
      scene.add(kadin);

      resolve(kadin);
    },
    undefined,
    reject
  );
});
const bishopPromise = new Promise((resolve, reject) => {
  loader.load(
    "components/bishop/scene.gltf",
    function (gltf) {
      const bishop = gltf.scene;

      bishop.position.x = -0.2;
      bishop.position.y = 0;
      bishop.position.z = -3.5;
      bishop.scale.set(0.06, 0.06, 0.06);
      bishop.rotation.y = THREE.MathUtils.degToRad(0);
      scene.add(bishop);

      resolve(bishop);
    },
    undefined,
    reject
  );
});

const ejderyamodel = new Promise((resolve, reject) => {
  loader.load(
    "components/deneme/scene.gltf",
    function (ejderya1) {
      const ejderya = ejderya1.scene;
      ejderya.position.x = -2.0;
      ejderya.position.y = 0;
      ejderya.position.z = 0.5;
      ejderya.scale.set(0.001, 0.001, 0.001);
      ejderya.rotation.y = THREE.MathUtils.degToRad(-90);
      scene.add(ejderya);

      resolve(ejderya);
    },
    undefined,
    reject
  );
});

const compassmo = new Promise((resolve, reject) => {
  loader.load(
    "components/compass2/scene.gltf",
    function (compassgltf) {
      const compass = compassgltf.scene;
      compass.position.x = -0.14;
      compass.position.y = 0.4;
      compass.position.z = 0.5;
      compass.scale.set(0.001, 0.001, 0.001);
      compass.rotation.y = THREE.MathUtils.degToRad(90);
      scene.add(compass);

      resolve(compass);
    },
    undefined,
    reject
  );
});

const thornmo = new Promise((resolve, reject) => {
  loader.load(
    "components/thorn/scene.gltf",
    function (thorn1) {
      const thorn = thorn1.scene;
      thorn.position.x = -0;
      thorn.position.y = -0.2;
      thorn.position.z = -1.2;
      thorn.scale.set(0.4, 0.4, 0.4);
      thorn.rotation.y = THREE.MathUtils.degToRad(-90);
      controls.target = thorn.position;
      controls.enablePan = false;
      scene.add(thorn);

      resolve(thorn);
    },
    undefined,
    reject
  );
});

// Fare olaylarını dinleme
document.addEventListener("click", function (event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  romaPromise.then((roma) => {
    const intersects = raycaster.intersectObject(roma, true);

    if (intersects.length > 0) {
      // Tıklama işlemi gerçekleştiğinde başka bir sayfaya yönlendirme
      window.open("https://kilopi.net/mom/", "_blank");
    }
  });
  kadinPromise.then((kadin) => {
    const intersects = raycaster.intersectObject(kadin, true);

    if (intersects.length > 0) {
      // Kadın'a tıklandığında başka bir sayfaya yönlendirme
      window.open("https://kilopi.net/mom/", "_blank");
    }
  });
  bishopPromise.then((bishop) => {
    const intersects = raycaster.intersectObject(bishop, true);

    if (intersects.length > 0) {
      // Bishop'a tıklandığında başka bir sayfaya yönlendirme
      window.open("https://kilopi.net/mom/", "_blank");
    }
  });
  ejderyamodel.then((ejderya) => {
    const intersects = raycaster.intersectObject(ejderya, true);

    if (intersects.length > 0) {
      // Bishop'a tıklandığında başka bir sayfaya yönlendirme
      window.open("https://kilopi.net/skallia/", "_blank");
    }
  });
  compassmo.then((compass) => {
    const intersects = raycaster.intersectObject(compass, true);

    if (intersects.length > 0) {
      // Bishop'a tıklandığında başka bir sayfaya yönlendirme
      window.open("https://kilopi.net/pathfinder/", "_blank");
    }
  });
  thornmo.then((thorn) => {
    const intersects = raycaster.intersectObject(thorn, true);

    if (intersects.length > 0) {
      // Bishop'a tıklandığında başka bir sayfaya yönlendirme
      window.open("https://kilopi.net/dao/", "_blank");
    }
  });
});

/*const startPosition = new THREE.Vector3(0.2, 2.5, -3); // Başlangıç koordinatı
const endPosition = new THREE.Vector3(-1.7, -0.4, 0.5); // Bitiş koordinatı
const duration = 10; // Hareket süresi (saniye)
let elapsedTime = 0; // Geçen süre
let ejderhaPosition = startPosition.clone(); // Ejderha konumu*/

/*loader.load("components/ejderha/scene.gltf", function (gltf) {
  const ejderha = gltf.scene;
  ejderha.position.copy(startPosition);
  ejderha.rotation.y = THREE.MathUtils.degToRad(0);
  ejderha.scale.set(0.5, 0.5, 0.5);
  scene.add(ejderha);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let isAnimating = false; // Animasyon durumunu izlemek için bir bayrak değişkeni

  function onMouseClick(event) {
    if (!isAnimating) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(ejderha, true);

      if (intersects.length > 0) {
        window.open("https://www.yeni-sayfa.com", "_blank");
      }
    }
  }

  document.addEventListener("click", onMouseClick, false);

  const light4 = new THREE.AmbientLight(0x404040);
  light4.position.set(0.1, 1.5, 0.8);
  light.lookAt(ejderha.position);
  scene.add(light4);

  const mixer = new THREE.AnimationMixer(ejderha);
  const animations = gltf.animations;
  const action = mixer.clipAction(animations[0]);

  // Animasyonu oynat
  action.play();

  // Animasyon hızını ayarla
  mixer.timeScale = 1; // Hız faktörü, istediğiniz değeri deneyebilirsiniz

  function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();
    mixer.update(deltaTime);

    // Hareket süresi boyunca ejderhayı hareket ettirme
    if (elapsedTime < duration) {
      const progress = elapsedTime / duration;
      ejderhaPosition.lerpVectors(startPosition, endPosition, progress);
      ejderha.position.copy(ejderhaPosition);
      elapsedTime += deltaTime;
    }

    renderer.render(scene, camera);
  }

  animate();
});

let compassHovered = false;
let compassLoaded = false;
const compassPromise = new Promise((resolve, reject) => {
  loader.load(
    "components/compass/scene.gltf",
    function (gltf) {
      const compass = gltf.scene;

      compass.position.x = 0;
      compass.position.y = 0.25;
      compass.position.z = 0;
      compass.rotation.y = THREE.MathUtils.degToRad(0);
      compass.scale.set(0.1, 0.1, 0.1);
      scene.add(compass);

      const mixer2 = new THREE.AnimationMixer(compass);
      const animations = gltf.animations;
      const action2 = mixer2.clipAction(animations[0]);
      action2.setDuration(3);
      // Compass yüklendiğinde işaretle
      compassLoaded = true;

      resolve({ compass, mixer2, action2 });
    },
    undefined,
    reject
  );
});
*/
// Işık eklemek için

/*function animate2() {
  requestAnimationFrame(animate2);

  const deltaTime2 = clock2.getDelta();

  if (compassLoaded) {
    // Fare üzerindeyken animasyonu oynat
    if (compassHovered) {
      compassPromise.then(({ mixer2, action2 }) => {
        action2.play();
        mixer2.update(deltaTime2);
      });
    } else {
      compassPromise.then(({ action2 }) => {
        action2.stop();
      });
    }
  }

  renderer.render(scene, camera);
}

// Fare olaylarını dinleme
document.addEventListener("click", function (event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  compassPromise.then(({ compass }) => {
    const intersects = raycaster.intersectObject(compass, true);

    if (intersects.length > 0) {
      // Tıklama işlemi gerçekleştiğinde başka bir sayfaya yönlendirme
      window.open("https://kilopi.net/pathfinder/", "_blank");
    }
  });
});

document.addEventListener("mousemove", function (event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  compassPromise.then(({ compass }) => {
    const intersects = raycaster.intersectObject(compass, true);

    if (intersects.length > 0) {
      compassHovered = true; // Parlaklık ayarı
    } else {
      compassHovered = false;
    }
  });
});

animate2();
*/
let chestHovered = false;
let chestLoaded = false;

const chestPromise = new Promise((resolve, reject) => {
  loader.load(
    "components/chest/scene.gltf",
    function (gltf) {
      const chest = gltf.scene;

      chest.position.x = 3.5;
      chest.position.y = 0;
      chest.position.z = -1.4;
      chest.rotation.y = THREE.MathUtils.degToRad(270);
      chest.scale.set(0.01, 0.01, 0.01);
      scene.add(chest);

      const mixer1 = new THREE.AnimationMixer(chest);
      const animations = gltf.animations;
      const action1 = mixer1.clipAction(animations[0]);
      action1.setDuration(3);
      // Chest yüklendiğinde işaretle
      chestLoaded = true;

      resolve({ chest, mixer1, action1 });
    },
    undefined,
    reject
  );
});

function animate1() {
  requestAnimationFrame(animate1);

  const deltaTime1 = clock1.getDelta();

  if (chestLoaded) {
    // Fare üzerindeyken animasyonu oynat
    if (chestHovered) {
      chestPromise.then(({ mixer1, action1 }) => {
        action1.play();
        mixer1.update(deltaTime1);
      });
    } else {
      chestPromise.then(({ action1 }) => {
        action1.stop();
      });
    }
  }

  renderer.render(scene, camera);
}

// Fare olaylarını dinleme
document.addEventListener("click", function (event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  chestPromise.then(({ chest }) => {
    const intersects = raycaster.intersectObject(chest, true);

    if (intersects.length > 0) {
      // Tıklama işlemi gerçekleştiğinde başka bir sayfaya yönlendirme
      window.open("https://kilopi.net/staking/", "_blank");
    }
  });
});
document.addEventListener("mousemove", function (event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  chestPromise.then(({ chest }) => {
    const intersects = raycaster.intersectObject(chest, true);

    if (intersects.length > 0) {
      chestHovered = true;
    } else {
      chestHovered = false;
    }
  });
});
animate1();

loader.load("components/logo/logo.gltf", function (logo) {
  logo.scene.position.x = -3.4;
  logo.scene.position.y = 0.4;
  logo.scene.position.z = -3.2;
  logo.scene.scale.set(0.09, 0.1, 0.09);
  logo.scene.rotation.y = THREE.MathUtils.degToRad(50);
  scene.add(logo.scene);
  const cubeMesh = logo.scene.getObjectByName("Cube");

  // Y ekseninde döndürmek için sabit bir hız belirleyin
  const rotationSpeed = 0.01;

  // Render loopu
  function render() {
    requestAnimationFrame(render);

    // Cube mesh'i y ekseninde döndürün
    cubeMesh.rotation.y += rotationSpeed;

    // Render sahnesi
    renderer.render(scene, camera);
  }

  // Render loopu başlatın
  render();
});

// Navbar yüklemesi
const navbarPoints = [
  {
    name: "link1",
    position: {
      x: -3.7700056376524556,
      y: 1.5553926364325044,
      z: -0.38819971272826315,
    },
  },
  {
    name: "link2",
    position: {
      x: -3.7700005539844472,
      y: 1.356970565730359,
      z: -0.4018991698115051,
    },
  },
  {
    name: "link3",
    position: {
      x: -3.7700003883129285,
      y: 1.1888098978691035,
      z: -0.40116892011923955,
    },
  },
  {
    name: "link4",
    position: {
      x: -3.7700003947151357,
      y: 1.0016056725507185,
      z: -0.4065723918350247,
    },
  },
  {
    name: "link5",
    position: {
      x: -3.770000517373998,
      y: 0.8381218657161142,
      z: -0.38843827295935807,
    },
  },

  {
    name: "link6",
    position: {
      x: -3.7700004703336787,
      y: 0.6596461532697229,
      z: -0.40396409573982506,
    },
  },
  {
    name: "link7",
    position: {
      x: -3.770000745895996,
      y: 0.46244068413765516,
      z: -0.3571800274354222,
    },
  },
  {
    name: "link8",
    position: {
      x: -3.770022271375838,
      y: 1.564787739525291,
      z: -1.300359678375623,
    },
  },
  {
    name: "link9",
    position: {
      x: -3.7700065785088093,
      y: 1.4009794117973742,
      z: -1.3293363000066445,
    },
  },
  {
    name: "link10",
    position: {
      x: -3.770000018589085,
      y: 1.2049112918461389,
      z: -1.3249646019874237,
    },
  },
  {
    name: "link11",
    position: {
      x: -3.7699999499320977,
      y: 1.0409837469906158,
      z: -1.3596130380545417,
    },
  },
  {
    name: "link12",
    position: {
      x: -3.7699999499320977,
      y: 0.8577511059455565,
      z: -1.2714661480947158,
    },
  },
  {
    name: "link13",
    position: {
      x: -3.770000286818913,
      y: 0.6925091696566763,
      z: -1.380592647847247,
    },
  },
  {
    name: "link14",
    position: {
      x: -3.7700008125340125,
      y: 0.5207415640996345,
      z: -1.2917874492763481,
    },
  },
  {
    name: "link15",
    position: {
      x: -3.770000497170857,
      y: 0.3544887439378652,
      z: -1.3176977368829166,
    },
  },
  {
    name: "link16",
    position: {
      x: -3.770001792918404,
      y: 0.14880331016479698,
      z: -1.3197334746858256,
    },
  },
  {
    name: "link17",
    position: {
      x: -3.770000475146639,
      y: 1.5302401885772952,
      z: -2.3304995452999395,
    },
  },
  {
    name: "link18",
    position: {
      x: -3.769999969267867,
      y: 1.3525669943043495,
      z: -2.268384621701846,
    },
  },
  {
    name: "link19",
    position: {
      x: -3.770000361555896,
      y: 1.1851258433819227,
      z: -2.27563478923467,
    },
  },
  {
    name: "skalia",
    position: {
      x: -3.021009308007302,
      y: -0.2,
      z: 0.05984370607549505,
    },
  },
];

const navbar = new THREE.Object3D();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "components/tasnavbar/textures/M_TablaPizarra_diffuse.jpg"
);

loader.load("components/tasnavbar/scene.gltf", function (navbarModel) {
  navbarModel.scene.traverse(function (child) {
    if (child.isMesh) {
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });
      child.material = material;

      document.addEventListener("mousedown", function (event) {
        event.preventDefault();

        // Click point coordinates
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Convert click point to 3D coordinates
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          console.log("Click coordinates: ", intersects[0].point);
        }
        // Find which point was clicked
        let navbarname = "";
        const point = navbarPoints.find((p) => {
          const distance = intersects[0].point.distanceTo(p.position);
          navbarname = p.name;
          return distance < 0.15; // 5'te kaldığımız için burada 5'e çevirdim.
        });
        //document.addEventListener("mousedown", onDocumentMouseDown, false);
        // Check if point exists
        if (point) {
          switch (navbarname) {
            case "link1":
              window.open("https://kilopi.net/ecosystem/", "_blank");
              break;
            case "link2":
              window.open("https://kilopi.net/roadmap/", "_blank");
              break;
            case "link3":
              window.open("https://kilopi.net/documentation/", "_blank");
              break;
            case "link4":
              window.open(
                "https://kilopi.net/files/whitepaper_kilopi.pdf",
                "_blank"
              );
              break;
            case "link5":
              window.open("https://kilopi.net/slide/", "_blank");
              break;
            case "link6":
              window.open("https://kilopi.net/blog/", "_blank");
              break;
            case "link7":
              window.open("https://kilopi.net/faq/", "_blank");
              break;
            case "link8":
              window.open("https://kilopi.net/token/", "_blank");
              break;
            case "link9":
              window.open("https://kilopi.net/utility/", "_blank");
              break;
            case "link10":
              window.open("https://kilopi.net/tokenomics/", "_blank");
              break;
            case "link11":
              window.open("https://kilopi.net/transparency-2/", "_blank");
              break;
            case "link12":
              window.open("https://kilopi.net/token-distribution/", "_blank");
              break;
            case "link13":
              window.open("https://kilopi.net/exchanges/", "_blank");
              break;
            case "link14":
              window.open("https://kilopi.net/dex-screener/", "_blank");
              break;
            case "link15":
              window.open(
                "https://coinmarketcap.com/currencies/kilopi/",
                "_blank"
              );
              break;
            case "link16":
              window.open(
                "https://www.coingecko.com/en/coins/kilopi",
                "_blank"
              );
              break;
            case "link17":
              window.open("https://kilopi.net/community/", "_blank");
              break;

            case "link18":
              window.open("https://kilopi.net/codeofconduct/", "_blank");
              break;
            case "link19":
              window.open("https://kilopi.net/ambassadors/", "_blank");
              break;

            case "skalia":
              window.open("https://kilopi.net/skallia/", "_blank");
              break;

            default:
              console.log("Invalid link");
          }
        }
      });

      navbar.add(child);
    }
  });

  navbar.position.set(-3.8, 1.7, -0.1);
  navbar.scale.set(0.15, 0.15, 0.03);
  navbar.rotation.z = THREE.MathUtils.degToRad(270);
  navbar.rotation.y = THREE.MathUtils.degToRad(90);

  scene.add(navbar);
});

let animationId;
let thorn;

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);

  render();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();
}

function render() {
  // renderer2.render(scene2, camera);

  renderer.render(scene, camera);
}

var groundTexture = new THREE.TextureLoader().load(
  "../components/sonparke.jpg"
);
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;
var groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });

var mesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), groundMaterial);
mesh.position.y = -0.2;
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

var wallTexture = new THREE.TextureLoader().load("../components/duvarsag.jpg");
wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(10, 5);
wallTexture.anisotropy = 16;
wallTexture.encoding = THREE.sRGBEncoding;
var wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

var Wmesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
Wmesh.position.x = -4.1;
Wmesh.position.y = 2.2;
Wmesh.rotation.y = Math.PI / 2;
Wmesh.receiveShadow = true;
scene.add(Wmesh);

var Wmesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
Wmesh.position.x = 4.1;
Wmesh.position.y = 2.2;
Wmesh.rotation.y = -Math.PI / 2;
Wmesh.receiveShadow = true;
scene.add(Wmesh);

var Wmesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
Wmesh.position.x = 0;
Wmesh.position.y = 2.3;
Wmesh.position.z = -4.3;
Wmesh.rotation.y = 0;
Wmesh.receiveShadow = true;
scene.add(Wmesh);

function createwall4(name, w, h, d, x, y, z, color) {
  var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshBasicMaterial({ color: color });
  var loader4 = new THREE.TextureLoader();
  material.map = loader4.load("../components/duvarsag.jpg");
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

createwall4("wall4", 8, 5, 0.5, 0, 1.3, 4.3, 0xffffff);

animate();
const root = ReactDOM.createRoot(document.getElementById("root"));
