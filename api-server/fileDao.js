const fs = require('fs');
const path = require('path');


/**
 * [{ id: 1, data: { ... } }]
 */
exports.get = (db, id) => {
    const list = getDatabase(db);
    const item = list.find((item) => item.id === id);
    if (item) {
        return item.data;
    }
    return null;
};

exports.put = (db, id, data) => {
    const list = getDatabase(db);
    const item = list.find((item) => item.id === id);
    if (item) {
        item.data = data;
    } else {
        list.push({ id, data });
    }
    setDatabase(db, list);
};

exports.post = (db, data) => {
    const list = getDatabase(db);
    let id = 0;
    for (const item of list) {
        if (item.id > id) {
            id = item.id;
        }
    }
    list.push({ id: String(Number(id) + 1), data });
    setDatabase(db, list);
};

// 获取对应数据
function getDatabase(database) {
    const dataPath = path.join(__dirname, `data/${database}.json`)
    if (!fs.existsSync(dataPath)) {
        return [];
    }
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

// 刷新数据库
function setDatabase(database, data) {
    const dataPath = path.join(__dirname, `data/${database}.json`)
    const text = JSON.stringify(data);
    fs.writeFileSync(dataPath, text);
}
