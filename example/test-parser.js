const { HtmlParser, traverser, Generator } = require('../dist/index');
const { writeFile } = require('fs');
const { resolve } = require('path');


const ast = new HtmlParser(`<p>测试文件{{ab}}</p>`).parse();

traverser(ast[0], {
    Text(node) {
        node.content = `{{'a.v' | translate}}`;
    }
})

writeFile(resolve(__dirname, './test.html'), Generator(ast), (err) => {
    console.log('parser successfully!');
});