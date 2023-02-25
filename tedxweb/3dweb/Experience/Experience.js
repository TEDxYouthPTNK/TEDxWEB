import * as THREE from "three"
import Sizes from "./utils/sizes.js"
import Camera from "./Camera.js"; 
import Renderer from "./Renderer.js";
import Time from "./utils/time.js";
import World from "./World/world.js";
export default class Experience{
    static instance;
    constructor(canvas){
        this.canvas=canvas;
            if(Experience.instance){
                return Experience.instance
            }
            Experience.instance=this;
            this.canvas=canvas;
            this.scene=new THREE.Scene();
            this.sizes=new Sizes();
            this.camera=new Camera();
            this.renderer=new Renderer();
            this.time=new Time();
            this.world=new World();
            this.time.on("update", ()=>{
                this.update();
            })
            this.sizes.on("resize", ()=>{
                this.resize();
            })
   }
   update(){
    this.camera.update();
    this.renderer.update();
   }
   resize(){
    this.camera.resize();
    this.renderer.resize();
   }
}