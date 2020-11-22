import { expect } from 'chai';
import Parser from '../src/Parser';
import Bookmark from '../src/Types/Bookmark';
import Feed from '../src/Types/Feed';
import Folder from '../src/Types/Folder';
import Item from '../src/Types/Item';
import NetscapeFile from '../src/Types/NetscapeFile';
import NetscapeObject from '../src/Types/NetscapeObject';
import Webslice from '../src/Types/Webslice';
import FileReader from './helpers/FileReader'

function getBookmarksFileContent(fileName: string): string {
    return (new FileReader).read(__dirname + '/fixtures/' + fileName + '.html');
}

// function print(folder: Folder, level: number = 0) {
//     console.log(' '.repeat(level) + 'Folder: ' + folder.name);
//     for (let item of folder.getChildren()) {
//         if (item.isFolder()) {
//             print(item as Folder, level+2);
//         } else if (item.isItem()) {
//             let noFolder: Item = item as Item;
//             if (!noFolder.isBookmark()) {console.log("No bookmark " + item);}
//             if (noFolder.isFeed()) {
//                 let feed: Feed = noFolder as Feed;
//                 console.log(' '.repeat(level+2) + 'Feed ' + feed.name);
//             } else if (noFolder.isWebSlice()) {
//                 let webslice: Webslice = noFolder as Webslice;
//                 console.log(' '.repeat(level+2) + 'Feed ' + webslice.name);
//             } else if (noFolder.isBookmark()) {
//                 let bookmark: Bookmark = noFolder as Webslice;
//                 console.log(' '.repeat(level+2) + 'Bookmark ' + bookmark.name);
//             } else if (noFolder.isSeparator()) {
//                 console.log(' '.repeat(level+2) + 'Separator');
//             }
//         }
//     }
// }

describe("Parser", () => {
    
    const parser: Parser = new Parser();

    describe("parse", () => {

        it("works with empty string and sets defaults", () => {
            const data: NetscapeFile = parser.parse('');
            expect(data.title).to.be.null;
            expect(data.encoding).to.be.null;
            expect(data.root.count()).to.be.equal(0);
            expect(data.root.name).to.be.equal('/bookmarks');
        });

        it("parses all type of elements", () => {
            const matchers: Function[] = [
                (element: NetscapeObject) => {
                    expect(element.isItem()).to.be.true;
                    expect((element as Item).isBookmark()).to.be.true;
                },
                (element: NetscapeObject) => {
                    expect(element.isItem()).to.be.true;
                    expect((element as Item).isSeparator()).to.be.true;
                },
                (element: NetscapeObject) => {
                    expect(element.isFolder()).to.be.true;
                    expect((element as Folder).name).equal('Test folder');
                }
                ,
                (element: NetscapeObject) => {
                    expect(element.isItem()).to.be.true;
                    expect((element as Item).isBookmark()).to.be.true;
                    expect((element as Bookmark).name).equal('Ubuntu');
                }
            ];

            const data: NetscapeFile = parser.parse(getBookmarksFileContent('all-elements-flat'));
            expect(data.title).equal('Menú Marcadores');
            expect(data.encoding).to.be.equal('UTF-8');
            expect(data.root.name).to.be.equal('Menú Marcadores');
            // expect(data.root.count()).equal(7);
            const elements = data.root.getChildren();
            let counter = 0;
            for (const element of elements) {
                if (matchers[counter] !== undefined)
                matchers[counter++](element);                
            }
        });

        it("Should return a list of matches", () => {
            //const ret: NetscapeFile = parser.parse(bookmarks);
            //console.log(ret);
            //print(ret.root);
        });

    })

});
