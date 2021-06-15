
import type { sourceState } from './types'

export class SourceWatch {
    private _tpl: string;
    constructor(source: string) {
        this._tpl = source.trim();
    }

    advance(len) {
        this._tpl = this._tpl.slice(len);
    }

    get tpl() {
        return this._tpl;
    }

    get peek() {
        return this._tpl.charAt(0)
    }


    getStr(start: number, end?: number) {
        return this._tpl.substring(start, end);
    }

    startWith(reg) {
        return this._tpl.match(reg);
    }

    indexOf(reg) {
        return this._tpl.indexOf(reg);
    }

    match(reg) {
        return this._tpl.match(reg);
    }
}