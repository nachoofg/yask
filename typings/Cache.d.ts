type ResolvableType = string | number | boolean | object | object[] | string[] | number[];
type PredicateType<T> = (value: ResolvableType, index: number, array: StructureType[]) => boolean;
interface StructureType {
    Pointer: string;
    Reference: string;
    value: ResolvableType;
}
declare class Cache {
    private _elements;
    private _elementsMap;
    Add(value: ResolvableType, reference: string): number;
    Delete(Reference: string): this;
    Edit(value: ResolvableType, predicate: PredicateType<ResolvableType>): void;
    Clear(): void;
    ForEach(predicate: PredicateType<ResolvableType>): void;
    Find(predicate: PredicateType<ResolvableType>): ResolvableType;
    Exist(predicate: PredicateType<ResolvableType>): boolean;
    All(): StructureType[];
    Size(): number;
    Check(predicate: PredicateType<ResolvableType>): boolean;
}
export default Cache;
