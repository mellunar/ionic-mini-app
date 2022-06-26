// all objects inside types must be called with a *
export interface AgeRatings {
  category: number;
  rating: number;
  id?: number;
}

export interface Company {
  change_date?: string | number;
  change_date_category?: number;
  changed_company_id?: number; // needs verification
  country: string;
  description: string;
  developed?: Game[];
  id: number;
  logo: Image;
  name: string;
  parent?: Company;
  published?: Game[];
  slug: string;
  start_date: string | number;
  start_date_category: number;
  websites: Website[];
}

export interface Franchise {
  games: Game[];
  id: number;
  name: string;
  slug: string;
}

export interface GameEngine {
  companies?: Company[];
  description: string;
  id: number;
  logo: Image;
  name: string;
  platforms: Platform[];
  slug: string;
}

export interface GenericInfo {
  id?: number;
  name: string;
  slug: string;
}

export interface Image {
  alpha_channel: boolean;
  animated: boolean;
  id?: number;
  url: string;
  height: number;
  width: number;
}

export interface Platform {
  abbreviation: string;
  alternative_name: string;
  category: number;
  generation?: number;
  id: number;
  name: number;
  platform_family?: GenericInfo;
  logo: Image;
  slug: string;
  summary: string;
  websites: Website[];
}

export interface Website {
  category: number;
  id?: number;
  trusted: boolean;
  url: string;
}

export interface Game {
  age_ratings?: AgeRatings;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  artwork?: Image[];
  category: number;
  created_at: number;
  cover: Image;
  dlcs?: Game[];
  expansions?: Game[];
  first_release_date: number;
  follows: number;
  franchise?: Franchise;
  franchises?: Franchise[];
  game_engines?: GameEngine[];
  game_modes: GenericInfo[];
  genres: GenericInfo[];
  hypes?: number;
  id: number;
  keywords?: GenericInfo[];
  name: string;
  parent_game?: Game; // if dlc or expansion
  player_perspectives?: GenericInfo[];
  ports?: Game[];
  rating?: number;
  rating_count?: number;
  slug: string;
  summary: string;
}
