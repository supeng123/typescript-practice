function getValueByPath(obj, path) {
    let paths = path.split('.');
    let res = obj;
    let prop;
    while ( prop = paths.shift()) {
        res = res[prop];
    }
    return res;
}
let paths = {
    a: {
        b: {
            c: {
                d: 'I am here',
            }
        }
    }
}
let result = getValueByPath(paths, 'a.b.c.d')
console.log(result)

class VNode {
    constructor(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase();
        this.data = data;
        this.value = value;
        this.type = type;
        this.children = [];
    }
    appendChild (vnode) {
        this.children.push(vnode);
    }
}

function generateVnode(node) {
    let nodeType = node.nodeType;
    let _vnode = null;
    if (type === 1) {
        let nodeName = node.nodeName;
        let attrs = node.attributes;
        let _attrObj = {};
        for ( var i = 0; i < attrs.length; i ++) {
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
        }
        _vnode = new VNode(nodeName, _attrObj, undefined, nodeType);

        let childNodes = node.childNodes;
        for (var i = 0 ; i < childNodes.length; i ++){
            _vnode.appendChild(generateVnode(childNodes[i]));
        }
    } else if (nodeType === 3) {
        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
    }
    return _vnode;
}

function parseVnode(vnode) {
    let type = vnode.type;
    let _node = null;
    if (type === 3) {
        return document.createTextNode(vnode.value);
    } else if (type === 1) {
        _node = document.createElement(vnode.tag);

        let data = vnode.data;
        Object.keys(data).forEach((key) => {
            let attrName = key;
            let attrValue = data[key];
            _node.setAttribute(attrName, attrValue);
        });

        let children = vnode.children;
        children.forEach( subvnode => {
            _node.appendChild(parseVnode(subvnode))
        })
        return _node;
    }
}

//function curry
let tags = 'html,div,a,img,ul,li,span'.split(',')
function makeUp(keys) {
    let set = {};
    tags.forEach(key => set[key] = true);
    return function (tagName) {
        return !! set[tagName.toLowerCase()];
    }
}

let isHtmlTag = makeUp(tags);
console.log(isHtmlTag('span'))

const rbracket = /\{\{().+?)\}\}/g;
function render(vnode, data) {
    let _type = vnode.type;
    let _data = vnode.data;
    let _value = vnode.value;
    let _tag = vnode.tag;
    let _children = vnode.children;

    let _vnode = null;
    if (_type === 3) {
        _value = _value.replace(rbracket, function(_, g) {
            return getValueByPath(data, g.trim())
        });
    } else if (_type = 1) {
        _vnode = new VNode(_tag, _data, _value, _type);
        _children.forEach(_subVnode => _subVnode.appendChild(render(_subVnode, data)));
    }
    return _vnode;
}
//data = {
    // supeng: {
    //     li: 2
    // }
// }
// const renderVnodeWithValue = render(generateVnode(vnode), data)