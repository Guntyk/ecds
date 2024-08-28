import { pathnames } from 'constants/pathnames';
import { useLocation } from 'react-router-dom';

export const useNews = () => {
  const { pathname, key } = useLocation();
  const { ballroomPage, streetDancePage, caribbeanDancePage, newsPage } = pathnames;

  const pageMappings = [
    { key: ballroomPage, filter: (page) => pathname.includes(page) },
    { key: streetDancePage, filter: (page) => pathname.includes(page) },
    { key: caribbeanDancePage, filter: (page) => pathname.includes(page) },
    { key: key, filter: (page) => page === 'main' },
    { key: newsPage, filter: (page) => page === 'main' },
  ];

  const getCurrentPageNews = (news) => {
    let filteredNews = [];

    const activePage = pageMappings.find(
      ({ key: pageKey }) => pageKey === key || pathname.includes(pageKey) || pathname.startsWith(pageKey)
    );

    if (activePage) {
      filteredNews = news.filter(({ pages }) => pages.some(activePage.filter));
    } else {
      filteredNews = news.filter(({ pages }) => pages.includes('global'));
    }

    return filteredNews;
  };

  return { getCurrentPageNews };
};
