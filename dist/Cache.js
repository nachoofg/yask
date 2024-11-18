"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uid_1 = require("uid");
const Error_1 = __importDefault(require("./Error"));
class Cache {
    constructor() {
        this._elements = [];
        this._elementsMap = new Map();
    }
    Add(value, reference) {
        if (this._elementsMap.has(reference)) {
            throw new Error_1.default(1, `Reference "${reference}" is already in use.`);
        }
        const _pointerid = (0, uid_1.uid)(12);
        const newElement = { Pointer: _pointerid, Reference: reference, value };
        this._elements.push(newElement);
        this._elementsMap.set(reference, newElement);
        return this._elements.length;
    }
    Delete(Reference) {
        if (!this._elementsMap.has(Reference)) {
            throw new Error_1.default(2, `Reference "${Reference}" not found.`);
        }
        this._elements = this._elements.filter(item => item.Reference !== Reference);
        this._elementsMap.delete(Reference);
        return this;
    }
    Edit(value, predicate) {
        const exists = this.Exist(predicate);
        if (!exists)
            throw new Error_1.default(2);
        const element = this._elements.findIndex(predicate);
        if (typeof this._elements[element].value !== typeof value) {
            throw new Error_1.default(0, `Type mismatch for reference "${this._elements[element].Reference}"`);
        }
        this._elements[element].value = value;
    }
    Clear() {
        this._elements.length = 0;
        this._elementsMap.clear();
    }
    ForEach(predicate) {
        this._elements.forEach(predicate);
    }
    Find(predicate) {
        const element = this._elements.find(predicate);
        if (!element)
            throw new Error_1.default(2);
        return element.value;
    }
    Exist(predicate) {
        return this._elements.some(predicate);
    }
    All() {
        return this._elements;
    }
    Size() {
        return this._elements.length;
    }
    Check(predicate) {
        return this._elements.every(predicate);
    }
}
exports.default = Cache;
//# sourceMappingURL=Cache.js.map