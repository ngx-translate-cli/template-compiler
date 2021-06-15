
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

interface attrNode {
    name: string;
    value: string;
    type: 'CommonAttr' | 'ActiveAttr' | 'DynamicAttr'
}

export type {
    Node,
    NodeType,
    sourceState,
    attrNode
}