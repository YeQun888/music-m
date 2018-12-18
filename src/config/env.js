let baseUrl = '';
let routerMode = 'hash';

if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://localhost:3000';

} else if (process.env.NODE_ENV == 'production') {
  baseUrl = 'http://localhost:3000';

}

export {
  baseUrl,
  routerMode,
}
