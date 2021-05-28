import { Box, Typography, useTheme } from "@material-ui/core";
import { ReactElement, useEffect } from "react";
import useAlertsState from "../../store/useAlertsState";
import useWalletStore from "../../store/useWalletStore";
import NewWalletItem from "./NewWalletItem";

const NewWalletList = (): ReactElement => {
  const theme = useTheme();

  const { wallets, fetchWallets } = useWalletStore();

  const pushAlert = useAlertsState((state) => state.pushAlert);

  useEffect(() => {
    try {
      fetchWallets();
    } catch (err) {
      pushAlert("Couldn't load wallets.", "ERROR");
    }
  }, []);

  return (
    <Box padding={theme.spacing(0.2)}>
      <Box>
        <Typography variant="h5" color="primary">
          Wallets
        </Typography>
      </Box>
      <Box
        mt={3}
        display="flex"
        flexDirection="column"
        gridGap={theme.spacing(2)}
      >
        {wallets &&
          wallets.map((wallet) => (
            <NewWalletItem key={wallet.id} wallet={wallet} />
          ))}
      </Box>
    </Box>
  );
};

export default NewWalletList;
