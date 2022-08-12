export const emailValidator = (email: string) => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //이메일 형식
  return regExp.test(email);
};

export const passwordValidator = (password: string) => {
  const regExp = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //대문자, 숫자, 특수문자 포함 8자리이상
  return regExp.test(password);
};
