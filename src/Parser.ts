import { isNonNullChain } from 'typescript';
import FolderParser from './FolderParser';
import LinkParser from './LinkParser';
import Folder from './Types/Folder';
import NetscapeFile from './Types/NetscapeFile';
import Separator from './Types/Separator';

const ELEMENTS_REGEX = '(?<OPEN_TAG><DT>\\s*<H3(?<FOLDER_ATTRIBUTES>[^>]*)>(?<FOLDER_NAME>[^<]*)</H3>\\s*<DL>\\s*<p>)|(?<CLOSE_TAG></DL>\\s*<p>)|(?<LINK><DT>\\s*<A(?<LINK_ATTRIBUTES>[^>]*)>(?<LINK_NAME>[^<]*)</A>(?<COMMENT>\\s*<DD>(<COMMENT_TEXT[^<]*))?|(?<SEPARATOR><HR>))';
const CHARSET_REGEX = '<META[^>]*charset=(?<CHARSET>[\\w\\-]+)';
const TITLE_REGEX = '<H1>(?<TITLE>[^<]+)<\/H1>';

export default class  Parser {

    private parserRegex: RegExp;
    private charsetRegex: RegExp;
    private titleRegex: RegExp;
    private linkParser: LinkParser;
    private folderParser: FolderParser;

    public constructor(folderParser: FolderParser|null = null, linkParser: LinkParser|null = null) {
        this.parserRegex = new RegExp(ELEMENTS_REGEX, 'gm');
        this.charsetRegex = new RegExp(CHARSET_REGEX);
        this.titleRegex = new RegExp(TITLE_REGEX);
        this.linkParser = linkParser === null ? new LinkParser() : linkParser;
        this.folderParser = folderParser === null ? new FolderParser(): folderParser;
    }

    public getTitle(bookmarks:string): string|null {
        const array:RegExpExecArray | null = this.titleRegex.exec(bookmarks);
        if (array !== null && array.groups) {
            return array.groups.TITLE;
        }

        return null;
    }

    public getCharset(bookmarks:string): string|null {
        const array:RegExpExecArray | null = this.charsetRegex.exec(bookmarks);
        if (array !== null && array.groups) {
            return array.groups.CHARSET;
        }
        
        return null;
    }

    public parse(bookmarks:string): NetscapeFile {        
        const netscapeFile = new NetscapeFile(this.getTitle(bookmarks));
        netscapeFile.encoding = this.getCharset(bookmarks);
        this.executeRegexAndSaveResult(bookmarks, netscapeFile.root);

        return netscapeFile;
    }

    private executeRegexAndSaveResult(bookmarks: string, parentFolder: Folder) : void {
        let array: RegExpExecArray | null;
        let groups: { [key: string]: string };

        while ((array = this.parserRegex.exec(bookmarks)) !== null) {
            if (array.groups) {
                groups = array.groups;
                if (groups.OPEN_TAG) {
                    let folder: Folder = this.folderParser.parse(groups);
                    parentFolder.addChild(folder);
                    this.executeRegexAndSaveResult(bookmarks, folder);
                } else if (groups.CLOSE_TAG) {
                    break;
                } else if (groups.SEPARATOR) {
                    parentFolder.addChild(new Separator());
                } else if (groups.LINK) {
                    parentFolder.addChild(this.linkParser.parse(groups));
                }
            }
        }
    }
}