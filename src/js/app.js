import * as THREE from 'three';
import { store } from './store/state.js';
import { Util } from './utils/util.js';
import { RAF } from './utils/RAF.js';
import { Box } from './parts/box.js';

class Main {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;

        this.init();
    }

    init() {
        // this.texture = await this.loadTexture();

        this.setupTHREE();
        this.setupScene();
        this.setupCamera();

        this.setupObjects();

        this.render();
    }

    // loadTexture() {
    //     return new THREE.TextureLoader().loadAsync('../img/biei.jpg');
    // }

    setupTHREE() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('app').appendChild(this.renderer.domElement);
        store.renderer = this.renderer;
    }

    setupScene() {
        this.scene = new THREE.Scene();
        store.scene = this.scene;
    }

    // calcPlanePos() {
    //     const fovAtRadian = (this.camera.fov / 2) * (Math.PI / 180);
    //     const screenHeight = this.camera.position.z * Math.tan(fovAtRadian) * 2;
    //     const screenWidth = screenHeight * this.aspect;

    //     return {
    //         screenWidth,
    //         screenHeight,
    //     };
    // }

    setupCamera() {
        // this.camera = new THREE.PerspectiveCamera(
        //     75,
        //     this.width / this.height,
        //     0.01,
        //     100,
        // );
        // this.camera.position.z = 2;

        const frustumSize = 100;
        this.camera = new THREE.OrthographicCamera(
            (frustumSize * this.aspect) / -2, // 左端のx座標
            (frustumSize * this.aspect) / 2, // 右端のx座標
            frustumSize / 2, // 上端のy座標
            frustumSize / -2, // 下端のy座標
            0, // near
            10, // far
        );
        store.viewportEdge = {
            x: (frustumSize * this.aspect) / 2,
            y: frustumSize / 2,
        };

        store.camera = this.camera;
    }

    setupObjects() {
        new Box();
    }

    render(time) {
        requestAnimationFrame(this.render.bind(this));

        this.renderer.render(this.scene, this.camera);
        RAF.instance.update(time);
    }
}

new Main();
