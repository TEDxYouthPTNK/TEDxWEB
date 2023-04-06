// import { EventEmitter } from "events";
// import * as THREE from "three";
// import Experience from "./Experience";
// export default class Preloader extends EventEmitter{
//     constructor(){
//         super();
//         this.experience = new Experience();
//         this.scene = this.experience.scene;
//         this.resources = this.experience.resources;
//         this.sizes=this.experience.sizes;
//         this.camera = this.experience.camera;
//         this.world = this.experience.world;
//         const loadingManager=new THREE.LoadingManager;
//         // loadingManager.onStart=function(url, item, total){
//         //     console.log(`Started loading: ${url}`);
//         // }
//         loadingManager.onProgress=function(url, loaded, total){
//             console.log(`Started loading: ${url}`);
//         }
//         this.world.on("worldready",()=>{
//             this.playIntro();
//         })
    
//     }
//     playIntro(){

//     }
// }