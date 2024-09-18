export class Product {
    public readonly barcode!: string 
    public name!: string
    public description: string | undefined
    public price!: number
    public batch: string | undefined
    public manufacturing_date: string | undefined
    public expiration_date: string | undefined
    public image: string | undefined 
    public ammount!: number
    public type!: string
    public supplier_id!: string

    constructor(props: Omit<Product, "bar_code">, barcode?: string) {
        Object.assign(this, props)

        if(barcode){
            this.barcode = barcode
        }
    }
}