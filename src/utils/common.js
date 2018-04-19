export class Utils {

    static nodesBBox(nodes) {
        var min = (arr) => Math.min(...arr);
        var max = (arr) => Math.max(...arr);

        var left = min(nodes.map(node => node.position[0]));
        var top = min(nodes.map(node => node.position[1]));
        var right = max(nodes.map(node => node.position[0] + node.width));
        var bottom = max(nodes.map(node => node.position[1] + node.height));
        
        return {
            left,
            right,
            top,
            bottom,
            width: Math.abs(left - right),
            height:  Math.abs(top - bottom),
            getCenter: () => {
                return [
                    (left + right) / 2,
                    (top + bottom) / 2
                ];
            }
        };
    }

    static isValidData(data) {
        return typeof data.id === 'string' &&
            this.isValidId(data.id) &&
            data.nodes instanceof Object && !(data.nodes instanceof Array) && 
            (!data.groups || data.groups instanceof Object)
    }

    static isValidId(id) {
        return /^[\w-]{3,}@[0-9]+\.[0-9]+\.[0-9]+$/.test(id);
    }

    static validate(id, data) {
        var msg = '';
        var id1 = id.split('@');
        var id2 = data.id.split('@');

        if (!this.isValidData(data))
            msg += 'Data is not suitable. '; 
        if (id !== data.id)
            msg += 'IDs not equal. ';
        if (id1[0] !== id2[0])
            msg += 'Names don\'t match. ';
        if (id1[1] !== id2[1])
            msg += 'Versions don\'t match';

        return { success: msg ==='', msg };
    }
}