export default class Running_Number{
    private count:number
    private number:number
    private extend1:number
    private extend2:number

    constructor(){
        this.count = 0;
        this.number = 0;
        this.extend1 = 0;
        this.extend2 = 0;
    }

    public increment():void{
        this.count += 1;
        this.number += 1;
        if(this.number >= 10000){
            this.extend1 += 1
            this.number = 0
            if(this.extend1 >= 23){
                this.extend2 += 1
                this.extend1 = 0
            }
        }
    }
    public print_running_number():string{
        let padding = ""
        let number_lenght = String(this.number).length
        if(number_lenght < 4){
            for(let i =0;i<4-number_lenght;i++){
                padding = padding+"0"
            }
        }
        return `${String.fromCharCode(this.extend2+65)}${String.fromCharCode(this.extend1+65)}${padding}${this.number}`;
    }
    public set_number(num:number):void{
        this.count = num
        this.number = num%10000
        this.extend1 = Math.floor(num/10000)%23
        this.extend2 = Math.floor(Math.floor(num/10000)/23)
    }
    public get_count():number{
        return this.count;
    }
}