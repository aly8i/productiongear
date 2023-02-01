import 'bootstrap/dist/css/bootstrap.css'
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import {SessionProvider} from "next-auth/react";
import { useRouter } from "next/router";
import { StyledEngineProvider } from '@mui/material/styles';

import Layout from "../components/Layout";
function MyApp({ Component,instagram,twitter,facebook,linkedin,logo, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const url = router.asPath
  return (
    <>
    <SessionProvider session={session}>
      <StyledEngineProvider>
        <Provider store={store}>  
          <Layout instagram={instagram} twitter={twitter} facebook={facebook} linkedin={linkedin} logo= {logo} url={url}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </StyledEngineProvider>
    </SessionProvider>
    </>
  )
  
}

export default MyApp
//
export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
    return {
      props: {
        logo: res.data.logo,
        instagram:res.data.instagram,
        twitter:res.data.twitter,
        facebook:res.data.facebook,
        linkedin:res.data.linkedin,
    },
  } 
}