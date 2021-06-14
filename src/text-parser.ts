class TextParser {
    text = '';

    constructor(text) {
        this.text = text;
    }
    init() {
        const textTree = [];
        while(this.text) {
            const index = this.text.indexOf('{{');
            if(this.text.indexOf('{{') === 0) {
                this.text = this.text.slice(2);
                const _lastIndex = this.text.indexOf('}}');
                if(_lastIndex === -1) {
                    throw "parse error " + this.text;
                } else {
                    const node = {
                        type: 'Context',
                        name: this.text.slice(0, _lastIndex)
                    }
                    textTree.push(node);
                    this.text = this.text.slice(_lastIndex + 2);
                }
            } else {
                const findLeft = this.text.indexOf('{{');
                if(findLeft > -1) {
                    const node = {
                        type: 'Text',
                        content: this.text.slice(0, findLeft)
                    }
                    textTree.push(node);
                    this.text = this.text.slice(findLeft);
                } else {
                    const node = {
                        type: 'Text',
                        content: this.text
                    }
                    textTree.push(node);
                    this.text = '';
                }
            }
        }
        return textTree;
    }
}

export { TextParser }