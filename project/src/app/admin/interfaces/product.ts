export interface Product {
    color: string,
    s: any,
    m: any,
    l: any,
    xl: any
}
export interface ColorsBoolean {
    black: boolean, white: boolean,
    green: boolean,
    blue: boolean,
    red: boolean
}
export interface data {
    _id: string,
    name: string,
    price: string,
    description: [],
    img: string
}
export interface colorData {
    black: {
        color: string,
        s: number | string,
        m: number | string,
        l: number | string,
        xl: number | string
    },
    blue: {
        color: string,
        s: number | string,
        m: number | string,
        l: number | string,
        xl: number | string
    },
    red: {
        color: string,
        s: number | string,
        m: number | string,
        l: number | string,
        xl: number | string
    },
    green: {
        color: string,
        s: number | string,
        m: number | string,
        l: number | string,
        xl: number | string
    },
    white: {
        color: string,
        s: number | string,
        m: number | string,
        l: number | string,
        xl: number | string
    }
}