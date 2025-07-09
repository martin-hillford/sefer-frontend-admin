interface Site {
    isDefault : boolean
    hostname : string
    siteUrl : string
    type : 'Static' | 'Redirect' | 'Dynamic'
    destination : string
    regionId : string
    name : string
    alt : string
    imageSuffix : string
    brand : string
    supportEmail : string
    socialMedia : {
        twitter: string
        youtube: string
        facebook: string
        instagram: string
    }
    staticContentUrl : string
    mode : 'Web' | 'App'
    homepage : string
    language : string
    enabled : string
    environment : string
}

export default Site;
