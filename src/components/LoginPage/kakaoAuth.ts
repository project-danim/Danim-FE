// 프론트에서 만든 rest_api_key
const REST_API_KEY = "404660bce7ed6682b1ca8541f006c6c2";
// 서버에서 만든 rest_api_key
// const REST_API_KEY = "d47514ab2cd7a805e902a2c8d4d70ea6";
const REDIRECT_URI = "http://127.0.0.1:3000/api/user/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/
authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export default KAKAO_AUTH_URL;
