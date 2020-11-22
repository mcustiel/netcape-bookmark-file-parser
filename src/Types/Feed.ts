import Bookmark from "./Bookmark";
import Item from "./Item";

export default class Feed extends Bookmark {
    public uri: string = '';

    public constructor(uri: string) {
        super();
        this.uri = uri;
    }

    public isFeed() : boolean {
        return true;
    }
}