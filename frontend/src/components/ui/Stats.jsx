import VisualIcons from "./VisualIcons";

function Stats({ type, points, hide = false, className }) {
  return (
    <div className={`stats flex-center gap--mid ${className}`}>
      <VisualIcons type={type} />

      <p className="text-seconadry">
        {hide === true ? "" : type} {points}
      </p>
    </div>
  );
}

export default Stats;
