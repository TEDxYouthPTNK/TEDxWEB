import Experience from "../Experience";
import * as THREE from "three";
import Resources from "../utils/resources";
import { EventEmitter } from "events";
import GSAP from "gsap";
import Time from "../utils/time";
import { DragControls } from 'three/addons/controls/DragControls.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import ASScroll from "@ashthornton/asscroll";

import World from "./world";
import Renderer from "../Renderer";
export default class Controls extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.sizes=this.experience.sizes;
        this.camera = this.experience.camera;
        this.world = new World();
        this.time = this.experience.time;
        this.progress=0;
        this.dummyCurve= new THREE.Vector3(0,0,0);
        this.crystal=this.experience.world.crystal.actualCrystal;
        this.lerp={
            current:0,
            target:0,
            ease:0.1,
        }
        GSAP.registerPlugin(ScrollTrigger);
        this.position= new THREE.Vector3(0,0,0);
        this.lookAtPosition= new THREE.Vector3(0,0,0);
        this.angle=0;
        this.directionalVector= new THREE.Vector3();
        this.staticVector= new THREE.Vector3(0,1,0);
        this.crossVector= new THREE.Vector3();
        this.box = new THREE.Box3().setFromObject(this.crystal);
        // this.box.center( this.crystal.position ); // this re-sets the mesh position
        this.crystal.position.multiplyScalar( - 1 );
        this.axis= new THREE.Vector3( 0, 1, 0 );;
        // this.pivot = new THREE.Group();
        // this.scene.add( this.pivot );
        // this.pivot.add( this.crystal );
        this.slide();
        // this.setPath();
        this.animate();
        this.setScrollTrigger();
        // this.setSmoothScroll();
    }
    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }
    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }
    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //desktop
            "(min-width: 969px)":()=>{
                console.log("fired desktop");
                //first section---------------------------
                this.firstMoveTimeline= new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.crystal.position,{
                    x:()=>{
                        return this.sizes.width*0.004;
                    },
                })
                //Second section------------------------------
                this.secondMoveTimeline= new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.crystal.position,{
                    x:()=>{
                        return -5;
                    },
                    z:()=>{
                        return this.sizes.height*0.005;
                    },
                    // y:()=>{
                    //     return -2;
                    // }
                },"same");
                this.secondMoveTimeline.to(this.crystal.scale,{
                    x:2.5,
                    y:2.5,
                    z:2.5,
                },"same");
                //Third-section---------------------------
                this.thirdMoveTimeline= new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.thirdMoveTimeline.to(this.crystal.rotation,{
                    y: Math.PI/4,
                },"now")
                this.thirdMoveTimeline.to(this.crystal.scale,{
                    x:1.5,
                    y:1.5,
                    z:1.5,
                },"same");
                this.thirdMoveTimeline.to(this.crystal.position,{
                    y:2,
                    x:5,
                    // x:()=>{
                    //     return 20;
                    // }
                },"same")
            },
            //mobile
            "(max-width: 968px)": () => {
                console.log("fired mobile");
                // Resets
                const width = window.innerWidth;
                const height = window.innerHeight;

                // Calculate the center point of the window
                const centerX = width / 2;
                const centerY = height / 2;


                this.crystal.scale.set(0.7, 0.7, 0.7);
                this.crystal.position.set(0, 0, 0);
                // this.rectLight.width = 0.3;
                // this.rectLight.height = 0.4;
                this.camera.orthographicCamera.position.set(0, 6.5, 10);

                // First section -----------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.crystal.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                }).to(this.crystal.position,{
                    x:5,
                    y:0,
                    z:5,
                }
                )

                // Second section -----------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(
                        this.crystal.scale,
                        {
                            x: 0.25,
                            y: 0.25,
                            z: 0.25,
                        },
                        "same"
                    )
                    // .to(
                    //     this.rectLight,
                    //     {
                    //         width: 0.3 * 3.4,
                    //         height: 0.4 * 3.4,
                    //     },
                    //     "same"
                    // )
                    .to(
                        this.crystal.position,
                        {
                            x: 1.5,
                        },
                        "same"
                    );

                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.crystal.position, {
                    z: -4.5,
                });
            },

            // all
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });
            }
        })
    }
    animate(){
        // requestAnimationFrame(this.animate);
        // this.axis.copy(this.crystal.position);
        // this.crystal.rotateOnAxis(this.axis,0.1)
        this.crystal.rotation.y+=this.lerp.current;
    }
    slide(){
        this.timeline=new GSAP.timeline();
        this.timeline.to(this.crystal.position,{
            x:()=>{return this.sizes.width*0.003},
            // z:5,
            scrollTrigger:{
                trigger: ".first-move",
                // markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
            
        });
        this.timeline.to(this.crystal.position,{
            x:()=>{return -this.sizes.width*0.003},
            // z:-5,
            scrollTrigger:{
                trigger: ".second-move",
                // markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
            
        });
        this.timeline.to(this.crystal.position,{
            x:()=>{return this.sizes.width*0.003},
            // z:-5,
            scrollTrigger:{
                trigger: ".third-move",
                // markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
            
        });
        console.log(this.crystal)
    }
    update(){
        this.lerp.current=GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )
        this.lerp.current=GSAP.utils.clamp(0,0.5,this.lerp.current);
        this.lerp.target=GSAP.utils.clamp(0,0.4,this.lerp.target);
        // this.curve.getPointAt(this.lerp.current%1, this.position);
        // this.camera.orthographicCamera.position.copy(this.position);
        // this.directionalVector.subVectors(this.curve.getPointAt((this.lerp.current%1)+0.000001), this.position)
        // this.directionalVector.normalize();
        // this.crossVector.crossVectors(this.directionalVector, this.staticVector);
        // this.crossVector.multiplyScalar(100000);
        // this.camera.orthographicCamera.lookAt(0,0,0)

        // this.pivot.rotation.y += this.lerp.target*0.01;
        //camera momentum
        if(this.back){
            this.lerp.target-=0.0001;
 
        }
        else{
            this.lerp.target+=0.0001;

        }
        
        // this.curve.getPointAt(this.lerp.current, this.position);
        // this.curve.getPointAt(this.lerp.current+0.00001, this.lookAtPosition);

        // // this.progress+=0.001
        
        // this.camera.orthographicCamera.position.copy(this.position)
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition)
    }
 }
