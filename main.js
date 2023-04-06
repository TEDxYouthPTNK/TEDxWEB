import './style.css'
import Experience from './Experience/Experience.js';
const experience = new Experience(document.querySelector(".experience-canvas"));
//fade in animation
// window.addEventListener('scroll', reveal);
// var reveals=document.querySelector('.reveal');
// function reveal(){
//     for(var i=0; i<reveals.length; i++){
//         var windowheight=window.innerHeight;
//         var revealTop=reveals[i].getBoundingClientRect().top;
//         var revealpoint=150;
//         if(revealTop<windowheight-revealpoint){
//             reveals[i].classList.add('active');
//         }
//         else{
//             reveals[i].classList.remove('active');
//         }
//     }
// }

//footer
let lastTime = 0;
// Simple throttle function
function throttle(func, timeFrame) {
  return function () {
    var now = Date.now();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}

let currentSection = 0;
let prevSection = currentSection;

const dots = document.querySelectorAll(".dot");
const progressEl = document.querySelector(".footer-progress");

//Jump to next/prev section when user scrolls
  window.addEventListener("wheel", (e) => {
    const callback = () => {
      let delta = e.deltaY;

			prevSection = currentSection;

      if (delta > 0) {
        if (currentSection < dots.length) {
          currentSection += 1;
					//Drive animations
          jumpToSection();
        }
      } else {
        if (currentSection > 0) {
          currentSection -= 1;
					//Drive animations
          jumpToSection();
        }
      }
    };

		// Note: Only change the currentSection at most once in 500 milliseconds
    let t = throttle(callback, 500);
    t();
  });
  const jumpToSection = () => {
    setProgress(currentSection); // Pass in the updated value of currentSection

 };

const setProgress = () => {
    dots[prevSection].classList.remove("active");
    dots[currentSection].classList.add("active");
    const percent = (currentSection / (dots.length - 1)) * 100;
    progressEl.style.width = percent + "%";
};


const days=document.querySelectorAll('days');
const hours=document.querySelectorAll('hours');
const minutes=document.querySelectorAll('minutes');
const seconds=document.querySelectorAll('seconds');
const currentYear=new Date().getFullYear;
const targetYear= new Date(`May 14 2023 00:00:00`)
function updateCountdown(){
  const currentTime=new Date();
  const diff=targetYear-currentYear;
  // console.log(diff);
  const d=Math.floor(diff/1000/60/60/24);
  const h=Math.floor(diff/1000/60/60)%24;
  const m=Math.floor(diff/1000/60)%60;
  const s=Math.floor(diff/1000)%60;

  // const d=Math.floor(diff/1000/60/60/24);
  days.innerHTML=d;
  hours.innerHTML=h<10? '0'+h:h;
  minutes.innerHTML=h<10? '0'+m :m;
  seconds.innerHTML=s<10? '0'+s :s;
}
setInterval(updateCountdown, 1000)
// updateCountdownTimer();