import className from 'classnames';
import { GoSync } from "react-icons/go";

function Button({
  children,
  loading,
  ...rest
}) {
  const classes = className(
    rest.className,
    {
      'opacity-80': loading,
    }
  );

  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

export default Button;