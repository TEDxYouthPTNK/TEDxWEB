import Experience from "../Experience";
import * as THREE from "three"
import Resources from "../utils/resources";
import { EventEmitter } from "events";
import Time from "../utils/time";
import GSAP from "gsap";

export default class Crystal extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.crystal = this.resources.items.crystal;
        this.actualCrystal = this.crystal.scene;
        this.crystalChildren = {};
        this.clock= new THREE.Clock();
        this.elapsedTime = this.clock.getElapsedTime()
        this.lerp={
            current:0,
            target:0,
            ease:0.1,
        }
        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }
    setModel(){
        // this.actualCrystal.crystalChildren.array.forEach(child => {
        //     child.castShadow=true;
        //     child.receiveShadow=true;
        // });
        // this.setAnimation();
        // this.;
        this.actualCrystal.castShadow=true;
        this.actualCrystal.receiveShadow=true;
        this.scene.add(this.actualCrystal);
    }
    setAnimation(){
        // this.actualCrystal.rotationX+= 0.01*this.time.elapsed;
        // this.actualCrystal.positionY=Math.sin(elapsedTime);
    }
    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation*0.1;
        });
    }
    resize(){}
    update(){
        this.lerp.current=GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )
        // this.crystal.update()
        this.actualCrystal.rotation.y=this.lerp.current;
        this.actualCrystal.positionY=Math.sin(this.elapsed);
    }
 }
