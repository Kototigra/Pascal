import classes from './ButtonCreate.module.css';

export default function ButtonCreate({ children, ...props }) {
  return (
    <button {...props} className={classes.btnCreate}>
      {children}
    </button>
  );
}
