import i18n from "i18next";
import enUsTrans from "./modules/en";
import zhCnTrans from "./modules/zh";
import { getBrowserLang } from "@/utils";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enUsTrans
    },
    zh: {
      translation: zhCnTrans
    }
  },
  lng: getBrowserLang(),
  debug: false,
  interpolation: {
    escapeValue: false
  }
});
export default i18n;

// TODO: 使用
//    todo：import { useTranslation, Trans } from 'react-i18next'
//    todo：const { t, i18n } = useTranslation()
//    todo：<span>{t("tabs.refresh")}</span>

// ! 切换语言功能
// renderI18n = item => {
//   const { i18n } = this.props;
//   return (
//     <Button onclick={() => i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")}>
//       {i18n.language === "en" ? "切换成中文": "切换成英文"}
//     </Button>
//   )
// }
