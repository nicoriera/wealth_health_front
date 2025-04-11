import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store"; // Import RootState type

// Define a type for the employee data we will store
// Adjust this based on the final structure after formatting/saving
export interface Employee {
  id: string; // Add an ID for list management
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Storing as string after formatting
  startDate: string; // Storing as string after formatting
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

// Define the initial state using that type
interface EmployeesState {
  employees: Employee[];
}

// --- Sample Data ---
const sampleEmployees: Employee[] = [
  {
    id: "d8e7f8a0-9b1c-4d5e-8f9a-0b1c2d3e4f5a",
    firstName: "Tony",
    lastName: "Stark",
    dateOfBirth: "05/29/1970",
    startDate: "10/25/2008",
    street: "10880 Malibu Point",
    city: "Malibu",
    state: "CA",
    zipCode: "90265",
    department: "Engineering",
  },
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    firstName: "Natasha",
    lastName: "Romanoff",
    dateOfBirth: "11/22/1984",
    startDate: "04/20/2010",
    street: "1 Avengers Tower",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    department: "Legal",
  },
  {
    id: "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
    firstName: "Steve",
    lastName: "Rogers",
    dateOfBirth: "07/04/1918",
    startDate: "07/19/2011",
    street: "569 Leaman Place",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11201",
    department: "Sales",
  },
];
// --- End Sample Data ---

const initialState: EmployeesState = {
  employees: sampleEmployees, // Use sample data as initial state
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      // It doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.employees.push(action.payload);
    },
    // We could add other reducers here (e.g., loadEmployees, deleteEmployee)
  },
});

// Action creators are generated for each case reducer function
export const { addEmployee } = employeeSlice.actions;

// Selector to get the list of employees from the state
export const selectEmployees = (state: RootState) => state.employees.employees;

export default employeeSlice.reducer;
