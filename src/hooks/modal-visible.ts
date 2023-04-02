import { useCallback, useState } from 'react';

export const useModalVisible = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [closed, setClosed] = useState(true);

  const openModal = useCallback(() => {
    setClosed(false);
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setClosed(true);
    }, 300);
  }, []);

  return { isVisible, closed, openModal, closeModal };
};
