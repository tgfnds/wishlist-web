import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { useEffect } from "react";
import { theme } from "../theme";
import ErrorBoundary from "../components/Errors/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  });

  return (
    <ThemeProvider theme={theme}>
      {/* <ErrorBoundary> */}
      <CssBaseline />
      <Component {...pageProps} />
      {/* </ErrorBoundary> */}
    </ThemeProvider>
  );
}

export default MyApp;
