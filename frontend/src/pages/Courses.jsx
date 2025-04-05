import MainMenu from "../components/MainMenu";
import Navigation from "../components/Navigation";
import SideMenu from "../components/SideMenu";
import CourseBox from "../components/ui/CourseBox";

function Courses() {
  return (
    <div className="layout">
      <Navigation />
      <MainMenu activeEl="Courses" />
      <div className="scrollable">
        {/* course page */}
        <div className="course-page">
          <CourseBox
            title="Continue, Fundamental pillars of wikipedia course"
            description="Master the foundational principles that guide Wikipedia. This course explores the Five Pillars, essential for understanding and contributing effectively."
            btnLabel="Get started"
            btnLink="course-page"
          />
          <CourseBox
            title="Continue, Fundamental pillars of wikipedia course"
            description="Master the foundational principles that guide Wikipedia. This course explores the Five Pillars, essential for understanding and contributing effectively."
            btnLabel="Get started"
            btnLink="course-page"
          />
          <CourseBox
            title="Continue, Fundamental pillars of wikipedia course"
            description="Master the foundational principles that guide Wikipedia. This course explores the Five Pillars, essential for understanding and contributing effectively."
            btnLabel="Get started"
            btnLink="course-page"
          />
          <CourseBox
            title="Continue, Fundamental pillars of wikipedia course"
            description="Master the foundational principles that guide Wikipedia. This course explores the Five Pillars, essential for understanding and contributing effectively."
            btnLabel="Get started"
            btnLink="course-page"
          />
          <CourseBox
            title="Continue, Fundamental pillars of wikipedia course"
            description="Master the foundational principles that guide Wikipedia. This course explores the Five Pillars, essential for understanding and contributing effectively."
            btnLabel="Get started"
            btnLink="course-page"
          />
        </div>
      </div>

      <SideMenu />
    </div>
  );
}

export default Courses;
