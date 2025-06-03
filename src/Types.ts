
export type UserType = {
    name:string,
    surname:string,
    phone:  string,
    email:string,
    city:string,
    website:string,
}

export type CompanyType = {
    name: string,
    street: string,
    city:string,
    companyWebsite: string,
}

export type SocialMediaObjectType = {
    linkedin: string,
    facebook: string,
    instagram: string,
    twitter: string,
    other: SocialMediaType[]
}

export type SocialMediaType ={
    name : string,
    link : string,
}

export type CardType = {
    user_data : UserType,
    company_info: CompanyType,
    social_media: SocialMediaObjectType
}

export type FormObjectType = {
    [key:string]: {
        value: string,
        error: string,
    },
}