import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createTheme,ThemeProvider } from "@mui/material";
const Layout = ({ children,instagram,twitter,facebook,linkedin,logo, url}) => {

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="#1 Production Crew" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navbar logo={logo} nav={url}/>
          {children}
        </main>
        <Footer instagram={instagram} twitter={twitter} facebook={facebook} linkedin={linkedin}/>
      </div>
    </ThemeProvider>
    </>
  );
};

export default Layout;
