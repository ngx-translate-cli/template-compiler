import type { NodeType, Node } from './types'
import * as sym from './symbols';
import { TextParser } from './text-parser';

import { isCloseSelf } from './utils';
import { SourceWatch } from './source';
import { Stack } from './stack';

export class HtmlParser {
    source: SourceWatch;
    constructor(source) {
        this.source = new SourceWatch(source);
    }

    stack = new Stack({
        type: 'Body',
        parent: null,
        children: []
    })

    lastNode = null;

    parse() {
        while(this.source.tpl) {
            if(this.source.startWith(sym.commentStart)) {
                this.comment();
            } else if(this.source.startWith(sym.tagEndReg)) {
                this.endTag();
            } else if(this.source.startWith(sym.tagStartReg)) {
                this.startTag();
            } else {
                let text = '';
                while(
                    this.source.tpl &&
                    !sym.tagStartReg.test(this.source.tpl) &&
                    !sym.tagEndReg.test(this.source.tpl) &&
                    !sym.commentReg.test(this.source.tpl)
                ) {
                    let index = 0;
                    if(this.source.peek === sym.tagStart) {
                        index = 1;
                    } else {
                        const _index = this.source.tpl.indexOf(sym.tagStart);
                        index = _index < 0 ? this.source.tpl.length : _index; 
                    }
                    text += this.source.getStr(0, index);
                    this._advance(index);
                }
                this.textHandler(text);
            }
        }
        return this.stack.getStack();
    }

    private _advance(step) {
        this.source.advance(step);
    }

    private comment() {
        let index = this.source.indexOf(sym.commentEnd);
        if(index) {
            const node = {
                type: 'Comment',
                content: this.source.getStr(4, index)
            }
            const last = this.stack.last();
            last.children.push(node);
            this._advance(index);
        }

    }

    private startTag() {
        const match = this.source.match(sym.tagStartReg);
        if(match) {
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
            this._advance(match[0].length);
        }
    }

    private endTag() {
        const match = this.source.match(sym.tagEndReg);
        if(match) {
            const tag = match[1];
            const last = this.stack.last();
            if(last && last.tag !== tag) {
                throw 'parser error' + this.source;
            } else {
                const child = this.stack.pop();
                const prvLast = this.stack.last();
                prvLast.children.push(child);
            }
            this._advance(match[0].length);
        }

    }

    private textHandler(text: string) {
        const instance = new TextParser(text);
        const _arr = instance.init();
        const last = this.stack.last();
        last.children.push(..._arr);
    }
}