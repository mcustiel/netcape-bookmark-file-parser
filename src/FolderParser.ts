import Bookmark from './Types/Bookmark';
import Feed from './Types/Feed';
import Folder from './Types/Folder';
import Icon from './Types/Icon';
import Webslice from './Types/Webslice';

export default class FolderParser {

    public parse(groups: { [key: string]: string }): Folder
    {
        let parts: string[] = groups.FOLDER_ATTRIBUTES.split(' ');
        let element;
        let attributes: { [key: string]: string } = {};
        let attributeParts: string[];
        
        for (const key in parts) {
            if (Object.prototype.hasOwnProperty.call(parts, key)) {
                element = parts[key].trim();
                if (element !== '') {
                    attributeParts = element.split('=');
                    attributes[attributeParts[0].trim()] = attributeParts[1].trim().substr(1, attributeParts[1].length - 2);
                }
            }
        }
        let folder: Folder = new Folder(groups.FOLDER_NAME);
        this.setOptionalAttributes(folder, attributes);
        return folder;
    }

    private setOptionalAttributes(result: Folder, attributes: { [key: string]: string; }) {
        result.added = attributes.ADD_DATE ? new Date(attributes.ADD_DATE) : null;
        result.lastModified = attributes.LAST_MODIFIED ? new Date(attributes.LAST_MODIFIED) : null;
    }
}