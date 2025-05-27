export const bodyToUser = (body) => {
  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: new Date(body.birth),
    age: body.age,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const bodyToUserUpdate = (body) => {
  return {
    gender: body.gender,
    birth: body.birth ? new Date(body.birth) : undefined,
    address: body.address,
    detailAddress: body.detailAddress,
    phoneNumber: body.phoneNumber
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};