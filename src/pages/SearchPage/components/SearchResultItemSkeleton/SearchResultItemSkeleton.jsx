import React from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

const SearchResultItemSkeleton = () => {
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          // md: "row"
        },
        marginBottom: 4,
        borderRadius: 5,
        padding: 2,
        gap: 2,
      }}
    >
      <Skeleton
        variant="rectangular"
        width={250}
        height={250}
        sx={{ borderRadius: 5 }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton height={30} width="70%" style={{ marginBottom: 1 }} />
        <Skeleton height={20} width="50%" style={{ marginBottom: 1 }} />
        <Skeleton height={20} width="80%" style={{ marginBottom: 1 }} />
        <Skeleton height={20} width="60%" style={{ marginBottom: 1 }} />
        <Skeleton height={20} width="40%" style={{ marginBottom: 1 }} />
      </CardContent>
    </Card>
  );
};

export default SearchResultItemSkeleton;
