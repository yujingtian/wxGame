/*
* @description animation library
* @detail requestAniamtionFrame
* 1.duration
* 2.from
* 3.to
* 4.type
*/

import Tween from "./tween"
const customAnimation = exports.customAnimation = {}

customAnimation.to = function(duration, from, to, type, delay){
  for(let prop in from){
    setTimeout((prop) => {
      return function(){
        TweenAnimation(from[prop], to[prop], duration, type, (value, complete) => {
          from[prop] = value
        })
      }(prop)
    }, delay*1000);
  }
}

const TweenAnimation = exports.TweenAnimation = function TweenAnimation(from, to, duration, type, callback){
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

  const tweenFn = Tween[type]

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

    if(start <= frameCount)
    { 
      //动画继续
      options.callback(value)
      requestAnimationFrame(step)
    }else{
      //动画结束
      options.callback(to, true)
    }

    lastTime = Date.now()
   }
   step()
}