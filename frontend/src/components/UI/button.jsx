const Button = ({ type, className, disabled, children, onClick }) => (
  <button type={type} className={className} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);