import { sidebar } from "../../sidebar";

declare const data: {
  menu: {
    [key: string]: { base: string; items: { text: string; link: string }[] };
  };
};
export { data };

export default {
  load() {
    return { menu: sidebar };
  },
};
