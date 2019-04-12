/*
* @description animation library
* @detail requestAniamtionFrame
* 1.duration
* 2.from
* 3.to
* 4.type
*/

import Tween from "./tween"

let animationId = -1
let stoppedAnimationId = animationId = -1

const customAnimation = exports.customAnimation = {}

customAnimation.to = function(duration, from, to, type, delay){
  var delay = delay || 0;
  for(let prop in to){
    setTimeout(function(prop){
      return function(){
        TweenAnimation(from[prop], to[prop], duration, type, (value, complete) => {
          from[prop] = value
        })
      } 
    }(prop), delay * 1000);
  }
}

const TweenAnimation = exports.TweenAnimation = function TweenAnimation(from, to, duration, type, callback){
  const selfAnimationId = ++animationId
  const frameCount = duration * 1000 / 17
  var start = -1

  var startTime = Date.now()
  let lastTime = Date.now()

  const options = {
    callback:function(){},
    type:"Linear",
    duration:300
  }

  if(callback)
  {
    options.callback = callback 
  }
  if(type)
  {
    options.type = type
  }
  if(duration)
  {
    options.duration = duration
  }
  var tweenFn = Tween
  var arr = options.type.split(".")
  if (arr.length == 1) {
      tweenFn = tweenFn[arr[0]];
  } else if (arr.length == 2) {
      tweenFn = tweenFn[arr[0]] && tweenFn[arr[0]][arr[1]];
  }
  
  const step = function step(){
    const currentTime = Date.now()
    const interval = currentTime - lastTime
    let fps
    if(interval)
    {
       fps = Math.ceil(1000 / interval)
    }
    else
    {
      requestAnimationFrame(step) 
      return
    }
    if(fps >= 30)
    {
      start++
    }
    else{
    const _start = Math.floor((interval) / 17)
    start += _start
    }
    const value = tweenFn(start, from, to - from, frameCount)

    if(start <= frameCount && selfAnimationId > stoppedAnimationId)
    { 
      //动画继续
      options.callback(value)
      requestAnimationFrame(step)
    }else if(start > frameCount && selfAnimationId > stoppedAnimationId){
      //动画结束
      options.callback(to, true)
    }

    lastTime = Date.now()
   }
   step()
}

const stopAllAnimation =  exports.stopAllAnimation =function stopAllAnimation(){
  stoppedAnimationId = animationId
}