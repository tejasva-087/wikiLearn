import Navigation from "../components/Navigation";
import MainMenu from "../components/MainMenu";
import SideMenu from "../components/SideMenu";
import NumberCircle from "../components/ui/NumberCircle";
import Badge from "../components/ui/Badge";
import placeholderImg from "../assets/img/placeholderImg.png";
import Stats from "../components/ui/Stats";

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
            <Badge
              placeholderImg={placeholderImg}
              className={"road-map--badge badge-1"}
              title="First piler of Wikipedia"
              date="2023-10-01"
            ></Badge>
            <Stats
              type="points"
              points={"4 points"}
              hide={true}
              className="road-map-points points-1"
            />

            <div className="level level-2">
              <p className="text-seconadry level-text">
                Wikipedia is an encyclopedia
              </p>
              <NumberCircle num={2}></NumberCircle>
            </div>

            <Badge
              placeholderImg={placeholderImg}
              className={"road-map--badge badge-2"}
              title="First piler of Wikipedia"
              date="2023-10-01"
            ></Badge>
            <Stats
              type="points"
              points={"4 points"}
              hide={true}
              className="road-map-points points-2"
            />
            <div className="road-map--line"></div>
          </div>
        </div>
      </div>

      <SideMenu />
    </div>
  );
}

export default CoursePage;
