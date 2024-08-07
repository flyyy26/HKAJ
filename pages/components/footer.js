import styles from '@/styles/Footer.module.css';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTiktok, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; 

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const Footer = () => { 
  const { t } = useTranslation('common');

  return (
    <>
    <footer className={styles.footer}>
      <div className={styles.identity}>
        <img src='/images/logo.png' alt='House Kari Logo' /> 
        <div className={styles.identity_layout}>
          <h1>PT HOUSE AND VOX INDONESIA</h1>
          <p>{t('address')}</p>
          <Link href='#'>{t('privacyPolicy')}</Link>
        </div>
      </div>
      <div className={styles.social_footer}>
        <Link href='#'><FaFacebookF/></Link>
        <Link href='#'><FaInstagram/></Link>
        <Link href='#'><FaTiktok/></Link>
        <Link href='#'><FaLinkedin/></Link>
        <Link href='#'><FaYoutube/></Link>
      </div>
      <div className={styles.img_footer}>
        <img src='/images/footer_img_product.png' className='img_footer' alt='House Kari' />
      </div>
    </footer>
    <div className={styles.copyright}>
      <span>{t('copyright')}</span>
    </div>
    </>
  );
};

export default Footer;
