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

const initialState: EmployeesState = {
  employees: [], // Start with an empty list
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
