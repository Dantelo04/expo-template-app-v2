import { Platform } from "react-native";

export const DEFAULT_CATEGORIES = [
  "utensils.food",
  "house.home",
  "heart-pulse.health",
  "dumbbell.fitness",
  "car.transport",
];

export const DEFAULT_CATEGORIES_ES = [
  "utensils.comida",
  "house.hogar",
  "heart-pulse.salud",
  "dumbbell.fitness",
  "car.transporte",
];

export const CATEGORIES_ICONS = [
  "sack-dollar",
  "car",
  "music",
  "book",
  "paw",
  "gamepad",
  "house",
  "chart-line",
  "utensils",
  "dumbbell",
  "heart-pulse",
  "person",
  "globe",
  "gift",
  "cart-shopping",
  "plane",
  "flask",
  "briefcase",
  "palette",
  "shirt",
  "rocket",
  "desktop",
  "wallet",
  "building-columns",
];

export const MAX_INPUT_NUMBER_LENGTH = 21;

export const MAX_INPUT_TITLE_LENGTH = 25;

export const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "ios" ? 56 : 0;

export const KEYBOARD_VERTICAL_OFFSET_V2 = Platform.OS === "ios" ? 56 : -44;

export const APPLE_PRIVATE_EMAIL = "privaterelay.appleid.com";

export const PRIVACY_POLICY_URL = "https://www.privacypolicies.com/live/e6d2af9c-fdc9-407e-b109-d69e59e1e519";

export const TERMS_OF_SERVICE_URL = "https://nekonomy.app/terms";

export const MATH_ICONS = ["plus.+", "minus.-", "xmark.*", "divide./"];

export const DEFAULT_PIE_CHART_DATA = [
  {
    value: 100,
    color: "#B99470",
    text: "",
  },
  {
    value: 80,
    color: "#C2A27F",
    text: "",
  },
  {
    value: 60,
    color: "#D7C3A3",
    text: "",
  },
];

export const DEFAULT_RECORDLIST_HEIGHT = 142;

export const APP_INFO = {
  name: "Nekonomy",
  version: "0.0.1",
};

export const MAX_FREE_CATEGORIES = 7;

export const MAX_PRO_CATEGORIES = 14;

export const MAX_FREE_WALLETS = 1;

export const MAX_PRO_WALLETS = 6;

export const MAX_CURRENCIES = 2;

export const monthNamesEn = [
  "01.January",
  "02.February",
  "03.March",
  "04.April",
  "05.May",
  "06.June",
  "07.July",
  "08.August",
  "09.September",
  "10.October",
  "11.November",
  "12.December",
];

export const monthNamesEs = [
  "01.Enero",
  "02.Febrero",
  "03.Marzo",
  "04.Abril",
  "05.Mayo",
  "06.Junio",
  "07.Julio",
  "08.Agosto",
  "09.Septiembre",
  "10.Octubre",
  "11.Noviembre",
  "12.Diciembre",
];
