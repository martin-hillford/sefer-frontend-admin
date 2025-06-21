interface VersionInfo {
    build: string
    database: string
    connection: string
    provider: string
    environment: string
    isDevelopmentEnv: boolean
    adminEmail: string
    release: string
}

export default VersionInfo;