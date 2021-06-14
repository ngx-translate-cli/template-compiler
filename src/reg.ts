export const reg =  {
    commentStart: '<!--',
    commentEnd: '-->',
    tagStart: '<',
    tagStartReg: /^<([-A-Za-z0-9_]+)([^>\/]*)\/?>/,
    tagEnd: '</',
    tagEndReg:  /^<\/\s*([-A-Za-z0-9_]+)[^>]*>/
}
 