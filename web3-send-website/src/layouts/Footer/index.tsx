import styles from "./index.less";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <span>Powered by Way Network</span>
      </div>
      <div className={styles.footerBot}>
        <a target="_blank" href="https://discord.gg/7vDHh5EeEK">
          Discord
        </a>
        <a
          target="_blank"
          href="https://send-finance.gitbook.io/untitled/"
          style={{ marginLeft: "24px" }}
        >
          Gitbook
        </a>
        <a
          target="_blank"
          href="https://github.com/Send-Labs"
          style={{ marginLeft: "24px" }}
        >
          Github
        </a>
        <a
          target="_blank"
          href="https://twitter.com/Send_Labs"
          style={{ marginLeft: "24px" }}
        >
          Twitter
        </a>
        <a
          target="_blank"
          href="https://t.me/Send_Finance"
          style={{ marginLeft: "24px" }}
        >
          Telegram
        </a>
      </div>
    </footer>
  );
}
