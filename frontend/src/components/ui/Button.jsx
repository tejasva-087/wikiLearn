function Button({ children, type = "button", onClick, className, color }) {
  return (
    <button
      type={type}
      className={`btn btn--${color} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
