import Navigation from "../components/Navigation";
import MainMenu from "../components/MainMenu";
import SideMenu from "../components/SideMenu";
import NumberCircle from "../components/ui/NumberCircle";

function CoursePage() {
  return (
    <div className="layout">
      <Navigation />
      <MainMenu activeEl="Courses" />
      <div className="scrollable width-full">
        <div className="course-page">
          <h3 className="heading-tertiary">
            Fundamental pillars of wikipedia course
          </h3>

          <div className="road-map">
            <div className="level level-1">
              <NumberCircle num={1}></NumberCircle>
              <p className="text-seconadry level-text">
                Wikipedia is an encyclopedia
              </p>
            </div>

            <div className="level  level-2">
              <p className="text-seconadry level-text">
                Wikipedia is an encyclopedia
              </p>
              <NumberCircle num={1}></NumberCircle>
            </div>
            <div className="road-map--line"></div>
          </div>
        </div>
      </div>

      <SideMenu />
    </div>
  );
}

export default CoursePage;
