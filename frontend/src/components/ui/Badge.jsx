import { Medal } from "@phosphor-icons/react";

function Badge({ placeholderImg, title, date, type }) {
  return (
    <div className={`badge badge--${type} flex-center flex-column`}>
      <img src={placeholderImg} alt="badge image" className="badge-img" />
      <div className="badge-text">
        <p className="text-seconadry">{title}</p>
        <p className="text-tertiary">{date}</p>
        {type === "gold" && (
          <Medal className="icon--big badge-medel badge-medel--gold" />
        )}

        {type === "silver" && (
          <Medal className="icon--big badge-medel badge-medel--silver" />
        )}
        {type === "bronze" && (
          <Medal className="icon--big badge-medel badge-medel--bronze" />
        )}
      </div>
    </div>
  );
}

export default Badge;
