
interface Node {
    type: 'Comment' | 'Text';
    content: string;
}

interface NodeType {
    type: string;
    tag?: string;
    children: Array<Node | NodeType>;
    parent: NodeType
}

export type {
    Node,
    NodeType
}