export interface SoccerModel {
  [key: string] : any
  id: Number;
  team1: string;
  team2: string;
  date: Date | null;
  mlPrice: Number;
  _205: Number;
  priceDelta : Number;
  column1 : Number;
  priceDelta1: Number;
  result: string;
  firstHalfResult: string;
  finalScore: string;
  shots: Number;
  sog: Number;
  dangerousAttacks: Number;
  attacks: Number;
  acr: Number;
  possession: Number;
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
