import type { NodeType, Node } from './types'
import { reg } from './reg';
import { TextParser } from './text-parser';

import { isCloseSelf } from './utils';

export class HtmlParser {

    parentNode: NodeType = {
        type: 'Body',
        parent: null,
        children: []
    }

    ast = [this.parentNode];

    lastNode = null;

    parse(source: string) {
        let index = 0;
        while(source) {
            // comment node
            if(source.indexOf(reg.commentStart) === 0) {
                index = source.indexOf(reg.commentEnd);
                if(index) {
                    this.commentHandler({
                        type: 'Comment',
                        content: source.substring(4, index)
                    })
                    source = this._advance(source, index);
                }
            }
            // end tag.
            else if(source.indexOf(reg.tagEnd) === 0) {
                const match = source.match(reg.tagEndReg);
                if(match) {
                    this.endTagHandler(match);
                    source = this._advance(source, match[0].length);
                }
            }
            // start tag.
            else if(source.indexOf(reg.tagStart) === 0) {
                const match = source.match(reg.tagStartReg);
                if(match) {
                    this.startTagHandler(match);
                    source = this._advance(source, match[0].length);
                }
            }
            // text.
            else {
                const index = this.findTagIndex(source);
                const text = source.slice(0, index);
                this.textHandler(text);
                source = this._advance(source, index);
            }
        }
        return this.ast;
    }

    private _advance(source, step) {
        return source.slice(step);
    }

    private commentHandler(node: Node) {
        this.parentNode.children.push(node)
    }

    private startTagHandler(match) {
        const tag = match[1];
        const attrString = match[2];
        let isUnclose = false; // 是否需要关闭得标签
        if(isCloseSelf(tag)) {
            isUnclose = true;
        }
        const node = {
            type: 'Element',
            tag,
            attr: attrString,
            parent: this.parentNode,
            children: []
        }

        if(!isUnclose) {
            this.parentNode = node;
        } else {
            this.parentNode.children.push(node);
        }
    }

    private endTagHandler(match) {
        const tag = match[1];
        if(this.parentNode.tag !== tag) {
            throw "error";
        } else {
            const node = this.parentNode;
            this.parentNode = this.parentNode.parent;
            this.parentNode.children.push(node);
        }
    }

    private findTagIndex(source) {
        let index = 0;
        while(index < source.length && source.charAt(index) !== '<') {
            index++;
        }
        return index;
    }

    private textHandler(text: string) {
        const instance = new TextParser(text);
        const _arr = instance.init();
        this.parentNode.children.push(..._arr);

    }
}