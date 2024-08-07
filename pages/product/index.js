import Head from "next/head";
import styles from '@/styles/Product.module.css'
import banner from '@/styles/Banner.module.css'
import JapaneseProduct from "../components/japaneseProduct";
import Tabs from "../components/tab";
import Link from "next/link";
import SlideArticles from "../components/slide_articles";
import SlideArticlesMobile from "../components/slide_articles_mobile";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; 

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function Product() {
  const { t } = useTranslation('common');

  const tabs = [
    { 
      title: 'Japanese Product', 
      content: <JapaneseProduct/>
    },
    { 
      title: 'Indonesian Spices', 
      content: <JapaneseProduct/>
    },
    { 
      title: 'Frozen Veggies', 
      content: <JapaneseProduct/> 
    },
    { 
      title: 'Indonesian Coffee', 
      content: <JapaneseProduct/>
    },
  ];

  const recipeList = [
    {
      id: 1,
      images: '/images/recipe_image.png',
      headingBlog: 'Recipe Name',
      descBlog: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis vel dui eu imperdiet. Vestibulum mattis faucibus nisi, sed finibus nunc scelerisque at. Sed quis arcu consequat,'
    },
    {
      id: 2,
      images: '/images/recipe_image.png',
      headingBlog: 'Recipe Name',
      descBlog: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis vel dui eu imperdiet. Vestibulum mattis faucibus nisi, sed finibus nunc scelerisque at. Sed quis arcu consequat,'
    },
    {
      id: 3,
      images: '/images/recipe_image.png',
      headingBlog: 'Recipe Name',
      descBlog: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis vel dui eu imperdiet. Vestibulum mattis faucibus nisi, sed finibus nunc scelerisque at. Sed quis arcu consequat,'
    },
    {
      id: 4,
      images: '/images/recipe_image.png',
      headingBlog: 'Recipe Name',
      descBlog: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis vel dui eu imperdiet. Vestibulum mattis faucibus nisi, sed finibus nunc scelerisque at. Sed quis arcu consequat,'
    },
    {
      id: 5,
      images: '/images/recipe_image.png',
      headingBlog: 'Recipe Name',
      descBlog: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis vel dui eu imperdiet. Vestibulum mattis faucibus nisi, sed finibus nunc scelerisque at. Sed quis arcu consequat,'
    },
  ]

  const pageTitle = `House Kari | ${t('menu.product')}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title> 
        <meta name="description" content="Learn more about us" />
      </Head>
      <div className={banner.bannerStyle}>
        <img src="/images/product_page_banner.png" alt="House Kari Website"/>
      </div>
      <div className={banner.breadcrumbs}>
        <p>{t('menu.home')} / <span>{t('menu.product')}</span></p> 
      </div>
      <div className={styles.section1}>
        <img src="/images/tab_icon_image.png" alt="House Kari" className={styles.tab_icon_image}/>
        <img src="/images/tab_icon_image2.png" alt="House Kari" className={styles.tab_icon_image2}/>
        <Tabs tabs={tabs} />
      </div>
      <div className={styles.section2}>
        <div className={styles.space_between_heading}>
          <h1 className={styles.heading_main_white}>{t('headingRecipe')}</h1>
        </div>
        <SlideArticles items={recipeList} />
        <SlideArticlesMobile items={recipeList} />
        <div className={styles.divider}></div>
      </div>
    </>
  ); 
}
