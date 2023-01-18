export type HomeProps = {
    oceans : Photo[]
    forests: Photo[]
}

export type Photo = {
    src   : string
    thumb : string
    width : number
    height: number
    alt   : string
}