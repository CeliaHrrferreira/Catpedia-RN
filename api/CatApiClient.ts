export interface Breed {
    weight: Weight;
    id: string;
    name: string;
    cfa_url?: string;
    vetstreet_url?: string;
    vcahospitals_url?: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    description: string;
    life_span: string;
    indoor: number;
    lap?: number;
    alt_names?: string;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    shedding_level: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;
    experimental: number;
    hairless: number;
    natural: number;
    rare: number;
    rex: number;
    suppressed_tail: number;
    short_legs: number;
    wikipedia_url?: string;
    hypoallergenic: number;
    reference_image_id?: string;
    image?: Image;
    cat_friendly?: number;
    bidability?: number;
}

export interface Image {
    id: string;
    width: number;
    height: number;
    url: string;
}

export interface Weight {
    imperial: string;
    metric: string;
}

export interface BreedDetail {
    id: string;
    url: string;
    width: number;
    height: number;
}

export default class CatApiClient {
    static API_KEY = 'cd7828b3-f9d5-41ac-8008-ecf17b046d82';
    static BASE_URL = 'https://api.thecatapi.com/v1/';

    async getCatsBreeds(): Promise<Breed[]> {
        let url: string = `${CatApiClient.BASE_URL}breeds?x-api-key=${CatApiClient.API_KEY}`;
        const response: Response = await fetch(url);
        const responseJson: Breed[] = await response.json();
        return responseJson;
    }

    async getBreedDetail(id: string): Promise<BreedDetail[]> {
        let url: string = `${CatApiClient.BASE_URL}images/search?breed_ids=${id}&limit=4&x-api-key=${CatApiClient.API_KEY}`;
        const response: Response = await fetch(url);
        const responseJson: BreedDetail[] = await response.json();
        return responseJson;
    }


}