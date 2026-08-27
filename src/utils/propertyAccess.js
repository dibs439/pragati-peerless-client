export const canAccessProperty = (user, property) => {
  if (!user || !property) return false;

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
