import VisualIcons from "./VisualIcons";

function Stats({ type, points }) {
  return (
    <div className="stats flex-center gap--mid">
      <VisualIcons type={type} />

      <p className="text-seconadry">
        {type} {points}
      </p>
    </div>
  );
}

export default Stats;
