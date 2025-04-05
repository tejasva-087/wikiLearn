import MainMenu from "../components/MainMenu";
import Navigation from "../components/Navigation";
import SideMenu from "../components/SideMenu";
import CourseBox from "../components/ui/CourseBox";
import Badge from "../components/ui/Badge";

import { ArrowRight } from "@phosphor-icons/react";

import placeholderImg from "../assets/img/placeholderImg.png";

function Overview() {
  return (
    <>
      <div className="layout">
        <Navigation />
        <MainMenu activeEl="Overview" />
        <div className="scrollable">
          {/* overview page */}
          <div className="overview-page">
            <CourseBox
              title="Continue, Fundamental pillars of wikipedia course"
              description="Master the foundational principles that guide Wikipedia. This course explores the Five Pillars, essential for understanding and contributing effectively."
              btnLabel="Get started"
              btnLink="courses/course-view"
              className="width-full"
            />
            <div className="badge-header">
              <h3 className="heading-tertiary">Badges</h3>
              <div className="flex-center gap--sml">
                <p className="text-tertiary">See all badges</p>
                <ArrowRight className="icon--mid" />
              </div>
            </div>

            <div className="badges-container width-full">
              <Badge
                placeholderImg={placeholderImg}
                title="Mastered the first pillar of wikipedia"
                date="2023-10-01"
              />
              <Badge
                placeholderImg={placeholderImg}
                title="Mastered the first pillar of wikipedia"
                date="2023-10-01"
              />
              <Badge
                placeholderImg={placeholderImg}
                title="Mastered the first pillar of wikipedia"
                date="2023-10-01"
              />
              <Badge
                placeholderImg={placeholderImg}
                title="Mastered the first pillar of wikipedia"
                date="2023-10-01"
              />
            </div>
          </div>
        </div>

        <SideMenu />
      </div>
    </>
  );
}

export default Overview;
