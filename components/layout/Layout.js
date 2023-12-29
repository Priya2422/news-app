import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { AuthContextProvider } from '@/hooks/context';
import { FavContextProvider } from '@/hooks/favContext';
function Layout(props) {
  return (
    <div>
      <AuthContextProvider>
        <FavContextProvider>
          <MainNavigation />
            <main className={classes.main}>{props.children}</main>
        </FavContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default Layout;
