export interface IGDBToken {
  access_token: string;
  expires_in: number;
  token_type?: string;
}

export type IGDBImage =
  | 'cover_small' // 90 x 128
  | 'screenshot_med' // 569 x 320
  | 'cover_big' // 264 x 374
  | 'logo_med' // 284 x 160
  | 'screenshot_big' // 889 x 500
  | 'screenshot_huge' // 720p
  | 'thumb' // 90 x 90
  | 'micro' // 35 x 35
  | '720p'
  | '1080p';
