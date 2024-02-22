function getLocalStorageTheme(): string {
  const themeStr = localStorage.getItem('theme');

  return themeStr ? themeStr : '';
}

export default getLocalStorageTheme;
