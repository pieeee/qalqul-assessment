import React from "react";
import styles from "@/styles/components/reusable.module.scss";
import { HiOutlineX } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "lib/store/hooks";
import {
  selectRegistrationModal,
  toggleModal,
} from "lib/store/slices/registrationModal.slice";
import { saveUser } from "lib/store/slices/user.slice";
import UserForm, { UserFormElement } from "./UserForm";

const RegistrationModal = () => {
  const showModal = useAppSelector(selectRegistrationModal);
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(toggleModal());

  function handleSubmit(event: React.FormEvent<UserFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements;

    dispatch(
      saveUser({
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
          <UserForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
