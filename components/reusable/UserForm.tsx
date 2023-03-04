import React from "react";
import styles from "@/styles/components/reusable.module.scss";
import { IUser } from "@types";

export interface userFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  organization: HTMLInputElement;
}

export interface UserFormElement extends HTMLFormElement {
  readonly elements: userFormElements;
}

const UserForm = ({
  handleSubmit,
  defaultValues,
}: {
  handleSubmit(event: React.FormEvent<UserFormElement>): void;
  defaultValues?: Omit<IUser, "id">;
}) => {
  return (
    <div className={styles.user_form}>
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={defaultValues?.name}
          placeholder="Your full name"
          required
          type="text"
          id="name"
        />
        <input
          defaultValue={defaultValues?.email}
          placeholder="your email address"
          required
          type="email"
          id="email"
        />
        <input
          defaultValue={defaultValues?.organization}
          placeholder="Your organization"
          required
          type="text"
          id="organization"
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
