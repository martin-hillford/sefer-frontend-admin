import { ResponseError } from 'util/errors';
import { useGetAsync } from 'sefer-fetch';
import { VerificationResult } from 'types/data/enrollments/VerificationResult';

export const useFetchEnrollmentVerify = () => {
  const get = useGetAsync();
  return async (verificationCode : string) => {
    const { code, body } = await get(`/admin/enrollments/verify/${verificationCode}`);

    switch (code) {
      case 400:
      case 404:
      case 200:
        return { code, details: body! } as VerificationResult;
      default:
        throw new ResponseError(code, 'Could not load the verification details from the server, please contact the developer.');
    }
  };
}

