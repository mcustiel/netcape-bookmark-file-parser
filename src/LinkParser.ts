import HtmlAttributesParser from './HtmlAttributesParser';
import Bookmark from './Types/Bookmark';
import Feed from './Types/Feed';
import Icon from './Types/Icon';
import Webslice from './Types/Webslice';

export default class LinkParser {
    private attributesParser: HtmlAttributesParser;

    public constructor(attributesParser: HtmlAttributesParser|null = null) {
        this.attributesParser = attributesParser === null ? new HtmlAttributesParser() : attributesParser;
    }

    public parse(groups: { [key: string]: string }): Bookmark
    {
        let attributes: { [key: string]: string } = this.attributesParser.parse(groups.LINK_ATTRIBUTES);
        
        let bookmark: Bookmark = this.createBookmarkObject(attributes);
        this.setHrefIfPresent(bookmark, attributes);
        this.setIconIfPresent(bookmark, attributes);
        this.setOptionalAttributes(bookmark, attributes);
        this.setBookmarkNameIfPresent(groups, bookmark);
        this.setCommentIfPresent(groups, bookmark);
        return bookmark;
    }

    private setCommentIfPresent(groups: { [key: string]: string; }, bookmark: Bookmark) {
        if (groups.COMMENT) {
            bookmark.name = groups.COMMENT_TEXT;
        }
    }

    private setBookmarkNameIfPresent(groups: { [key: string]: string; }, bookmark: Bookmark) {
        if (groups.LINK_NAME) {
            bookmark.name = groups.LINK_NAME;
        }
    }

    private createBookmarkObject(attributes: { [key: string]: string; }) {
        let result: Bookmark;
        if (attributes.FEED === 'true') {
            result = new Feed(attributes.FEEDURL);
        } else if (attributes.WEBSLICE === 'true') {
            result = new Webslice(
                attributes.ISLIVEPREVIEW === 'true',
                attributes.PREVIEWSIZE || ''
            );
        } else {
            result = new Bookmark();
        }
        return result;
    }

    private setOptionalAttributes(result: Bookmark, attributes: { [key: string]: string; }) {
        result.added = attributes.ADD_DATE ? new Date(attributes.ADD_DATE) : null;
        result.lastVisited = attributes.LAST_VISIT ? new Date(attributes.LAST_VISIT) : null;
        result.lastModified = attributes.LAST_MODIFIED ? new Date(attributes.LAST_MODIFIED) : null;
        result.lastCharset = attributes.LAST_CHARSET ? attributes.LAST_CHARSET : null;
        result.isPrivate = attributes.PRIVATE === 'true';
        result.tags = attributes.TAGS ? attributes.TAGS : null;
        result.shortcutUrl = attributes.SHORTCUTURL ? attributes.SHORTCUTURL : null;
    }

    private setIconIfPresent(result: Bookmark, attributes: { [key: string]: string; }) {
        if (attributes.ICON || attributes.ICON_URI) {
            result.icon = new Icon(
                attributes.ICON_URI ? attributes.ICON_URI : null,
                attributes.ICON ? attributes.ICON : null
            );
        }
    }

    private setHrefIfPresent(result: Bookmark, attributes: { [key: string]: string; }) {
        if (attributes.HREF) {
            result.href = attributes.HREF;
        }
    }
}