import classes from './InputText.module.css';

export default function InputText(props) {
  return <input className={classes.inputText} {...props} />;
}
