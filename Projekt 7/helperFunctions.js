
export const random = (min, max) => {
    if(!max)
        return Math.floor(Math.random() * min);
    else
        return Math.floor(Math.random()*(max-min+1)+min);
}