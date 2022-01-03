import {getCustomProperty,incrementCustomProperty,setCustomProperty} from './updateCustomProperty.js';
const speed = 0.05;
const cactus_interval_minimum = 700;
const cactus_interval_maximum = 3000;
const dataWorld = document.querySelector('[data-world]');
let nextCactusTime;
function createCactus(){
     const image = document.createElement('img');
     image.dataset.cactus = true;
     image.src = './images/cactus.png';
     image.classList.add('cactus');
     setCustomProperty(image,'--left',100);
     dataWorld.append(image);
}
function randomNumberBetween(minimum,maximum){
     return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}
export function setupCactus(){
     nextCactusTime = cactus_interval_minimum;
     document.querySelectorAll('[data-cactus]').forEach(cactus => {
          cactus.remove();
     });
}
export function updateCactus(delta,speedScale){
     document.querySelectorAll('[data-cactus]').forEach(cactus => {
          incrementCustomProperty(cactus,'--left',delta * speedScale * speed * -1);
          if(getCustomProperty(cactus,'--left') <= -100){
               cactus.remove();
          }
     });
     if(nextCactusTime <= 0){
          createCactus();
          nextCactusTime = randomNumberBetween(cactus_interval_minimum,cactus_interval_maximum) / speedScale;
     }
     nextCactusTime -= delta;
}
export function getCactusRects(){
     return [...document.querySelectorAll('[data-cactus]')].map(cactus => {
          return cactus.getBoundingClientRect();
     });
}