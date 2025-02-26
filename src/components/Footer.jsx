
export default function Footer () {
  const currentYear = new Data().getFullYear();
  const footerContent = `${currentYear} Created by Sara Costa Cabral Mululo for © ComIT React Course Final Project`;
    
    return(
    	<footer class="footer-container">
        <h6>{footerContent}</h6>
    	</footer>)
}

