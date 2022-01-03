import {getCustomProperty,incrementCustomProperty,setCustomProperty} from './updateCustomProperty.js';
const dataDino = document.querySelector('[data-dino]');
const jump_speed = 0.55;
const gravity = 0.0015;
const dino_frame_count = 2;
const frame_time = 100;
let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
function handleRun(delta,speedScale){
     if(isJumping){
          dataDino.src = './images/dino-stationary.png';
          return;
     }
     if(currentFrameTime >= frame_time){
          dinoFrame = (dinoFrame + 1) % dino_frame_count;
          dataDino.src = `./images/dino-run-${dinoFrame}.png`;
          currentFrameTime -= frame_time;
     }
     currentFrameTime += delta * speedScale;
}
function handleJump(delta){
     if(!isJumping) return;
     incrementCustomProperty(dataDino,'--bottom',yVelocity * delta);
     if(getCustomProperty(dataDino,'--bottom') <= 0){
          setCustomProperty(dataDino,'--bottom',0);
          isJumping = false;
     }
     yVelocity -= gravity * delta;
}
function onJump(event){
     if(event.code !== 'Space' || isJumping) return;
     yVelocity = jump_speed;
     isJumping = true;
}
export function setupDino(){
     isJumping = false;
     dinoFrame = 0;
     currentFrameTime = 0;
     yVelocity = 0;
     setCustomProperty(dataDino,'--bottom',0);
     document.removeEventListener('keydown',onJump);
     document.addEventListener('keydown',onJump);
}
export function updateDino(delta,speedScale){
     handleRun(delta,speedScale);
     handleJump(delta);
}
export function getDinoRect(){
     return dataDino.getBoundingClientRect();
}
export function setDinoLose(){
     dataDino.src = './images/dino-lose.png';
}