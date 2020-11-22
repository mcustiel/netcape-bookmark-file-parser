import { expect } from "chai";
import HtmlAttributesParser from "../src/HtmlAttributesParser";

describe("Html Attributes Parser", () => {
    
    const parser: HtmlAttributesParser = new HtmlAttributesParser;

    describe("parse", () => {

        it("works with normal attributes", () => {
            let res = parser.parse('attr1="val1" attr2="val2"');
            expect(JSON.stringify(res)).equal(JSON.stringify({attr1:"val1", attr2:"val2"}));

        });

        it("works with spaces in attribute value", () => {
            let res = parser.parse('attr1="val1 val" attr2="val2"');
            expect(JSON.stringify(res)).equal(JSON.stringify({attr1:"val1 val", attr2:"val2"}));

        });

        it("works with empty attributes list", () => {
            let res = parser.parse('');
            expect(JSON.stringify(res)).equal(JSON.stringify({}));

        });
    });
});