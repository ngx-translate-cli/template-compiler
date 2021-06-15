import * as sym from './symbols';


export function attrParser(attr) {
    const reg = sym.commonAttr;
    const output = [];
    let res;
    while(res = reg.exec(attr)) {
        const key = res[1];
        const value = res[2];
        if(!key) {
            throw new Error('parser attribute error at' + attr);
        }
        let node = null;
        if(sym.dyAttr.test(key)) {
            if(!value) {
                throw new Error('dynamic attribute need a value.');
            }
            node = {
                name: key,
                type: 'DynamicAttr',
                value
            }
        } else if(sym.activeAttr.test(key)) {
            node = {
                name: key,
                type: 'ActiveAttr',
                value
            }
        } else {
            node = {
                name: key,
                type: 'CommonAttr',
                value
            }
        }
        output.push(node);
    }
    return output;
}