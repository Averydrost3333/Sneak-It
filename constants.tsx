
import { Game } from './types';

export const GAMES: Game[] = [
  {
    id: 'tiny-fishing',
    title: 'Tiny Fishing',
    category: 'Casual',
    description: 'A relaxing and addictive fishing game. Cast your line, catch exotic fish, and upgrade your gear to reach the deepest parts of the ocean!',
    thumbnail: 'https://picsum.photos/seed/tinyfishing/400/300',
    embedUrl: 'https://sz-games.github.io/Games7/tiny-fishing/',
    isPopular: true
  },
  {
    id: 'tag-game',
    title: 'Tag Game',
    category: 'Action',
    description: 'The ultimate game of chase! Dash through vibrant arenas, use obstacles to your advantage, and make sure you are not the one who is IT.',
    thumbnail: 'https://picsum.photos/seed/taggame/400/300',
    embedUrl: 'https://gnhustgames.org/tag-source/',
    isPopular: false
  },
  {
    id: 'hole-io',
    title: 'Hole.io',
    category: 'Arcade',
    description: 'Enter the arena and face the other holes in a fierce battle. Eat everything in sight with your black hole and expand it to eat more!',
    thumbnail: 'https://picsum.photos/seed/holeio/400/300',
    embedUrl: 'https://eggycaronline.io/gamefinaltwo/hole-io/',
    isPopular: true
  },
  {
    id: 'we-become-what-we-behold',
    title: 'We Become What We Behold',
    category: 'Casual',
    description: 'A non-partisan game about news cycles, vicious cycles, and how we see the world through a lens.',
    thumbnail: 'https://picsum.photos/seed/behold/400/300',
    embedUrl: 'https://html5.iclouds.io/we-become-behold/index.html',
    isPopular: false
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: 'Sports',
    description: 'Face the hurdles and prepare for a unique bike racing experience in this awesome motocross stunt game.',
    thumbnail: 'https://picsum.photos/seed/motox3m/400/300',
    embedUrl: 'https://games.cdn.famobi.com/html5games/m/moto-x3m/v100/?fg_domain=play.famobi.com&fg_aid=A-FAMOBI-COM&fg_uid=442157bb-0a48-4e9b-9fa6-e1503f16e8e3&fg_pid=96ab9c2f-6013-4b31-96dc-ccb5c7a89329&fg_beat=413&original_ref=',
    isPopular: true
  },
  {
    id: 'cluster-rush',
    title: 'Cluster Rush',
    category: 'Arcade',
    description: 'Jump between trucks to avoid falling. Don’t slow down, keep your momentum going in this fast-paced skill game.',
    thumbnail: 'https://picsum.photos/seed/clusterrush/400/300',
    embedUrl: 'https://sz-games.github.io/cr/',
    isPopular: false
  }
];

export const CATEGORIES: string[] = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Casual'];
