export class Person {
    public readonly id!: string
    public name!: string
    public address: object | undefined
    public type!: string
    public password!: string
    public contact: string[] | undefined

    constructor(props: Omit<Person, "id">, id?: string) {
        Object.assign(this, props)
        if(id){
            this.id = id
        }
    }
}