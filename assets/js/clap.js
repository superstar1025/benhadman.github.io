var clap = document.getElementById('clap');
var clapIcon = document.getElementById('clap--icon');
var clapCount = document.getElementById('clap--count');
var clapTotalCount = document.getElementById('clap--count-total');
var initialNumberOfClaps = generateRandomNumber(500, 10000);
var btnDimension = 80;
var tlDuration = 300;
var numberOfClaps = 0;
var clapHold = void 0;

var triangleBurst = new mojs.Burst({
  parent: clap,
  radius: { 50: 95 },
  count: 5,
  angle: 30,
  children: {
    shape: 'polygon',
    radius: { 6: 0 },
    scale: 1,
    stroke: 'rgba(131, 222, 243,0.5)',
    strokeWidth: 2,
    angle: 210,
    delay: 30,
    speed: 0.2,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    duration: tlDuration
  }
});
var circleBurst = new mojs.Burst({
  parent: clap,
  radius: { 50: 75 },
  angle: 25,
  duration: tlDuration,
  children: {
    shape: 'circle',
    fill: 'rgba(131, 222, 243 ,0.5)',
    delay: 30,
    speed: 0.2,
    radius: { 3: 0 },
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
  }
});
var countAnimation = new mojs.Html({
  el: '#clap--count',
  isShowStart: false,
  isShowEnd: true,
  y: { 0: -30 },
  opacity: { 0: 1 },
  duration: tlDuration
}).then({
  opacity: { 1: 0 },
  y: -80,
  delay: tlDuration / 2
});
var countTotalAnimation = new mojs.Html({
  el: '#clap--count-total',
  isShowStart: false,
  isShowEnd: true,
  opacity: { 0: 1 },
  delay: 3 * tlDuration / 2,
  duration: tlDuration,
  y: { 0: -3 }
});
var scaleButton = new mojs.Html({
  el: '#clap',
  duration: tlDuration,
  scale: { 1.3: 1 },
  easing: mojs.easing.out
});
clap.style.transform = "scale(1, 1)"; /*Bug1 fix*/

var animationTimeline = new mojs.Timeline();
animationTimeline.add([triangleBurst, circleBurst, countAnimation, countTotalAnimation, scaleButton]);

clap.addEventListener('click', function () {
  repeatClapping();
});

clap.addEventListener('mousedown', function () {
  clapHold = setInterval(function () {
    repeatClapping();
  }, 400);
});

clap.addEventListener('mouseup', function () {
  clearInterval(clapHold);
});

function repeatClapping() {
  updateNumberOfClaps();
  animationTimeline.replay();
  clapIcon.classList.add('checked');
}

function updateNumberOfClaps() {
  numberOfClaps < 50 ? numberOfClaps++ : null;
  clapCount.innerHTML = "+" + numberOfClaps;
  clapTotalCount.innerHTML = initialNumberOfClaps + numberOfClaps;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*====== TODO ==========
1. Bug fix. The button shouldn't 
scale up before being clicked (fixed)
2. Shadow should NOT fire hover 
animation in succession. 
Some sort of delay is delay. (Not that important)
3. Hover animation should be 
absent upon click (Not that important)
4. Handle onpress event on the button (Implemetaation is Buggy ATM)
5. Dynamically change burst angle 
everytime button is clicked 
=========================*/