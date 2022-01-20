import classes from './CapacityProgressBar.module.css'

export default function CapacityProgressBar(props) {
    const { bgcolor, completed } = props;
  
    return (
      <div className={classes.containerStyles}>
        <div className={classes.fillerStyles} style={{ width: `${completed}%`, backgroundColor: bgcolor }}>
        </div>
      </div>
    );
  }
