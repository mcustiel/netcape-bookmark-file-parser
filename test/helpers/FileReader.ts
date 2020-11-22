export default class FileReader {

    private fs = require('fs');

    public read(path: string): string {
        return this.fs.readFileSync(path);
    }
}