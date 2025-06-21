export type TwoFactorAuthSetup = {
    manualKey : string;
    qrCodeImage : {
        image : string;
        url: string;
    }
}