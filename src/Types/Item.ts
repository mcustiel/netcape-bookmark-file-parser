import NetscapeObject from "./NetscapeObject";
export default class Item extends NetscapeObject {

    public isItem(): boolean {
        return true;
    }

    public isFeed(): boolean {
        return false;
    }

    public isIcon(): boolean {
        return false;
    }

    public isSeparator(): boolean {
        return false;
    }

    public isBookmark(): boolean {
        return false;
    }

    public isWebSlice(): boolean {
        return false;
    }
}