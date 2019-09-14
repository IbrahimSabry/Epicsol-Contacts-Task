import {Phone} from './phoneDTO';
export class Contact {
    constructor(){
        this.phones= new Array<Phone>();
    }
    id:number;
    name:string;
    email:string;
    phones:Phone[];
    selected:boolean;
}