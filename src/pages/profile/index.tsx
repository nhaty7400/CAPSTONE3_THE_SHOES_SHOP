import React, { useEffect, useState } from "react";
import { getUserProfile } from "src/services/user.service";

function Profile() {
  const [profile, setProfile] = useState<any>();
  useEffect(() => {
    getUserProfile()
      .then((resp) => {
        console.log(resp);
        setProfile(resp.content);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <img style={{ width: 300 }} src={profile?.avatar} alt="" />
    </div>
  );
}

export default Profile;
