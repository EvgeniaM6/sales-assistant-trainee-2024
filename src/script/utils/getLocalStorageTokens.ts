import { IAccessDTO } from '../../public-common/interfaces/dto/auth/iaccess.interface';

function getLocalStorageTokens(): IAccessDTO {
  const accessDTO: IAccessDTO = {
    accessToken: '',
    refreshToken: '',
  };

  const tokensStr = localStorage.getItem('tokens');

  if (tokensStr) {
    const tokens = JSON.parse(tokensStr);

    if ('accessToken' in tokens) {
      accessDTO.accessToken = tokens.accessToken;
    }

    if ('refreshToken' in tokens) {
      accessDTO.refreshToken = tokens.refreshToken;
    }
  }

  return accessDTO;
}

export default getLocalStorageTokens;
