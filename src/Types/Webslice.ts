import Bookmark from "./Bookmark";

export default class Webslice extends Bookmark {
    public isLivePreview: boolean = false;
    public previewSize: string = '';

    public constructor(isLivePreview: boolean, previewSize: string) {
        super();
        this.isLivePreview = isLivePreview;
        this.previewSize = previewSize;
    }

    public isWebSlice(): boolean {
        return true;
    }
}
