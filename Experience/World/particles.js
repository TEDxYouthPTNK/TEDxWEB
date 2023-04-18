import * as THREE from "three";
import Experience from "../Experience.js";
import Renderer from "../Renderer.js";
export default class Particles {
    constructor() {
        this.experience = new Experience();
        // this.renderer= new Renderer();
        this.scene = this.experience.scene;
        this.init();
        this.animate();
    }

    init() {

        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.windowHalfX = this.WIDTH / 2;
        this.windowHalfY = this.HEIGHT / 2;

        this.fieldOfView = 75;
        this.aspectRatio = this.WIDTH / this.HEIGHT;
        this.nearPlane = 1;
        this.farPlane = 3000;

        /* 	fieldOfView — Camera frustum vertical field of view.
	aspectRatio — Camera frustum aspect ratio.
	nearPlane — Camera frustum near plane.
	farPlane — Camera frustum far plane.

	- https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

	In geometry, a frustum (plural: frusta or frustums)
	is the portion of a solid (normally a cone or pyramid)
	that lies between two parallel planes cutting it. - wikipedia.		*/

        // cameraZ = farPlane / 3; /*	So, 1000? Yes! move on!	*/
        this.fogHex = 0x000000; /* As black as your heart.	*/
        this.fogDensity = 0.0007; /* So not terribly dense?	*/

        // camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        // camera.position.z = cameraZ;

        this.scene.fog = new THREE.FogExp2(this.fogHex, this.fogDensity);

        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        document.body.style.margin = 0;
        document.body.style.overflow = 'hidden';

        this.geometry = new THREE.BufferGeometry(); /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/

        this.particleCount = 20000; /* Leagues under the sea */
        const vertexData = new Float32Array(this.particleCount * 3);

        /*	Hope you took your motion sickness pills;
	We're about to get loopy.	*/

    for (let i = 0; i < this.particleCount; i++) {
        const index = i * 3;
        vertexData[index] = Math.random() * 2000 - 1000;
        vertexData[index + 1] = Math.random() * 2000 - 1000;
        vertexData[index + 2] = Math.random() * 2000 - 1000;
    }
    const vertices = new THREE.Float32BufferAttribute(vertexData, 3);
    this.geometry.setAttribute('position', vertices);


        /*	We can't stop here, this is bat country!	*/

        this.parameters = [
            [
                [1, 1, 0.5], 5
            ],
            [
                [0.95, 1, 0.5], 4
            ],
            [
                [0.90, 1, 0.5], 3
            ],
            [
                [0.85, 1, 0.5], 2
            ],
            [
                [0.80, 1, 0.5], 1
            ]
        ];
        this.parameterCount = this.parameters.length;

        /*	I told you to take those motion sickness pills.
	Clean that vommit up, we're going again!	*/

        for (let i = 0; i < this.parameterCount; i++) {

            this.color = this.parameters[i][0];
            this.size = this.parameters[i][1];
            this.materials=[];
            this.materials[i] = new THREE.PointsMaterial({
                size: this.size
            });

            this.particles = new THREE.Points(this.geometry, this.materials[i]);

            this.particles.rotation.x = Math.random() * 6;
            this.particles.rotation.y = Math.random() * 6;
            this.particles.rotation.z = Math.random() * 6;

            this.scene.add(this.particles);
        }

        /*	If my calculations are correct, when this baby hits 88 miles per hour...
	you're gonna see some serious shit.	*/

        this.renderer = new THREE.WebGLRenderer(); /*	Rendererererers particles.	*/
        this.renderer.setPixelRatio(window.devicePixelRatio); /*	Probably 1; unless you're fancy.	*/
        this.renderer.setSize(this.WIDTH, this.HEIGHT); /*	Full screen baby Wooooo!	*/

        this.container.appendChild(this.renderer.domElement); /* Let's add all this crazy junk to the page.	*/

        /*	I don't know about you, but I like to know how bad my
		code is wrecking the performance of a user's machine.
		Let's see some damn stats!	*/

        // this.stats = new Stats();
        // this.stats.domElement.style.position = 'absolute';
        // this.stats.domElement.style.top = '0px';
        // this.stats.domElement.style.right = '0px';
        // this.container.appendChild(stats.domElement);

        /* Event Listeners */

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);

    }
    onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    

    resize() {}

    update() {}
}