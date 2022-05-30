export interface IState {
    dogs: [
        {
            name: string;
            url: string;
            image: string;
        }?
    ];
    breeds: string[];
    sort: boolean;
    currentBreed: number;
}
