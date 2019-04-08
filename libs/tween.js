const Tween = {
  Linear: function Linear(currentFrame, from, range, totalFrameCount ){
    return range * currentFrame / totalFrameCount + from
  },
  BounceEaseOut:function BounceEaseOut(t, b, c, d){
    if((t /= d) < 1 / 2.75){
      return c * (7.5625 * t * t) + b
    }else if(t < 2 / 2.75){
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
    }else if(t < 2.5 / 2.75){
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
    }else{
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b 
    }
  },
  Elastic: {
    easeIn: function easeIn(t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
            s = p / 4;
            a = c;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOut: function easeOut(t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOut: function easeInOut(t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (typeof p == "undefined") p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }
  }
}
export default Tween