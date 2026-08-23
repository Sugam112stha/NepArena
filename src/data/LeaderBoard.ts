export interface LeaderboardTeam {
  rank: number;
  previousRank: number;
  teamName: string;
  game: string;
  points: number;
  wins: number;
  played: number;
  winRate: string;
  logo: string;
}

export const GAME_FILTERS: string[] = ['Free Fire', 'PUBG Mobile', 'eFootball', 'Mobile Legend'];

import HoraLogo from "../assets/teamLogo/HoraEsports.jpg"
import DrsLogo from "../assets/teamLogo/DrsEsports.png"
import AstLogo from "../assets/teamLogo/AstEsports.png"
import KtmLogo from "../assets/teamLogo/KtmEsports.png"
import PnlLogo from "../assets/teamLogo/PnlEsport.png"

export const LEADERBOARD_DATA: LeaderboardTeam[] = [


  //PubG

  {
    rank: 1,
    previousRank: 1,
    teamName: 'Hora Esports',
    game: 'PUBG Mobile',
    points: 2450,
    wins: 4,
    played: 18,
    winRate: '77.7%',
    logo: HoraLogo
  },
  {
    rank: 2,
    previousRank: 3,
    teamName: 'Drs Gaming',
    game: 'PUBG Mobile',
    points: 2210,
    wins: 3,
    played: 18,
    winRate: '68.7%',
    logo: DrsLogo
  },
  {
    rank: 3,
    previousRank: 2,
    teamName: 'AST Esports',
    game: 'PUBG Mobile',
    points: 2210,
    wins: 3,
    played: 18,
    winRate: '68.7%',
    logo: AstLogo
  },




//Free Fire

  {
    rank: 1,
    previousRank: 3,
    teamName: 'Drs Gaming',
    game: 'Free Fire',
    points: 2050,
    wins:4,
    played: 15,
    winRate: '81.3%',
    logo: DrsLogo
  },
  {
    rank: 2,
    previousRank: 1,
    teamName: 'Hora Esports',
    game: 'Free Fire',
    points: 1980,
    wins: 4,
    played: 15,
    winRate: '80.0%',
    logo: HoraLogo
  },
  {
    rank: 3,
    previousRank: 2,
    teamName: 'Ktm Esports',
    game: 'Free Fire',
    points: 1980,
    wins: 2,
    played: 15,
    winRate: '78.3%',
    logo: KtmLogo
  },
  {
    rank: 4,
    previousRank: 3,
    teamName: 'Pnl Esports',
    game: 'Free Fire',
    points: 1950,
    wins: 2,
    played: 15,
    winRate: '74.3%',
    logo: PnlLogo
  },

];