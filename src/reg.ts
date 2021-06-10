export const reg =  {
    commentStart: '<!--',
    commentEnd: '-->',
    tagStart: '<',
    tagStartReg: /^<([-A-Za-z0-9_]+)((?:\s+\w+="\w+")*)\s*\/?>/,
    tagEnd: '</',
    tagEndReg:  /^<\/([-A-Za-z0-9_]+)[^>]*>/
}
 