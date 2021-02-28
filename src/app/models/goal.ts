export class Goal{
    public playerId: string;
    public matchId: string;
   

    constructor(playerId,matchId){
        this.playerId= playerId;
        this.matchId = matchId;

    }
    public toJson(){
        return ({
            playerId: this.playerId,
            matchId: this.matchId
        })
    }
}