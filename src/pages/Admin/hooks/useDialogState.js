import { useState } from "react";

const useDialogState = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  return { isDialogOpen, handleDialogOpen, handleDialogClose };
};

export default useDialogState;
