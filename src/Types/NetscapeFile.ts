import Folder from "./Folder";

export default class NetscapeFile {
    public title: string|null;
    public encoding: string|null;
    public root: Folder;

    public constructor(title: string|null) {
        this.title = title;
        this.encoding = null;
        this.root = new Folder(title ? title : '/bookmarks');
    }
}
