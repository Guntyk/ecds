import { useLocation } from 'react-router-dom';
import { constructionPages } from 'constants/pagesCategories';
import { Construction } from 'pages/Services/Construction';
import { NotFound } from 'pages/Services/NotFound';

export const Service = () => {
  const { pathname } = useLocation();

  const isUnderConstruction = constructionPages.includes(pathname);

  return isUnderConstruction ? <Construction /> : <NotFound />;
};
