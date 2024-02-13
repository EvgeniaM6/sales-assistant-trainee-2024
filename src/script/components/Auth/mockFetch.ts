export const mockFetch = (login: string, password: string) => {
  console.log('login=', login);
  console.log('password=', password);

  return new Promise((res, rej) => {
    const isSuccess = Math.random() > 0;
    setTimeout(() => {
      if (isSuccess) {
        res('');
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        rej('Login failed');
      }
    }, 2000);
  });
};
