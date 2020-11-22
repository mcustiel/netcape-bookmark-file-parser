import List from "../Collections/List";
import NetscapeObject from "./NetscapeObject";

type NullableDate = Date|null;

export default class Folder extends NetscapeObject {
    public name: string;
    public added: NullableDate = null;
    public lastModified: NullableDate = null;
    private children: List<NetscapeObject>;

    public constructor(name: string) {
        super();
        this.name = name;
        this.children = new List<NetscapeObject>([]);
    }

    public isFolder(): boolean {
        return true;
    }

    public addChild(child: NetscapeObject): void {
        this.children.add(child);
    }

    public count(): number {
        return this.children.count();
    }

    public getChildren(): Iterable<NetscapeObject> {
        return this.children.iterator();
    }
}
