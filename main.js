import './style.css'
import Experience from './Experience/Experience.js';
const experience = new Experience(document.querySelector(".experience-canvas"));
//fade in animation
window.addEventListener('scroll', reveal);
var reveals=document.querySelector('.reveal');
function reveal(){
    for(var i=0; i<reveals.length; i++){
        var windowheight=window.innerHeight;
        var revealTop=reveals[i].getBoundingClientRect().top;
        var revealpoint=150;
        if(revealTop<windowheight-revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}