const { HtmlParser, traverser, Generator } = require('../dist/index');
const { writeFile } = require('fs');
const { resolve } = require('path');


const ast = new HtmlParser(`<nz-badge
class="right15 btn-badge"
(click)="onClick(item)" title="测试"
*ngFor="let item of btnList"
>
<button class="btn-wrap" [class.btn-selected]="item.selected">
    {{ transforTitle(item) }}我在
</button>
</nz-badge>`).parse();

traverser(ast, {
    Text(node) {
        if(/[\u4e00-\u9fa5]/.test(node.content)) {
            node.content = `{{'a.v' | translate}}`;
        }
    },
    CommonAttr(node) {
        if(node.value && /[\u4e00-\u9fa5]/.test(node.value)) {
            node.name = `[${node.name}]`;
            node.value = `'zh.json' | translate`;
        }
    }
})
writeFile(resolve(__dirname, './test.json'), JSON.stringify(ast, null, '\t'), (err) => {
    console.log('parser successfully!');
});

writeFile(resolve(__dirname, './test.html'), Generator(ast), (err) => {
    console.log('parser successfully!');
});