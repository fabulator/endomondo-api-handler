export interface ApiUser {
    account_status: number;
    avatar_url: string;
    created_date: string;
    email: string;
    email_verified: boolean;
    first_name: string;
    has_accepted_terms: boolean;
    id: number;
    last_name: string;
    locale: {
        country: {
            id: string;
            name: string;
        };
        datetime_format: string;
        language: string;
        timezone_offset: number;
        unit: string;
    };
    premium: boolean;
    roles: unknown[];
}
