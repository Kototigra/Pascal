import classes from './PicturesGallery.module.css';

import { v4 as uuidv4 } from 'uuid';

export default function PicturesGallery({ restaurantDataFromState }) {
  return (
    <div className={classes.container}>
      <ul className={classes.gallery}>
        {restaurantDataFromState?.pictures && restaurantDataFromState.pictures.map((picture) => {
          return (
            <li key={uuidv4()} className={classes.gallery__item}>
              <img src={picture.path} className={classes.gallery__item__img} alt="pic" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
