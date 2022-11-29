import { Box, BoxProps } from "@mui/material";

export enum Status {
  CONFIRMED,
  NOT_CONFIRMED,
  DELAYED,
}

function statusToColor(status?: Status): string {
  switch (status) {
    case Status.CONFIRMED:
      return "green";
    case Status.DELAYED:
      return "orange";
    case Status.NOT_CONFIRMED:
      return "red";
    default:
      return "black";
  }
}
function StatusCircle({ status }: { status?: Status }) {
  return (
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: "100%",
        backgroundColor: statusToColor(status),
      }}
    />
  );
}

export default StatusCircle;
