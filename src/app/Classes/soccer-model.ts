export interface SoccerModel {
  [key: string] : any
  id: Number;
  team1: string;
  team2: string;
  date: string | null;
  mlPrice: Number;
  _205: Number;
  priceDelta : number;
  column1 : number;
  priceDelta1: string;
  result: string;
  firstHalfResult: string;
  finalScore: string;
  shots: Number;
  sog: Number;
  dangerousAttacks: Number;
  attacks: Number;
  acr: string;
  possession: string;
  cardCount: Number;
  scoreFirstYN: string;
  leagueTournament: string;
  redCardYN: string;
  clw: string;
  FinalScoreColor : any;
  Team1GameColor: any;
  Team2GameColor: any;
  resultColorFH:any;
  resultColor:any;
}
