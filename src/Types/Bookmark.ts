import Item from "./Item";
import Icon from "./Icon";

type NullableDate = Date|null;
type NullableIcon = Icon|null;
type NullableString = string|null;

export default class Bookmark extends Item {
    public href: string = '';
    public added: NullableDate = null;
    public lastVisited: NullableDate = null;
    public lastModified: NullableDate = null;
    public lastCharset: NullableString = null;
    public icon: NullableIcon = null;
    public isPrivate: boolean = false;
    public tags: NullableString = null;
    public shortcutUrl: NullableString = null;
    public name: string = '';
    public comment: NullableString = null;

    public isBookmark() : boolean {
        return true;
    }
}