import { uid } from "uid";
import CacheError from "./Error";

type ResolvableType = string | number | boolean | object | object[] | string[] | number[];
type PredicateType<T> = (value: ResolvableType, index: number, array: StructureType[]) => boolean;

interface StructureType {
  Pointer: string;
  Reference: string;
  value: ResolvableType;
}

class Cache {
  private _elements: StructureType[] = [];
  private _elementsMap: Map<string, StructureType> = new Map();

  Add(value: ResolvableType, reference: string): number {
    if (this._elementsMap.has(reference)) {
      throw new CacheError(1, `Reference "${reference}" is already in use.`);
    }
    const _pointerid = uid(12);
    const newElement: StructureType = { Pointer: _pointerid, Reference: reference, value };
    this._elements.push(newElement);
    this._elementsMap.set(reference, newElement);
    return this._elements.length;
  }

  Delete(Reference: string): this {
    if (!this._elementsMap.has(Reference)) {
      throw new CacheError(2, `Reference "${Reference}" not found.`);
    }
    this._elements = this._elements.filter(item => item.Reference !== Reference);
    this._elementsMap.delete(Reference);
    return this;
  }

  Edit(value: ResolvableType, predicate: PredicateType<ResolvableType>): void {
    const exists = this.Exist(predicate);
    if (!exists) throw new CacheError(2);
    const element = this._elements.findIndex(predicate);
    if (typeof this._elements[element].value !== typeof value) {
      throw new CacheError(0, `Type mismatch for reference "${this._elements[element].Reference}"`);
    }
    this._elements[element].value = value;
  }

  Clear(): void {
    this._elements.length = 0;
    this._elementsMap.clear();
  }

  ForEach(predicate: PredicateType<ResolvableType>): void {
    this._elements.forEach(predicate);
  }

  Find(predicate: PredicateType<ResolvableType>): ResolvableType {
    const element = this._elements.find(predicate);
    if (!element) throw new CacheError(2);
    return element.value;
  }

  Exist(predicate: PredicateType<ResolvableType>): boolean {
    return this._elements.some(predicate);
  }

  All(): StructureType[] {
    return this._elements;
  }

  Size(): number {
    return this._elements.length;
  }

  Check(predicate: PredicateType<ResolvableType>): boolean {
    return this._elements.every(predicate);
  }
}

export default Cache;