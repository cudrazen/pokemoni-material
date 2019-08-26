export interface PokemonResponse {
    count: number;
    next: string;
    previous: string;
    results: Array<NameUrl>
}

export interface NameUrl {
    name: string;
    url: string;
}

export interface PokemonDetailsResponse {
    name: string;
    types: Array<Type>;
    height: number;
    weight: number;
    abilities: Array<Ability>;
    base_experience: number;
}

export interface Ability {
    ability: Array<NameUrl>;
}

export interface Type {
    slot: number;
    type: Array<NameUrl>;
}

export interface Pokemons {
    name: string;
    types: Array<any>;
    heightWeight: string;
    abilities: Array<any>;
    base_experience: number;
}