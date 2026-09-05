export const canAccessProperty = (user, property) => {
  if (!user || !property) return false;

  if (user.propertyAccess?.length > 0) {
    return (
      user.propertyAccess.includes(property.propertyCode) &&
      property.subsidiary === user.subsidiary
    );
  }

  const unitCode = user.subsidiaryId;
  if (unitCode?.startsWith("PHH-")) {
    return property.propertyCode === unitCode;
  }

  return (
    user.subsidiary === "PGFI" ||
    user.subsidiary === "Hotel" ||
    property.subsidiary === user.subsidiary ||
    property.subsidiary.split("-")[0] === user.subsidiary
  );
};
