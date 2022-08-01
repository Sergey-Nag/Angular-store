export class Book {
    constructor(
        public id: string,
        public count: number,
        public price: number,
        public title: string,
        public author: string,
        public level: string,
        public description: string,
        public cover: string,
        public tags: string[],
    ) {}
}