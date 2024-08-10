import { useLocation } from 'react-router-dom';
import { constructionPages } from 'constants/pagesCategories';
import { Construction } from 'pages/Services/Construction';
import { NotFound } from 'pages/Services/NotFound';

export const Service = () => {
  const { pathname } = useLocation();

  const isUnderConstruction = (pathname, pages = constructionPages) =>
    pages.some((page) =>
      typeof page === 'string'
        ? pathname === page
        : typeof page === 'object' &&
          Object.entries(page).some(
            ([key, values]) =>
              pathname.startsWith(key) &&
              (!pathname.slice(key.length) || isUnderConstruction(pathname.slice(key.length), values))
          )
    );

  const underConstruction = isUnderConstruction(pathname);

  return underConstruction ? <Construction /> : <NotFound />;
};
