class User{
    obj:Record<number,any>;
    uid:number;
    length:number;

    constructor(){
        this.obj={};
        this.uid=0;
        this.length=0;
    }

    Create(body:unknown){

        this.obj[this.uid]=body;
        this.uid++;
        this.length++;
        return `Successfully user arrived or created${this.obj}`;
        
    }
}

const UserObj = new User();

export default UserObj;