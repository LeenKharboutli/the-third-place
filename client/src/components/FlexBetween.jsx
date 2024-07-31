import { Box } from "@mui/material";
import { styled } from "@mui/system";


//NOTE: good if reusing CSS as a component
//NOTE: going to use this alot
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
