
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

interface sourceState {
    peek: string;
    tpl: string;
}

export type {
    Node,
    NodeType,
    sourceState
}