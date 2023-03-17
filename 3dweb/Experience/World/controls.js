import Experience from "../Experience";
import * as THREE from "three"
import Resources from "../utils/resources";
import { EventEmitter } from "events";
import GSAP from "gsap";
import Time from "../utils/time";
export default class Controls extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;

        this.time = this.experience.time;
        this.progress=0;
        this.dummyCurve= new THREE.Vector3(0,0,0);
        this.lerp={
            current:0,
            target:0,
            ease:0.1,
        }
        this.position= new THREE.Vector3(0,0,0);
        this.lookAtPosition= new THREE.Vector3(0,0,0);

        this.directionalVector= new THREE.Vector3();
        this.staticVector= new THREE.Vector3(0,1,0);
        this.crossVector= new THREE.Vector3();


        this.setPath();
        this.onWheel();
    }
    onWheel(){
        window.addEventListener("wheel", (e)=>{
            // console.log(e);
            if(e.deltaY>0){
                this.lerp.target+=0.01;
                this.back=false;
            }
            else{
                this.lerp.target-=0.01;
                this.back=true;
            }
        })
    }
    setPath(){
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3(-5,0,0),
            new THREE.Vector3(0,0,-5),
            new THREE.Vector3(5,0,0),
            new THREE.Vector3(0,0,5),

        ], true );

        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }
    resize(){}
    update(){
        this.lerp.current=GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )
        this.curve.getPointAt(this.lerp.current%1, this.position);
        this.camera.orthographicCamera.position.copy(this.position);
        this.directionalVector.subVectors(this.curve.getPointAt((this.lerp.current%1)+0.000001), this.position)
        this.directionalVector.normalize();
        this.crossVector.crossVectors(this.directionalVector, this.staticVector);
        this.crossVector.multiplyScalar(100000);
        this.camera.orthographicCamera.lookAt(this.crossVector)


        // if(this.back){
        //     this.lerp.target-=0.001;
 
        // }
        // else{
        //     this.lerp.target+=0.001;

        // }
        // this.lerp.current=GSAP.utils.clamp(0,1,this.lerp.current);
        // this.lerp.target=GSAP.utils.clamp(0,1,this.lerp.target);

        // this.curve.getPointAt(this.lerp.current, this.position);
        // this.curve.getPointAt(this.lerp.current+0.00001, this.lookAtPosition);

        // // this.progress+=0.001
        
        // this.camera.orthographicCamera.position.copy(this.position)
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition)
    }
 }
