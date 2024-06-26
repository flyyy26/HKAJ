import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css';
import Head from 'next/head';
import { AiOutlineSearch } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";
import { SlVolume2, SlVolumeOff } from "react-icons/sl";
import { PiShareNetwork } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { useRef } from 'react';
import { IoCloseOutline } from "react-icons/io5";


const Header = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [language, setLanguage] = useState('English');

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.nav}`) && !event.target.closest(`.${styles.language}`)) {
        closeDropdown();
      }
    };

    const handleScroll = () => {
      closeDropdown();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkClass = (href) => {
    return router.pathname === href ? `${styles.link} ${styles.active}` : styles.link;
  };

  const isActiveMenu = (subMenuLinks) => {
    return subMenuLinks.some(link => router.pathname.startsWith(link));
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    closeDropdown();
    // Perform any other action upon language change
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef(null);

  useEffect(() => {
    // Mengatur ulang status pemutaran saat komponen dimuat ulang
    audioPlayer.current.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audioPlayer.current.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdownEcommerce = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdownEcommerce = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      closeDropdownEcommerce();
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

  return (
    <>
      <Head>
        <title>House Kari</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
            <input type='text' placeholder='Search' />
            <AiOutlineSearch />
          </div>
        </div>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src='/images/logo.png' alt="House Kari Logo" />
          </div>
          <nav className={styles.nav}>
            <ul>
              <li className={styles.heading}>
                <Link href="/" className={getLinkClass('/')} onClick={closeDropdown}>
                  Home
                </Link>
              </li>
              <li>
                <span
                  className={`${openDropdown === 'ourStory' || isActiveMenu(['/company-profile', '/company-history']) ? styles.activeSpan : ''}`}
                  onClick={() => toggleDropdown('ourStory')}
                >
                  Our Story <IoChevronDown />
                </span>
                <ul className={openDropdown === 'ourStory' ? styles.show : ''}>
                  <li>
                    <Link href="/company-profile" className={getLinkClass('/company-profile')} onClick={closeDropdown}>
                      Company Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/company-history" className={getLinkClass('/company-history')} onClick={closeDropdown}>
                      Company History
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/product" className={getLinkClass('/product')} onClick={closeDropdown}>
                  Product
                </Link>
              </li>
              <li>
                <Link href="/recipe" className={getLinkClass('/recipe')} onClick={closeDropdown}>
                  Recipe
                </Link>
              </li>
              <li>
                <span
                  className={`${openDropdown === 'article' || isActiveMenu(['/article', '/article/event', '/article/tips-trick', '/article/media-release']) ? styles.activeSpan : ''}`}
                  onClick={() => toggleDropdown('article')}
                >
                  Article <IoChevronDown />
                </span>
                <ul className={openDropdown === 'article' ? styles.show : ''}>
                  <li>
                    <Link href="/article" className={getLinkClass('/article')} onClick={closeDropdown}>
                      Article
                    </Link>
                  </li>
                  <li>
                    <Link href="/article/event" className={getLinkClass('/article/event')} onClick={closeDropdown}>
                      Event
                    </Link>
                  </li>
                  <li>
                    <Link href="/article/tips-trick" className={getLinkClass('/article/tips-trick')} onClick={closeDropdown}>
                      Tips & Tricks
                    </Link>
                  </li>
                  <li>
                    <Link href="/article/media-release" className={getLinkClass('/article/media-release')} onClick={closeDropdown}>
                      Media Release
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/contact" className={getLinkClass('/contact')} onClick={closeDropdown}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div className={styles.fixed_menu}>
        <div className={styles.fixed_menu_box}>
          <audio ref={audioPlayer} src='/music/soundtrack.mp3' autoPlay/>
          <button onClick={togglePlay} className={styles.bg_transparent}>{isPlaying ? <SlVolume2 />:  <SlVolumeOff/>}</button>
        </div>
        <div className={styles.fixed_menu_box}>
          <button className={styles.bg_transparent}><PiShareNetwork /></button>
          <button className={styles.bg_whatsapp}><FaWhatsapp /></button>
          <div className={styles.ecommerceDropdown}>
            <button onClick={toggleDropdownEcommerce} className={`${styles.bg_ecommerce} ${isDropdownOpen ? styles.active : ''}`}>
              <BsCart2 /> eCommerce
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