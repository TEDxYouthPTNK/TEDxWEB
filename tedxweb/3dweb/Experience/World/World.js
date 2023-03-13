
import * as THREE from "three";
import Experience from "../Experience.js";

import Crystal from "./crystal.js";
import Environment from "./Environment.js";
import { EventEmitter } from "events";
export default class World extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;




        this.resources.on("ready",()=>{
            this.environment= new Environment();
            this.crystal= new Crystal();
        })
        // this.crystal= new Crystal();
    }
    resize(){}
    update(){
        if(this.crystal){
            this.crystal.update();
        }
    }
 }
