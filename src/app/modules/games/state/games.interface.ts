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
  logo: Partial<Image>;
  name: string;
  parent?: Company;
  published?: Game[];
  slug: string;
  start_date: string | number;
  start_date_category: number;
  websites: Website[];
  local_update?: number; // local update for fetching each 24 hours
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
  logo: Partial<Image>;
  name: string;
  platforms: Platform[];
  slug: string;
  local_update?: number; // local update for fetching each 24 hours
}

export interface GenericInfo {
  id?: number;
  name: string;
  slug: string;
}

export interface Image {
  alpha_channel: boolean;
  animated?: boolean;
  id?: number;
  url: string;
  height?: number;
  width?: number;
}

export interface InvolvedCompany {
  company: Partial<Company>;
  developer: boolean;
  porting?: boolean;
  publisher?: boolean;
  supporting?: boolean;
}

export interface Platform {
  abbreviation: string;
  alternative_name: string;
  category: number;
  generation?: number;
  id: number;
  name: number;
  platform_family?: GenericInfo;
  logo: Partial<Image>;
  slug: string;
  summary: string;
  websites: Website[];
  local_update?: number; // local update for fetching each 24 hours
}

export interface ReleaseDate {
  date: number;
  platform: Platform;
  region: number;
}

export interface Video {
  name: string;
  id: string;
}

export interface Website {
  category: number;
  id?: number;
  trusted: boolean;
  url: string;
}

export interface Game {
  cover: Partial<Image>;
  id: number;
  name: string;
  slug: string;
}

export interface GameFullInfo extends Game {
  age_ratings?: AgeRatings;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  artwork?: Image[];
  category: number;
  created_at: number;
  dlcs?: Game[];
  expansions?: Game[];
  first_release_date: number;
  follows: number;
  franchise?: Franchise;
  franchises?: Franchise[];
  game_engines?: Partial<GameEngine>[];
  game_modes: GenericInfo[];
  genres: GenericInfo[];
  hypes?: number;
  involved_companies: InvolvedCompany[];
  keywords?: GenericInfo[];
  parent_game?: Game; // if dlc or expansion
  player_perspectives?: GenericInfo[];
  ports?: Game[];
  rating?: number;
  rating_count?: number;
  release_dates: ReleaseDate[];
  remakes?: Game[];
  remasters?: Game[];
  screenshots?: Image[];
  similar_games?: Game[];
  status: number; // is dlc or expansion? enum
  storyline?: string;
  summary: string;
  themes: GenericInfo[];
  total_rating?: number;
  total_rating_count: number;
  version_parent?: Game;
  version_title: string;
  videos?: Video[];
  local_update?: number; // local update for fetching each 24 hours
}
