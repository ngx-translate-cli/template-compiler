export function Generator(ast) {
    return generatorArray(ast[0]);
}

function generatorArray(nodes) {
    const _arr = [];
    nodes.children.forEach(node => {
        _arr.push(generatorItem(node));
    });
    return _arr.join('');
}

function generatorItem(node) {
    if (node.type === 'Comment') {
        return '<--' + node.content + '-->';
    }
    if(node.type === 'Element') {
        return `<${node.tag}${node.attr}>` +
                generatorArray(node) +
                `</${node.tag}>`;
    }
    if(node.type === 'Context') {
        return `{{${node.name}}}`
    }
    return node.content;
}