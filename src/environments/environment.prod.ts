export const environment = {
  production: true,
  uri: window.location.hostname == 'localhost' ? 'http://'+window.location.host : window.location.host
};
