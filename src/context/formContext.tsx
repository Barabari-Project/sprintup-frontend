import React, { createContext, useState, ReactNode, useContext } from 'react';

// Context ka type define karo
interface FormContextType {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formSubmitted: boolean;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

// Initial context value set karo
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component define karo
const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  return (
    <FormContext.Provider value={{ isLoading, setLoading, formSubmitted, setFormSubmitted }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook for context use
const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export { FormProvider, useFormContext };
