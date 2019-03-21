export interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar_url: string,
    has_accepted_terms: boolean,
    email_verified: boolean,
    account_status: number,
    created_date: string,
    locale: {
        language: string,
        country: {
            id: string,
            name: string,
        },
        unit: string,
        timezone_offset: number,
        datetime_format: string,
    },
    roles: any[],
    premium: boolean,
}
