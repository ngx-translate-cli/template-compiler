import * as sym from './symbols';
import type { attrNode } from './types';

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
        const node = {
            value,
            name: key
        } as attrNode;
        if(sym.dyAttr.test(key)) {
            if(!value) {
                throw new Error('dynamic attribute need a value.');
            }
            node.type = 'DynamicAttr';
        } else if(sym.activeAttr.test(key)) {
            node.type = 'ActiveAttr';
        } else {
            node.type = 'CommonAttr';
        }
        output.push(node);
    }
    return output;
}