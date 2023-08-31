const SaveUserToDb = (user) => {
  const CurrentUser = {
    email: user.email,
    photo: user?.photoURL,
    name: user?.displayName,
    role: "user",
  };
  fetch(
    `https://multivendor-e-commerce-web-server.vercel.app/users/${user.email}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(CurrentUser),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

export default SaveUserToDb;
