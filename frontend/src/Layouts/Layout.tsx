import Header from '../components/Header';
// import Footer from "../components/Footer";
import HomePage from '../pages/HomePage';
//import BadgePage from "../pages/BadgePage";
//import Certificate from "../pages/Certificate";
//import CoursePage from "../pages/CoursePage";
//import ForumPage from "../pages/ForumPage";

function Layout() {
  return (
    <div className="">
      <Header />
      <HomePage />
      {/* <BadgePage></BadgePage>
      <Certificate></Certificate>
      <CoursePage></CoursePage>
      <ForumPage></ForumPage> */}
      {/* <Footer></Footer> */}
    </div>
  );
}

export default Layout;
