import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center my-6">
            <CircularProgress size={40} thickness={4} color="inherit" />
        </div>
    );
};

export default LoadingSpinner;
