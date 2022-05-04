import App, { AppContext, AppProps } from "next/app";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
import axios from "axios";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

// TODO: 토큰으로 로그인 유지 처리
// 로그인시 저장한 쿠키 정보 모든 페이지에 불러오기
// app.getInitialProps = async (context: AppContext) => {
//   const appInitialProps = await App.getInitialProps(context);
//   // console.log(context.ctx.req?.headers.cookie);
//   const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

//   const { store } = context.ctx;
//   const { isLogged } = store.getState().user;

//   try {
//     if (!isLogged && cookieObject.access_token) {
//       axios.defaults.headers.cookie = cookieObject.access_token; // 헤더의 쿠키에 토큰 추가
//       const { data } = await meAPI();

//       // 스토어에 저장
//       store.dispatch(userActions.setLoggedUser(data));
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   return { ...appInitialProps };
// };

export default wrapper.withRedux(app);
