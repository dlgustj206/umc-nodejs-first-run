export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address || "",
    detailAddress: user.detail_address || "",
    phoneNumber: user.phone_number || "",
    preferences: preferences ? preferences.map(pref => pref.name) : []
  };
};