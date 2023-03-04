import { useAppDispatch, useAppSelector } from "lib/store/hooks";
import { selectArticlesByuser } from "lib/store/slices/article.slice";
import { selectUser, updateUser } from "lib/store/slices/user.slice";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import styels from "@/styles/pages/profile.module.scss";
import { HiUserCircle } from "react-icons/hi2";
import { HiMail, HiOfficeBuilding, HiPencilAlt } from "react-icons/hi";
import { useState } from "react";
import UserForm, { UserFormElement } from "@/components/reusable/UserForm";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Error statusCode={404} />;
  }

  const [editView, setEditView] = useState(false);
  const likedArticles = useAppSelector(selectArticlesByuser(user?.id));

  function handleSubmit(event: React.FormEvent<UserFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements;

    dispatch(
      updateUser({
        id: user?.id ?? "",
        name: elements.name.value,
        email: elements.email.value,
        organization: elements.organization.value,
      })
    );

    setEditView(false);
  }

  return (
    <div className={styels.profile}>
      <div className={styels.user}>
        <Image
          width={100}
          height={100}
          alt="autor-profile"
          src={`https://api.dicebear.com/5.x/adventurer/png?seed=${user?.id}`}
        />
        {editView ? (
          <UserForm handleSubmit={handleSubmit} defaultValues={user} />
        ) : (
          <>
            <button onClick={() => setEditView(!editView)}>
              <HiPencilAlt />
              Edit Profile
            </button>
            <span>
              <HiUserCircle />
              {user?.name}
            </span>
            <span>
              <HiMail />
              {user?.email}
            </span>
            <span>
              <HiOfficeBuilding />
              {user?.organization}
            </span>
          </>
        )}
      </div>

      <div className={styels.articles}>
        <span>Liked Articles</span>
        <ul>
          {likedArticles.map((article) => (
            <li>
              <Link href={article.slug}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
