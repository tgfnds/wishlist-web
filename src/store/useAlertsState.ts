import create from "zustand";
import { v1 as uuid } from "uuid";
import { Alert, AlertType } from "../types/types";

type AlertsState = {
  alerts: Alert[];
  pushAlert: (message: string, type: AlertType) => void;
  deleteAlert: (id: string) => void;
};

const useAlertsState = create<AlertsState>((set, get) => ({
  alerts: [],
  pushAlert: (message, type) => {
    const { alerts } = get();
    const newAlert = { id: uuid(), message, type };
    set({ alerts: [...alerts, newAlert] });
  },
  deleteAlert: (id: string) => {
    const { alerts } = get();
    const filtered = alerts.filter((alert) => alert.id !== id);
    set({ alerts: filtered });
  },
}));

export default useAlertsState;
