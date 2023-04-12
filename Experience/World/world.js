
import * as THREE from "three";
import Experience from "../Experience.js";

import Crystal from "./crystal.js";
import Environment from "./environment.js";
import Controls from "./controls.js";
import Floor from "./floor.js";
import Particles from "./particles.js";
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
            this.floor =  new Floor();
            // this.particles = new Particles();
            this.controls= new Controls();
            this.emit("worldready");
        })
        this.theme.on("switch", (theme)=>{
            this.switchTheme(theme);
        })
        // this.crystal= new Crystal();
    }
    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme);
        }
    }
    resize(){}
    update(){
        if(this.crystal){
            this.crystal.update();
        }
        if(this.particles){
            this.particles.update();
        }
        if(this.controls){
            this.controls.update();
        }
    }
 }
