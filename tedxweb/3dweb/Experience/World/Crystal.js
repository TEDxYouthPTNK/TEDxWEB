import Experience from "../Experience";
import * as THREE from "three"
export default class Crystal{
    constructor(){
        this.experience= new Experience();
        this.scene=this.experience.scene;
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

    }
    resize(){}
    update(){}
 }
