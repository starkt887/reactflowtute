
export interface IT1LeadSource {
    id: string,
    emailList: string[]
}
export interface IT2ColdEmail {
    id: string,
    emailTemplate: string
}
export interface IT3Delay {
    id: string,
    waitFor: number,
    waitType: string
}