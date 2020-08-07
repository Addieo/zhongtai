const fs = require('fs');
const path = require('path');

const DATABASE = 'form';
const dataPath = path.join(__dirname, `data/${DATABASE}.json`)

/**
 * [{ id: 1, data: { ... } }]
 */
exports.get = (id) => {
    const list = getDatabase();
    const item = list.find((item) => item.id === id);
    if (item) {
        return item.data;
    }
    return null;
};

exports.put = (id, data) => {
    const list = getDatabase();
    const item = list.find((item) => item.id === id);
    if (item) {
        item.data = data;
    } else {
        list.push({ id, data });
    }
    setDatabase(list);
};

// 跟文件
function getDatabase() {
    // TODO 检查数据文件是否存在，不存在则新建
    try  {
        const buf = fs.readFileSync(dataPath);
        if (buf) {
            return JSON.parse(buf.toString());
        } else {
            return {};
        }
    } catch(err) {
        console.error('err', err);
        return null;
    }
}
function setDatabase(data) {
    const text = JSON.stringify(data);
    fs.writeFileSync(dataPath, text);
}
