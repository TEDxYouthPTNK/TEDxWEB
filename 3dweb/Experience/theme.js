import { EventEmitter } from "events";
import Floor from "./World/floor";
import * as THREE from "three";
export default class Themes extends EventEmitter {
    constructor() {
        super();

        this.theme = "light";

        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");
        this.floor =  new Floor();
        this.floor.material.color instanceof THREE.Color === true;

        this.setEventListeners();
    }

    setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
            this.toggleCircle.classList.toggle("slide");
            this.theme = this.theme === "light" ? "dark" : "light";
            if(this.theme==="dark"){
                this.floor.material.color.set("purple");
            }
            else{
                this.floor.material.color.set(0xFF0000);
            }
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
            console.log(this.theme);

            this.emit("switch", this.theme);
        });
    }
}