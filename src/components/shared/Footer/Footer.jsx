import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerContent = `${currentYear} Created by Sara Costa Cabral Mululo for © ComIT React Course`;
    
  return(
    <footer className={styles.footerContainer}>
      <h5 className={styles.footerH5}>{footerContent}</h5>
    </footer>)
}

export default Footer;