import type { NodeType, Node } from './types'
import { reg } from './reg';
import { TextParser } from './text-parser';

import { isCloseSelf, Stack } from './utils';

export class HtmlParser {
    source: string;
    constructor(source) {
        this.source = source;
    }

    stack = new Stack({
        type: 'Body',
        parent: null,
        children: []
    })

    lastNode = null;

    parse() {
        let index = 0;
        while(this.source) {
            // comment node
            if(this.source.indexOf(reg.commentStart) === 0) {
                index = this.source.indexOf(reg.commentEnd);
                if(index) {
                    this.commentHandler({
                        type: 'Comment',
                        content: this.source.substring(4, index)
                    })
                    this._advance(index);
                }
            }
            // end tag.
            else if(this.source.indexOf(reg.tagEnd) === 0) {
                const match = this.source.match(reg.tagEndReg);
                if(match) {
                    this.endTagHandler(match);
                    this._advance(match[0].length);
                }
            }
            // start tag.
            else if(this.source.indexOf(reg.tagStart) === 0) {
                const match = this.source.match(reg.tagStartReg);
                if(match) {
                    this.startTagHandler(match);
                    this._advance(match[0].length);
                }
            }
            // text.
            else {
                const index = this.findTagIndex(this.source);
                const text = this.source.slice(0, index);
                this.textHandler(text);
                this._advance(index);
            }
        }
        return this.stack.getStack();
    }

    private _advance(step) {
        this.source = this.source.slice(step);
    }

    private commentHandler(node: Node) {
        var last = this.stack.last();
        last.children.push(node);
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
            children: []
        }
        const last = this.stack.last();
        isUnclose ? last.children.push(node) : this.stack.push(node);
    }

    private endTagHandler(match) {
        const tag = match[1];
        const last = this.stack.last();
        if(last && last.tag !== tag) {
            throw 'parser error' + this.source;
        } else {
            const child = this.stack.pop();
            const prvLast = this.stack.last();
            prvLast.children.push(child);
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
        const last = this.stack.last();
        last.children.push(..._arr);
    }
}