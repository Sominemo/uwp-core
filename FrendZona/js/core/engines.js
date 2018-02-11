// Набор функций, которые используются в различных местах
var engines = {
 
}

// Подключаемый метод к типу Object
// Предназначен для поиска ключа в сложных объектах

// @param *{object} a - объект для поиска
// @param *{string} b - искомый ключ
// @param {int} [c = -1] - глубина поиска. -1 - нет границы
// @param {bool} [d = false]
// @return (d == true ? {bool} : {array[bool, any]})
Object.prototype.findKey = function (b, c, d) {
    a = this;
    c = c || -1;
    d = d || false;
    // Tриггер
    let r = false;
    // Будущий результат, если он будет
    let res = false;
    // Массив для рекурсивного поиска по объекту
    let objects = [];
    // Временная переменная
    let tryv;

    // Этап A: Поиск в объекте
    if (typeof a == "object") {
        Object.keys(a).every((k) => {
            if (typeof a[k] == "object") objects.push(k);
            if (k === b) {
                r = true;
                res = a[k];
                return false;
            }
            return true;
        });
    }

    // Этап B: Рекурсивный поиск во вложенных объектах, если это позволяет заданная глубина
    if (!r && c !== 0 && objects.length) {
        objects.every((e) => {
            tryv = a[e].findKey(b, c - 1, true);
            if (tryv !== false) {
                r = true;
                res = tryv;
                return false;
            }
            return true;
        });
    }

    // Этап C: Проходим все элементы массива, если таков попадается
    if (!r && c !== 0 && typeof a == "array") {
        a.every((e) => {
            tryv = a[e].findKey(b, c - 1, true)
            if (tryv !== false) {
                r = true;
                res = tryv;
                return false;
            }
            return true;
        });
    }

    // Возвращаем результат
    return (d ? res : (r ? [r, res] : r));
} 