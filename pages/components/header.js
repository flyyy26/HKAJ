import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css';
import Head from 'next/head';
import { AiOutlineSearch } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import { SlVolume2, SlVolumeOff } from "react-icons/sl";
import { PiShareNetwork } from "react-icons/pi";
import { BsCart2 } from "react-icons/bs";
import { useRef } from 'react';
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { FaFacebookF, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdSearch } from "react-icons/md";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const Header = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [openDropdown, setOpenDropdown] = useState(null);
  const searchMobileRef = useRef(null);
  const [language, setLanguage] = useState(`${t('selectLanguage')}`);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const createAlternateLinks = () => {
    const locales = ['en', 'id', 'zh'];
    return locales.map((locale) => (
      <link
        key={locale}
        rel="alternate"
        hrefLang={locale}
        href={`/${locale}${pathname}`}
      />
    ));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.nav}`) && !event.target.closest(`.${styles.language}`)) {
        closeDropdown();
      }
      if (searchMobileRef.current && !searchMobileRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    };

    const handleScroll = () => {
      closeDropdown();
      setSearchActive(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const clickMenu = () => {
    closeDropdown();
    handleHamburger();
  };

  const getLinkClass = (href) => {
    return router.pathname === href ? `${styles.link} ${styles.active}` : styles.link;
  };

  const isActiveMenu = (subMenuLinks) => {
    return subMenuLinks.some(link => router.pathname.startsWith(link));
  };

  const handleLanguageChange = (lang) => {
    let locale = '';
    switch (lang) {
      case 'English':
        locale = 'en';
        break;
      case 'Chinese':
        locale = 'zh';
        break;
      case 'Indonesian':
        locale = 'id';
        break;
      default:
        locale = 'id';
    }
    setLanguage(lang);
    closeDropdown();
    // Menavigasi ke URL yang sesuai dengan bahasa yang dipilih sambil mempertahankan pathname
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio('/media/soundtrack.wav') : undefined);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Set the audio to loop
    }

    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keypress', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keypress', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keypress', handleUserInteraction);
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickPlay = () => {
    setIsPlaying(true);
    playAudio();
  };

  const handleClickPause = () => {
    setIsPlaying(false);
    pauseAudio();
  };

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdownEcommerce = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdownEcommerce = () => {
    setIsDropdownOpen(false);
  };

  const [isDropdownOpenShare, setIsDropdownOpenShare] = useState(false);

  const toggleDropdownShare = () => {
    setIsDropdownOpenShare(!isDropdownOpenShare);
  };

  const closeDropdownShare= () => {
    setIsDropdownOpenShare(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      closeDropdownEcommerce();
      closeDropdownShare();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const ecommerces = [
    {
      id: 1,
      nameEcommerce: 'shopee',
      imageEcommerce: '/images/shopee_logo.png',
    },
    {
        id: 2,
        nameEcommerce: 'tokopedia',
        imageEcommerce: '/images/tokopedia_logo.png',
    },
    {
        id: 3,
        nameEcommerce: 'blibli',
        imageEcommerce: '/images/blibli_logo.png',
    },
    {
        id: 4,
        nameEcommerce: 'sayurbox',
        imageEcommerce: '/images/sayurbox_logo.png',
    },
  ]

  const share = [
    {
      id: 1,
      nameMedia: 'whatsapp',
      imageMedia: <FaWhatsapp/>,
    },
    {
      id: 2,
      nameMedia: 'facebook',
      imageMedia: <FaFacebookF/>,
    },
    {
      id: 3,
      nameMedia: 'telegram',
      imageMedia: <FaTelegramPlane/>,
    },
    {
      id: 4,
      nameMedia: 'copy',
      imageMedia: <FaLink/>,
    },
  ]

  const [menuActive, setMenuActive] = useState(false);

  const handleHamburger = () => {
    setMenuActive(!menuActive);
  }

  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = () => {
    setSearchActive(!searchActive);
  }

  const handleClose = () => {
    setSearchActive(false);
  };

  return (
    <>
      <Head>
        <title>House Kari</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {createAlternateLinks()}
        <link rel="alternate" hrefLang="x-default" href={asPath} />
      </Head>
      <div className={styles.heading_layout}>
        <div className={styles.top_menu}>
          <div className={styles.language}>
            <button onClick={() => toggleDropdown('language')}>
              {language} <IoChevronDown />
            </button>
            <ul className={openDropdown === 'language' ? styles.show : ''}>
              <li>
                <button onClick={() => handleLanguageChange('English')}>English</button>
              </li>
              <li>
                <button onClick={() => handleLanguageChange('Chinese')}>Chinese</button>
              </li>
              <li>
                <button onClick={() => handleLanguageChange('Indonesian')}>Indonesian</button>
              </li>
            </ul>
          </div>
          <div className={styles.search_box}>
            <input type='text' placeholder={t('searchText')} />
            <AiOutlineSearch />
          </div>
        </div>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Link href='/'>
              <img src='/images/logo.png' alt="House Kari Logo" />
            </Link>
          </div>
          <div className={styles.btnMobile}>
            <button className={styles.searchBtn} onClick={handleSearch}><MdSearch/></button>
            <button className={styles.hamburger} onClick={handleHamburger}><RxHamburgerMenu/></button>
          </div>
          <div className={`${styles.nav_wrapper} ${menuActive ? styles.active : ''}`}>
            <nav className={styles.nav}>
              <ul>
                <li className={styles.heading}>
                  <Link href="/" className={getLinkClass('/')} onClick={clickMenu}>
                    {t('menu.home')}
                  </Link>
                </li>
                <li>
                  <span
                    className={`${openDropdown === 'ourStory' || isActiveMenu(['/company-profile', '/company-history']) ? styles.activeSpan : ''}`}
                    onClick={() => toggleDropdown('ourStory')}
                  >
                    {t('menu.ourStory')} <IoChevronDown />
                  </span>
                  <ul className={openDropdown === 'ourStory' ? styles.show : ''}>
                    <li>
                      <Link href="/company-profile" className={getLinkClass('/company-profile')} onClick={clickMenu}>
                        {t('menu.companyProfile')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/company-history" className={getLinkClass('/company-history')} onClick={clickMenu}>
                        {t('menu.companyHistory')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/product" className={getLinkClass('/product')} onClick={clickMenu}>
                    {t('menu.product')}
                  </Link>
                </li>
                <li>
                  <Link href="/recipe" className={getLinkClass('/recipe')} onClick={clickMenu}>
                    {t('menu.recipe')}
                  </Link>
                </li>
                <li>
                  <span
                    className={`${openDropdown === 'article' || isActiveMenu(['/article', '/article/event', '/article/tips-trick', '/article/media-release']) ? styles.activeSpan : ''}`}
                    onClick={() => toggleDropdown('article')}
                  >
                    {t('menu.article')} <IoChevronDown />
                  </span>
                  <ul className={openDropdown === 'article' ? styles.show : ''}>
                    <li>
                      <Link href="/article" className={getLinkClass('/article')} onClick={clickMenu}>
                        {t('menu.article')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/article/event" className={getLinkClass('/article/event')} onClick={clickMenu}>
                        {t('menu.event')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/article/tips-trick" className={getLinkClass('/article/tips-trick')} onClick={clickMenu}>
                        {t('menu.tipsTricks')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/article/media-release" className={getLinkClass('/article/media-release')} onClick={clickMenu}>
                        {t('menu.mediaRelease')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/contact" className={getLinkClass('/contact')} onClick={clickMenu}>
                    {t('menu.contact')}
                  </Link>
                </li>
              </ul>
              <button className={styles.closeMenu} onClick={handleHamburger}><IoCloseOutline/></button>
              <div className={styles.divider_right}></div>
              <div className={styles.language}>
                <button onClick={() => toggleDropdown('language')}>
                  {language} <IoChevronDown />
                </button>
                <ul className={openDropdown === 'language' ? styles.show : ''}>
                  <li>
                    <button onClick={() => handleLanguageChange('English')}>English</button>
                  </li>
                  <li>
                    <button onClick={() => handleLanguageChange('Chinese')}>Chinese</button>
                  </li>
                  <li>
                    <button onClick={() => handleLanguageChange('Indonesian')}>Indonesian</button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <div ref={searchMobileRef} className={`${styles.searchMobile} ${searchActive ? styles.active : ''}`}>
          <input type='text' placeholder='Search'/>
        </div>
      </div>
      <div className={styles.fixed_menu}>
        <div className={styles.fixed_menu_box}>
            <button
            className={`${styles.bg_transparent} ${styles.bg_transparent_margin} ${isPlaying ? styles.nonActive : styles.active}`}
            onClick={handleClickPlay}
            style={{ display: isPlaying ? 'none' : 'block' }}
          >
            <SlVolumeOff />
          </button>
          <button
            className={`${styles.bg_transparent} ${styles.bg_transparent_margin} ${isPlaying ? styles.active : styles.nonActive}`}
            onClick={handleClickPause}
            style={{ display: isPlaying ? 'block' : 'none' }}
          >
            <SlVolume2 />
          </button>
        </div>
        <div className={styles.fixed_menu_box}>
          <div className={styles.ecommerceDropdown}>
            <button onClick={toggleDropdownShare} className={`${styles.bg_transparent} ${isDropdownOpenShare ? styles.active : ''}`}><PiShareNetwork /></button>
            <div className={`${styles.dropdown} ${isDropdownOpenShare ? styles.active : ''}`}>
              {share.map((share) => (
                  <Link href="#" key={share.id}><div className={`${styles.share_box} ${styles[share.nameMedia]}`}>{share.imageMedia}</div></Link>
              ))}
            </div>
          </div>
          <button className={styles.bg_whatsapp}><FaWhatsapp /></button>
          <div className={styles.ecommerceDropdown}>
            <button onClick={toggleDropdownEcommerce} className={`${styles.bg_ecommerce} ${isDropdownOpen ? styles.active : ''}`}>
              <BsCart2 /> <span>{t('ecommerceText')}</span>
              {isDropdownOpen && <div className={styles.closeEcommerce} onClick={closeDropdownEcommerce}><IoCloseOutline/></div>}
            </button>
            <div className={`${styles.dropdown} ${isDropdownOpen ? styles.active : ''}`}>
              {ecommerces.map((ecommerce) => (
                  <Link href="#" key={ecommerce.id}><button className={styles[ecommerce.nameEcommerce]}><img src={ecommerce.imageEcommerce} alt="House Kari" /></button></Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;