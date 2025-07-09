const LogonResult = {
  NotLoggedOn: 0,
  Success: 1,
  TwoStepAuthRequired: 2,
  Blocked: 3,
  InCorrect: 4,
  InActive: 5,
  NoAdminRole: 6,
  TwoStepAuthFailed: 7
};

Object.freeze(LogonResult);

export default LogonResult;