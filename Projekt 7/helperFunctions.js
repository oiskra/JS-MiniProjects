
export const random = (min, max) => {
    if(!max)
        return Math.random() * min;
    else{
      let rnd = Math.random()*(max-min+1)+min;
      if(rnd > max) rnd = Math.floor(rnd);
      else if(rnd < min) Math.ceil(rnd);
      return rnd;
    }
}

export const map = (value, start1, stop1, start2, stop2, withinBounds = false) => {
    const newval = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    } else {
      return constrain(newval, stop2, start2);
    }
}

export const constrain = (n, low, high) => {
    return Math.max(Math.min(n,high), low)
}