import Experience from "../Experience";
import * as THREE from "three"
import Resources from "../utils/resources";
import { EventEmitter } from "events";
import Time from "../utils/time";
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
        this.setModel();
        // this.setAnimation();
        this.elapsedTime = this.clock.getElapsedTime()

    }
    setModel(){
        // this.actualCrystal.crystalChildren.array.forEach(child => {
        //     child.castShadow=true;
        //     child.receiveShadow=true;
        // });
        // this.setAnimation();
        this.scene.add(this.actualCrystal);
    }
    setAnimation(){
        this.actualCrystal.rotationX+= 0.01*this.time.elapsed;
        this.actualCrystal.positionY=Math.sin(elapsedTime);
    }
    resize(){}
    update(){
        // this.crystal.update()
        this.actualCrystal.rotationX+= 0.01*this.time.elapsed;
        this.actualCrystal.positionY=Math.sin(this.elapsed);
    }
 }
