export class Player{
    public id: string;
    public name: string;
    public goals: number;
    public rating: number;
    public matches: number;

    constructor(id,name,goals,rating,matches){
        this.id = id;
        this.name = name;
        this.goals = goals;
        this.rating = rating;
        this.matches = matches;
    }
    public toJson(){
        return ({
            id: this.id,
            name: this.name,
            goals: this.goals,
            rating: this.rating,
            matches: this.matches
        })
    }
}