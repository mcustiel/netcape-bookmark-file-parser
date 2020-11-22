export default class List<T> {
    private list: T[];

    public constructor (list: T[]) {
        this.list = list;
    }

    public add(value: T): void {
        this.list.push(value);
    }

    public iterator(): Iterable<T> {
        return this.list;
    }

    public isEmpty(): boolean {
        return this.list.length === 0;
    }

    public count(): number {
        return this.list.length;
    }
}