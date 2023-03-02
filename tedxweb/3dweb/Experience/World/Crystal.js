import Experience from "../Experience";
import * as THREE from "three"
import Resources from "../utils/resources";
import { EventEmitter } from "events";

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

        this.setModel();

    }
    setModel(){
        this.scene.add(this.actualCrystal);
    }
    resize(){}
    update(){}
 }
