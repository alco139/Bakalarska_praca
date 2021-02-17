export class Player{
    private id: string;
    private name: string;
    private goals: number;
    private rating: number;

    constructor(id,name,goals,rating){
        this.id = id;
        this.name = name;
        this.goals = goals;
        this.rating = rating

    }
    toJson(){
        return ({
            id: this.id,
            name: this.name,
            goals: this.goals,
            rating: this.rating
        })
    }
}