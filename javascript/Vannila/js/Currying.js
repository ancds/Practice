var add = function (x, y) {
    'use strict';

    if (y === 'undefined') {
        return function (y) {
            return x + y;
        };
    }

    return x + y;
};

function schonfinkelize(fn) {
    'use strict';
    var slice = Array.prototype.slice,
        stored_args = slice.call(arguments, 1);

    return function () {

        var new_args = slice.call(arguments, 1),
            args = stored_args.concat(new_args);

        return fn.apply(null, args);
    };
}