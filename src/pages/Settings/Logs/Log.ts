interface Log {
    id: string;
    timestamp : string
    logLevel : string
    categoryName : string
    message : string
    exception : string
    stackTrace : string
}

export default Log;