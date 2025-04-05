import Box from "./Box";
import Button from "../ui/Button";
import courseStar from "../../assets/img/courseBoxStar.svg";

import Link from "./Link";

import { ArrowRight } from "@phosphor-icons/react";

function CourseBox({ title, description, btnLabel, btnLink, className }) {
  return (
    <Box className={`course-box ${className}`}>
      <div className="course-box-text">
        <h3 className="heading-tertiary">{title}</h3>
        <p className="text-primary">{description}</p>
        <Link
          type="white"
          link={`/courses/${btnLink}`}
          className="font-mid flex-center gap--sml"
        >
          {btnLabel}
          <ArrowRight className="icon--big" weight="bold" />
        </Link>
      </div>
      <img
        src={courseStar}
        alt="course star set in background"
        className="course-box-img course-box-img--1"
      />
      <img
        src={courseStar}
        alt="course star set in background"
        className="course-box-img course-box-img--2"
      />
      <img
        src={courseStar}
        alt="course star set in background"
        className="course-box-img course-box-img--3"
      />
      <img
        src={courseStar}
        alt="course star set in background"
        className="course-box-img course-box-img--4"
      />
    </Box>
  );
}

export default CourseBox;
