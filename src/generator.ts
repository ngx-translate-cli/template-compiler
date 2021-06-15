import { isCloseSelf } from "./utils";

export function Generator(ast) {
    return generatorArrayEle(ast[0]);
}

function generatorArrayEle(nodes) {
    const _arr = [];
    nodes.children.forEach(node => {
        _arr.push(generatorItem(node));
    });
    return _arr.join('');
}

function generatorAttr(attrs) {
    if(!attrs || !attrs.length) {
        return '';
    }
    const output = attrs.map(v => `${v.name}="${v.value}"`)
    return output.join(' ')
}

function generatorItem(node) {
    if (node.type === 'Comment') {
        return '<--' + node.content + '-->';
    }
    if(node.type === 'Element') {
        if(isCloseSelf(node.tag)) {
            return `<${node.tag} ${generatorAttr(node.attrs)} />`;
        }
        return `<${node.tag} ${generatorAttr(node.attrs)} >` +
                   generatorArrayEle(node) +
                `</${node.tag}>`;
    }
    if(node.type === 'Context') {
        return `{{${node.name}}}`
    }
    return node.content;
}