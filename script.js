import {updateGround,setupGround} from './ground.js';
import {updateDino,setupDino,getDinoRect,setDinoLose} from './dino.js';
import {updateCactus,setupCactus,getCactusRects} from './cactus.js';
const world_width = 100;
const world_height = 30;
const speed_scale_increase = 0.00001;
const dataWorld = document.querySelector('[data-world]');
const dataScore = document.querySelector('[data-score]');
const dataStartScreen = document.querySelector('[data-start-screen]');
setPixelToWorldScale();
window.addEventListener('resize',setPixelToWorldScale);
document.addEventListener('keydown',handleStart,{once: true});
let lastTime;
let speedScale;
let score;
function updateSpeedScale(delta){
     speedScale += delta * speed_scale_increase;
}
function updateScore(delta){
     score += delta * 0.01;
     dataScore.textContent = Math.floor(score);
}
function isCollision(rectangle1,rectangle2){
     return (rectangle1.left < rectangle2.right && rectangle1.top < rectangle2.bottom && rectangle1.right > rectangle2.left && rectangle1.bottom > rectangle2.top);
}
function checkLose(){
     const dinoRect = getDinoRect();
     return getCactusRects().some(rect => isCollision(rect,dinoRect));
}
function handleStart(){
     lastTime = null;
     speedScale = 1;
     score = 0;
     setupGround();
     setupDino();
     setupCactus();
     dataStartScreen.classList.add('hide');
     window.requestAnimationFrame(update);
}
function handleLose(){
     setDinoLose();
     setTimeout(() => {
          document.addEventListener('keydown',handleStart,{once: true});
          dataStartScreen.classList.remove('hide');
     },100);
}
function update(time){
     if(lastTime == null){
          lastTime = time;
          window.requestAnimationFrame(update);
          return;
     }
     const delta = time - lastTime;
     updateGround(delta,speedScale);
     updateDino(delta,speedScale);
     updateCactus(delta,speedScale);
     updateSpeedScale(delta);
     updateScore(delta);
     if(checkLose()) return handleLose();
     lastTime = time;
     window.requestAnimationFrame(update);
}
function setPixelToWorldScale(){
     let worldToPixelScale;
     if(window.innerWidth / window.innerHeight < world_width / world_height){
          worldToPixelScale = window.innerWidth / world_width;
     }else{
          worldToPixelScale = window.innerHeight / world_height;
     }
     dataWorld.style.width = `${world_width * worldToPixelScale}px`;
     dataWorld.style.height = `${world_height * worldToPixelScale}px`;
}