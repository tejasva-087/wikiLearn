import { useState } from "react";

import Button from "./Button";

import { CaretDown, Gear, SignOut } from "@phosphor-icons/react";

function UserMenu({ className, userName }) {
  const [seed] = useState(() => Math.floor(Math.random() * 100000000));

  return (
    <div className={`user flex-center gap--sml ${className}`}>
      <img
        src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}&backgroundColor=F9D05B`}
        alt="user-profile-img"
        className="user-img"
      />
      <CaretDown weight="light" className="icon--sml" />

      <div className="user-menu">
        <nav className="user-nav flex-center flex-column gap--big ">
          <figure className="user-figure flex-center flex-column gap--mid">
            <img
              src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}&backgroundColor=F9D05B`}
              alt="user-profile-img"
              className="user-img"
            />
            <figcaption>
              <h3 className="heading-tertiary">{userName}</h3>
            </figcaption>
          </figure>

          <div className="width-full flex-center flex-column gap--sml">
            <Button color="normal" className="btn--normal--combined">
              <Gear className="icon--big" weight="light" />
              <p className="text-secondary">settings</p>
            </Button>
            <Button color="normal" className="btn--normal--combined">
              <SignOut className="icon--big" weight="light" />
              <p className="text-secondary">Log out</p>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default UserMenu;
