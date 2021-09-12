import React, { useState, useCallback } from "react";
import { useBetween } from "use-between";

export interface Settings {
  tweaksEnabled: boolean;
}

const useSettings = () => {
  const [tweaksEnabled, setTweaksEnabled] = useState(false);
  return {
    tweaksEnabled,
    setTweaksEnabled
  };
};

export const useSharedSettings = () => useBetween(useSettings);
