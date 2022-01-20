import classes from './ButtonCreate.module.css';

export default function ButtonCreate({ children, ...props }) {
  return (
    <button {...props} style={{background: props.btnColor}} className={classes.btnCreate}>
      {children}
    </button>
  );
}
