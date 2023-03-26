import { Loader } from '@mantine/core';
import React from 'react';

const BoxListLoading = () => {
  return (
    <div className="h-[70vh]">
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <Loader />
        <p className="animate-pulse text-sm">Recuperando cajas...</p>
      </div>
    </div>
  );
};

export default BoxListLoading;
