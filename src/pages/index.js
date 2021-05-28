import Head from "next/head";
import WishList from "../components/Wishes/WishList";
import WalletList from "../components/Wallets/WalletList";
import NewWalletList from "../components/Wallets/NewWalletList";
import ModalForm from "../components/Forms/ModalForm";
import Button from "../components/shared/Buttons/Button";
import useModalsStore from "../store/useModalsStore";
import { Box, makeStyles } from "@material-ui/core";
import ErrorBoundary from "../components/Errors/ErrorBoundary";
import Alerts from "../components/Alerts/Alerts";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  main: {
    marginTop: "3rem",
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginBottom: "2rem",
  },
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  footer: {
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

export default function Home() {
  const toggleForm = useModalsStore((state) => state.toggleForm);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Head>
        <title>Wishlist</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <ErrorBoundary>
            <Box display="flex" justifyContent="center">Search bar will be here.</Box>
            <Box display="flex">
              <Box>
                <NewWalletList />
              </Box>
              <Box>
                <WishList />
              </Box>
            </Box>
            <ModalForm />
            <Alerts />
          </ErrorBoundary>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>
          Made with 😻 by{" "}
          <a className={styles.link} href="https://tgfnds.dev">
            tgfnds
          </a>
        </span>
      </footer>
    </div>
  );
}
