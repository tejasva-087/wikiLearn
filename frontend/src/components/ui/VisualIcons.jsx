import { Star, Medal, Lightning, Certificate } from "@phosphor-icons/react";

function VisualIcons({ type, className }) {
  return (
    <>
      {type === "points" && (
        <Star className={`visual-icon visual-icon--points ${className}`} />
      )}
      {type === "badges" && (
        <Medal className={`visual-icon visual-icon--badges ${className}`} />
      )}
      {type === "streak" && (
        <Lightning className={`visual-icon visual-icon--streak ${className}`} />
      )}
      {type === "certificate" && (
        <Certificate
          className={`visual-icon visual-icon--certificate ${className}`}
        />
      )}
    </>
  );
}

export default VisualIcons;
