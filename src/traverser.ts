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
            break;
        case 'Text':
        case 'Comment':
        case 'Context':
            break;
        default:
            throw new Error(node.type);
            
    }
}

export function traverser(ast, visitor) {
    traveserNodeArray(ast.children, visitor);
}