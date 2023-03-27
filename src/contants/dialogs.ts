import Dialog from "../game/Dialog";

const dialogs: Dialog[] = [];

export const resetDialogs = (): void => {
  dialogs.splice(0, dialogs.length);
};

export default dialogs;
