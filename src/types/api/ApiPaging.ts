export interface ApiPaging {
    paging: {
        next: string;
        previous?: string;
        total: number;
    };
}
