const closeSelf = mapObj('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed'); //自关闭标签

function mapObj(str) {
    const arr = str.split(',');
    const obj = {};
    arr.forEach(v => obj[v] = true);
    return obj;
}

export function isCloseSelf(tagName) {
    return closeSelf[tagName];
}