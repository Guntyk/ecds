import { Switch, Route, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { routes } from "constants/routes";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const memoizedRoutes = useMemo(() => routes, []);

  return (
    <>
      <Header />
      <main>
        <Switch>
          {memoizedRoutes.map(({ id, path, component: Component }) => (
            <Route key={id} path={path} exact>
              <Component />
            </Route>
          ))}
        </Switch>
      </main>
      <Footer />
    </>
  );
}
