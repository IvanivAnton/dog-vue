export interface IState {
    dogs: [
        {
            name: string;
            url: string;
            image: string;
        }?
    ];
    breeds?: {
        value: string[];
    };
    sort: boolean;
    currentBreed: number;
}
