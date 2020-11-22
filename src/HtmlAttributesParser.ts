export default class HtmlAttributesParser {

    public parse (attrText: string): { [key: string]: string} {
        let inAttrName: boolean = false;
        let inAttrValue: boolean = false;
        let textAccumulator:string = ""
        let currentAttributeName: string = "";
        let result: { [key: string]: string} = {};

        for (let i = 0; i < attrText.length; i++) {
            let char: string = attrText.charAt(i);
            if (char === '"') {
                if (inAttrValue) {
                    inAttrValue = false;
                    result[currentAttributeName] = textAccumulator;
                }
                if (inAttrName) {
                    inAttrName = false;
                    inAttrValue = true;
                    currentAttributeName = textAccumulator;
                }
                textAccumulator = "";
                continue;
            }
            if (char === '=') {
                if (inAttrName) {
                    continue;
                }
            }
            if (char === ' ') {
                if (inAttrValue) {
                    textAccumulator += char;
                }
                continue;
            }
            
            if (!inAttrName && !inAttrValue) {
                inAttrName = true;
            }
            textAccumulator += char;
        }
        return result;
    }
}