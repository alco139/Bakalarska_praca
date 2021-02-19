export class Player{
    public id: string;
    public name: string;
    public goals: number;
    public rating: number;

    constructor(id,name,goals,rating){
        this.id = id;
        this.name = name;
        this.goals = goals;
        this.rating = rating

    }
    public toJson(){
        return ({
            id: this.id,
            name: this.name,
            goals: this.goals,
            rating: this.rating
        })
    }
    public getId(){
        return this.id;
    }
    public getName(){
        return this.name;
    }
    public getGoals(){
        return this.goals;
    }
    public getRating(){
        return this.rating;
    }
}