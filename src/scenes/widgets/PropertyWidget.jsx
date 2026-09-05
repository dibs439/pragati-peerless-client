// import {
//   EditOutlined,
//   DeleteOutlined,
//   AttachFileOutlined,
//   GifBoxOutlined,
//   ImageOutlined,
//   MicOutlined,
//   MoreHorizOutlined,
// } from "@mui/icons-material";
import { Box, Divider, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
//
import PropertyDetailsCard from "components/common/PropertyDetailsCard";
import PropertyGraphWidget from "scenes/widgets/PropertyGraphWidget";

//
//import { useState } from "react";
//import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import { setPosts } from "state";
import allProperties from "data/properties";
import HotelPropertyWidget from "./HotelPropertyWidget";
import { canAccessProperty } from "../../utils/propertyAccess";

const PropertyWidget = ({ propertyId }) => {
  //const dispatch = useDispatch();
  //const [isImage, setIsImage] = useState(false);
  //const [image, setImage] = useState(null);
  //const [post, setPost] = useState("");
  //const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const { _id, userRole } = user;
  //const token = useSelector((state) => state.token);

  const subsidiary = useSelector((state) => state.user.subsidiary);
  //const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //const mediumMain = palette.neutral.mediumMain;
  //const medium = palette.neutral.medium;
  const navigate = useNavigate();

  //
  //
  const filturedProperty = allProperties.filter(
    (property) => property._id === propertyId
  );

  const checkMapping = () => {
    if (!canAccessProperty(user, filturedProperty[0])) {
      const unitLabel = filturedProperty[0].subsidiary.startsWith("Hospital")
        ? "unit"
        : "property";
      return <h1>You are not authorised to view this {unitLabel}</h1>;
    }
    if (
      subsidiary !== "Hotel" &&
      subsidiary !== "PGFI" &&
      filturedProperty[0].subsidiary !== subsidiary &&
      filturedProperty[0].subsidiary.split("-")[0] !== subsidiary
    ) {
      const unitLabel = filturedProperty[0].subsidiary.startsWith("Hospital")
        ? "unit"
        : "property";
      return <h1>You are not authorised to view this {unitLabel}</h1>;
    } else if (
      subsidiary === "PGFI" ||
      filturedProperty[0].propertyCode === "PHL-All"
    ) {
      if (filturedProperty[0].subsidiary === "PGFI") {
        return (
          <>
            <h1>PGFI view: {filturedProperty[0].subsidiary}</h1>
            <HotelPropertyWidget />
          </>
        );
      } else {
        return (
          <>
            {/* <h1>Show details page</h1> */}
            <PropertyDetailsCard
              key={filturedProperty[0]._id}
              id={filturedProperty[0]._id}
              title={filturedProperty[0].title}
              description={filturedProperty[0].description}
              location={filturedProperty[0].location}
              photo={filturedProperty[0].photo}
            />
            {checkControls()}
            <Divider sx={{ margin: "1.25rem 0" }} />
            {/* <Box>
              <FlexBetween gap="1rem" mb="0.5rem">
                <Button
                  size="large"
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(`/dashboard/${propertyId}`)}
                >
                  Dashboard
                </Button>
              </FlexBetween>
            </Box> */}
            {checkRating()}
          </>
        );
      }
    } else {
      return (
        <>
          <PropertyDetailsCard
            key={filturedProperty[0]._id}
            id={filturedProperty[0]._id}
            title={filturedProperty[0].title}
            description={filturedProperty[0].description}
            location={filturedProperty[0].location}
            photo={filturedProperty[0].photo}
          />
          {checkControls()}
          <Divider sx={{ margin: "1.25rem 0" }} />
          {checkRating()}
        </>
      );
    }
  };

  const checkControls = () => {
    let isRating = true;
    if ((userRole === 0 || userRole === 1) && subsidiary !== "PGFI") {
      return (
        <>
          <Divider sx={{ margin: "1.25rem 0" }} />
          <FlexBetween gap="1rem" mb="0.5rem">
            {(userRole === 0 || userRole === 1) && (
              <Button
                size="large"
                variant="text"
                onClick={() => navigate(`/property/budget/add/${propertyId}`)}
              >
                Add Budget Data
              </Button>
            )}
            <Button
              size="large"
              variant="text"
              onClick={() => navigate(`/property/actual/add/${propertyId}`)}
            >
              Add Actual Data - Monthly
            </Button>
          </FlexBetween>
        </>
      );
    } else if ((userRole === 2) && (filturedProperty[0].propertyCode !== "PHL-All")) {
      return (
        <>
          <Divider sx={{ margin: "1.25rem 0" }} />
          
          <Button
            size="large"
            variant="outlined"
            fullWidth
            onClick={() => navigate(`/property/rating/add/${propertyId}`)}
          >
            Add Rating Data
          </Button>
        </>
      );
    }
  };
  const checkRating = () => {
    if(userRole !== 2){
      return(
      <Box>
            <FlexBetween gap="1rem" mb="0.5rem">
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(`/dashboard/${propertyId}`)}
              >
                Dashboard
              </Button>
            </FlexBetween>
      </Box>
      )
    }
  };

  return <WidgetWrapper>{checkMapping()}</WidgetWrapper>;
  //

  //
};

export default PropertyWidget;
