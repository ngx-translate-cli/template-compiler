export const commentStart = '<!--';
export const commentEnd = '-->';
export const commentReg = /<!--[\s\S]* -->/
export const tagStart = '<';
export const tagStartReg = /^<([-A-Za-z0-9_]+)([^>\/]*)\/?>/;
export const tagEnd = '</';
export const tagEndReg =  /^<\/\s*([-A-Za-z0-9_]+)[^>]*>/;

// attr
export const commonAttr = /\s*([\w-*.\[\]]+)\s*(?:=\s*"([\s\S]+?)")?/g