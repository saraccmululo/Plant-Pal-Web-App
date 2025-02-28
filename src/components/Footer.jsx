
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerContent = `${currentYear} Created by Sara Costa Cabral Mululo for © ComIT React Course`;
    
  return(
    <footer className="footer-container">
      <h5>{footerContent}</h5>
    </footer>)
}

