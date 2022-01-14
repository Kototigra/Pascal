import { useState } from "react";
import InputText from "../UI/InputText/InputText";
import ButtonCreate from "../UI/ButtonCreate/ButtonCreate";

export default function RestaurantForm({ bookTableHandler }) {
  const [booking, setBooking] = useState(
    {
      name: '',
      email: '',
      guestsQuantity: '',
    }
  );

  const createNewbooking = (event) => {
    console.log(event);
    event.preventDefault();
    const newBooking = {
      ...booking,
      id: new Date(),
    };
    bookTableHandler(newBooking);
    setBooking({ name: '', email: '', guestsQuantity: '' });
  };

  return (
    <>
      <InputText
        value={booking.name}
        onChange={(event) => setBooking({ ...booking, name: event.target.value })}
        name="name"
        type="text"
        placeholder="First (last) name"
      />
      <InputText
        value={booking.email}
        onChange={(event) => setBooking({ ...booking, email: event.target.value })}
        name="email"
        type="text"
        placeholder="Email"
      />
      <InputText
        value={booking.guestsQuantity}
        onChange={(event) => setBooking({ ...booking, guestsQuantity: event.target.value })}
        name="guestsQuantity"
        type="text"
        placeholder="Guests quantity"
      />
      <ButtonCreate onClick={createNewbooking}>Complete reservation</ButtonCreate>
    </>
  );
}
