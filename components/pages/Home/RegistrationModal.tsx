import React from "react";
import styles from "@/styles/components/registration.module.scss";
import { HiOutlineX } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "lib/store/hooks";
import {
  selectRegistrationModal,
  toggleModal,
} from "lib/store/slices/registrationModal.slice";
import { saveUser } from "lib/store/slices/user.slice";
import { v4 } from "uuid";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  organization: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const RegistrationModal = () => {
  const showModal = useAppSelector(selectRegistrationModal);
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(toggleModal());

  function handleSubmit(event: React.FormEvent<FormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements;

    dispatch(
      saveUser({
        id: v4(),
        name: elements.name.value,
        email: elements.email.value,
        organization: elements.organization.value,
      })
    );

    onClose();
  }

  if (!showModal) {
    return <></>;
  }

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <span>Create your profile to react or comment to any articles.</span>

          <button onClick={onClose}>
            <HiOutlineX />
          </button>
        </div>
        <div className={styles.modal_body}>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Your full name"
              required
              type="text"
              id="name"
            />
            <input
              placeholder="your email address"
              required
              type="email"
              id="email"
            />
            <input
              placeholder="Your organization"
              required
              type="text"
              id="organization"
            />

            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
