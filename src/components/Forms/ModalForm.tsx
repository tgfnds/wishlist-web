import { ReactElement } from "react";
import useModalsStore from "../../store/useModalsStore";
import WalletForm from "./WalletForm";
import WishForm from "./WishForm";

const ModalForm = (): ReactElement => {
  const showForm = useModalsStore((state) => state.showForm);

  switch (showForm) {
    case "ADD_WALLET":
      return <WalletForm />;
    case "ADD_WISH":
      return <WishForm />;
    default:
      return null;
  }
};

export default ModalForm;
