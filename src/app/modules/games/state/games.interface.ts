// all objects inside types must be called with a *
// 1 ESRB / 2 PEGI / 3 CERO / 4 USK / 5 GRAC / 6 BR / 7 ACB (AU)
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
  name: string;
  platform_family?: GenericInfo;
  platform_logo: Partial<Image>;
  slug: string;
  summary: string;
  websites: Website[];
  local_update?: number; // local update for fetching each 24 hours
}

export interface Ratings {
  critics?: number; // from media critics
  criticsCount?: number;
  users?: number; // from IGDB users
  userCount?: number;
  total?: number; // from both data
  totalCount?: number;
}

// 1 EU / 2 NA / 3 AU / 4 NZ / 5 JP / 6 CN / 7 Asia / 8 Worldwide / 9 KR / 10 BR
export interface ReleaseDate {
  date: number;
  platform: Partial<Platform>;
  region: number;
}

export interface Video {
  name: string;
  id: string;
  video_id: string;
}

export interface Website {
  category: number;
  id?: number;
  trusted: boolean;
  url: string;
}

export interface Game {
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  category: number;
  cover: Partial<Image>;
  first_release_date: number;
  genres: GenericInfo[];
  id: number;
  name: string;
  platforms?: Partial<Platform>[];
  slug: string;
  rating?: number;
  rating_count?: number;
  themes: GenericInfo[];
  total_rating?: number;
  total_rating_count: number;
  updated_at?: number;
}

export interface GameFullInfo extends Game {
  age_ratings?: AgeRatings;
  artworks?: Image[];
  created_at: number;
  dlcs?: Game[];
  expansions?: Game[];
  follows: number;
  franchise?: Franchise;
  franchises?: Franchise[];
  game_engines?: Partial<GameEngine>[];
  game_modes: GenericInfo[];
  hypes?: number;
  involved_companies: InvolvedCompany[];
  parent_game?: Game; // if dlc or expansion
  player_perspectives?: GenericInfo[];
  ports?: Game[];
  release_dates: ReleaseDate[];
  remakes?: Game[];
  remasters?: Game[];
  screenshots?: Image[];
  similar_games?: Game[];
  status: number; // is dlc or expansion? enum
  storyline?: string;
  summary: string;
  version_parent?: Game;
  version_title: string;
  videos?: Video[];
  websites?: Website[];
  local_update?: number; // local update for fetching each 24 hours
}
