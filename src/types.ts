
interface commentNode {
    type: 'Comment';
    content: string;
}

interface NodeType {
    type: string;
    tag?: string;
    children: Array<NodeType | commentNode>;
    parent: NodeType
}

export type {
    commentNode,
    NodeType
}