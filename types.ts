
export interface Game {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  isPopular?: boolean;
}

export type Category = 'All' | 'Action' | 'Puzzle' | 'Sports' | 'Arcade' | 'Casual';

export type AppView = 'games' | 'explorer';

export type AppTheme = 'default' | 'monochrome' | 'midnight';

export interface AppSettings {
  tabTitle: string;
  tabIcon: string;
  theme: AppTheme;
  cloakType: 'scientific' | 'josiah';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
