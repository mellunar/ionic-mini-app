import { GenericInfo, Image, Website } from '../../games/state/games.interface';

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
