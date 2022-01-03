import {getCustomProperty,incrementCustomProperty,setCustomProperty} from './updateCustomProperty.js';
const speed = 0.05;
const dataGround = document.querySelectorAll('[data-ground]');
export function setupGround(){
     setCustomProperty(dataGround[0],'--left',0);
     setCustomProperty(dataGround[1],'--left',300);
}
export function updateGround(delta,speedScale){
     dataGround.forEach(ground => {
          incrementCustomProperty(ground,'--left',delta * speedScale * speed * -1);
          if(getCustomProperty(ground,'--left') <= -300){
               incrementCustomProperty(ground,'--left',600);
          }
     });
}