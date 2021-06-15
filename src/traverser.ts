function traveserNodeArray(nodes, visitor) {
    nodes.forEach(node => {
        traverserNode(node, visitor);
    })
}


function traverserNode(node, visitor) {
    const method = visitor[node.type];
    if(method) {
        method(node);
    }
    switch(node.type) {
        case 'Element':
            traveserNodeArray(node.children, visitor);
            if(node.attrs && node.attrs.length) {
                traveserNodeArray(node.attrs, visitor);
            }
            break;
        case 'CommonAttr':
        case 'DynamicAttr':
        case 'ActiveAttr':
        case 'Comment':
        case 'Context':
        case 'Text':
            break;
        default:
            throw new Error(node.type);
            
    }
}

export function traverser(ast, visitor) {
    const body = ast[0];
    if(body.type !== 'Body') {
        throw new Error('ast errror!');
    }

    traveserNodeArray(body.children, visitor);
}