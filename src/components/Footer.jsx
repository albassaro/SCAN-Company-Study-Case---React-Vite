import React from "react";
import f from "../styles/components/footer.module.scss";
import global from "../styles/globalStyles.module.scss";

function Footer() {
  console.log("отрисовка футера");
  return (
    <footer className={f.footer}>
      <div className={`${global.wrapper} ${f.footer_content}`}>
        <div className={f.footer_logo}>
          <img src="../assets/logo/logo-footer.png" alt="" />
        </div>
        <div className={f.footer_contacts}>
          <p>г. Москва, Цветной б-р, 40</p>
          <p>+7 495 771 21 11</p>
          <p>info@skan.ru</p>
          <p>Copyright. 2022</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
