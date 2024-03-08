import { create } from "zustand";

type Alert = {
  content: string;
  duration: number;
  type: "error" | "success" | "info" | "warning";
};

interface AlertStore {
  _component: {
    alertQueue: Alert[];
    setAlert: (alertConfig: Alert) => void;
    cancelAlert: (index: number) => void;
    endCurrentAlert: () => void;
  };
  isLoading: boolean;
  alertSuccess: (content: string) => void;
  alertError: (content: string) => void;
  alertWarning: (content: string) => void;
  alertInfo: (content: string) => void;
}

const useAlertStore = create<AlertStore>()((set, get) => ({
  _component: {
    alertQueue: [],
    setAlert: (config) => {
      set((prev) => {
        const newAlertQueue = [...prev._component.alertQueue];
        newAlertQueue.push(config);
        return {
          ...prev,
          _component: { ...prev._component, alertQueue: newAlertQueue },
        };
      });
    },
    cancelAlert: (idx) => {
      set((prev) => {
        const newAlertQueue = [...prev._component.alertQueue];
        newAlertQueue.splice(idx, 1);
        return {
          ...prev,
          _component: { ...prev._component, alertQueue: newAlertQueue },
        };
      });
    },
    endCurrentAlert: () => {
      set((prev) => {
        const newAlertQueue = [...prev._component.alertQueue];
        newAlertQueue.pop();
        return {
          ...prev,
          _component: { ...prev._component, alertQueue: newAlertQueue },
        };
      });
    },
  },
  isLoading: !!get()?._component?.alertQueue?.length,
  alertSuccess: (content) => {
    get()._component.setAlert({
      content: content,
      type: "success",
      duration: 1200,
    });
  },
  alertError: (content) => {
    get()._component.setAlert({
      content: content,
      type: "error",
      duration: 1200,
    });
  },
  alertInfo: (content) => {
    get()._component.setAlert({
      content: content,
      type: "info",
      duration: 1200,
    });
  },
  alertWarning: (content) => {
    get()._component.setAlert({
      content: content,
      type: "warning",
      duration: 1200,
    });
  },
}));

export default useAlertStore;
