type NullableString = string|null;

export default class Icon {
    public uri: NullableString;
    public content: NullableString;

    public constructor(uri: NullableString, content: NullableString) {
        this.uri = uri;
        this.content = content;
    }
}