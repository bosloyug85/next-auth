import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface ICertificate {
    documentId: string;
    languageId: number | null;
    filename: string | null;
    fileUri: string | null;
    previewUri: string | null;
    pdfFileUri: string | null;
    totalPages: number | null;
}

interface ICertificateGroup {
  certificateId: string | null;
  employeeId: string | null;
  employeeAdId: string | null;
  employeeName: string | null;
  employeeBusinessUnit: string | null;
  employeeLogoUri: string | null;
  employeeEmailAddress: string | null;
  employeeUsername: string | null;
  employeePhoneNumber: string | null;
  employeeGroup: string | null;
  vendor: string | null;
  typeId: number | null;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  certificationNumber: string | null;
  isExpired: boolean | null;
  validFromDate: string | null;
  validToDate: string | null;
  dateCreated: string | null;
  createdBy: string | null;
  dateUpdated: string | null;
  updatedBy: string | null;
  isDeleted: boolean | null;
  dateDeleted: string | null;
  deletedBy: string | null;
  certificates: ICertificate[] | null;
}

interface IFilter {
  keywords: string[];
  searchType: number;
  includeInactive?: boolean;
}

// Define the shape of your state
interface AppState {
  filters: IFilter;
  certificateGroups: ICertificateGroup[];
  isLoading: boolean;
  readyForExport: string[];
}

// Define the available actions
type AppAction =
  { type: 'UPDATE_FILTERS'; payload: { keywords: string[]; searchType: number } }
  | { type: 'UPDATE_SEARCH_TYPE'; payload: number }
  | { type: 'UPDATE_KEYWORDS'; payload: string[] }
  | { type: 'UPDATE_ONLY_ACTIVE'; payload: boolean }
  | { type: 'SET_CERTIFICATE_GROUPS'; payload: ICertificateGroup[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_DOCUMENT_ID_FOR_EXPORT'; payload: string }
  | { type: 'REMOVE_DOCUMENT_ID_FROM_EXPORT'; payload: string };


// Create context
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Initial state
const initialState: AppState = {
  filters: {
    keywords: [],
    searchType: 1,
    includeInactive: true
  },
  certificateGroups: [],
  isLoading: false,
  readyForExport: []
};

// Reducer function
const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    // Handle different actions based on your requirements
    case 'UPDATE_FILTERS':
      return { ...state, filters: action.payload };
    case 'UPDATE_SEARCH_TYPE':
      return { ...state, filters: { ...state.filters, searchType: action.payload } };
    case 'UPDATE_KEYWORDS':
      return { ...state, filters: { ...state.filters, keywords: action.payload } };
    case 'UPDATE_ONLY_ACTIVE':
      return { ...state, filters: { ...state.filters, includeInactive: action.payload } };
    case 'SET_CERTIFICATE_GROUPS':
      return { ...state, certificateGroups: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_DOCUMENT_ID_FOR_EXPORT':
      return { ...state, readyForExport: [...state.readyForExport, action.payload] };
    case 'REMOVE_DOCUMENT_ID_FROM_EXPORT':
        const updatedReadyForExport = state.readyForExport.filter(
          (item: string) => item !== action.payload
        );
        return { ...state, readyForExport: updatedReadyForExport };
    default:
      return state;
  }
};

// Custom provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};