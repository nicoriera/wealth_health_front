// import { Link } from "react-router-dom"; // Remove unused import
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react"; // Import useState
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { useDispatch } from "react-redux"; // Import useDispatch
import { addEmployee } from "../features/employees/employeeSlice"; // Import addEmployee action
import { states, departments } from "../lib/data"; // Importer les données pour les selects
import type { AppDispatch } from "../store/store"; // Import AppDispatch type if needed for stricter typing
import Modal from "../components/Modal"; // Import the Modal component
import CustomSelect from "../components/CustomSelect"; // Import CustomSelect
import Layout from "../components/Layout"; // Import Layout

// Define the type for our form data
type EmployeeFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null; // Use Date type
  startDate: Date | null; // Use Date type
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
};

// Format options for CustomSelect
const stateOptions = states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));
const departmentOptions = departments.map((dept) => ({
  value: dept,
  label: dept,
}));

const CreateEmployeePage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const dispatch = useDispatch<AppDispatch>(); // Get dispatch function
  const {
    register,
    handleSubmit,
    control, // Get control from useForm
    formState: { errors },
    reset, // Get reset function from useForm
  } = useForm<EmployeeFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      startDate: null,
      street: "",
      city: "",
      state: "",
      zipCode: "",
      department: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {
    // Format data for saving (including adding an ID)
    const newEmployee = {
      id: uuidv4(), // Generate unique ID
      ...data,
      // Ensure dates are strings and handle null case gracefully
      dateOfBirth: data.dateOfBirth
        ? data.dateOfBirth.toLocaleDateString("en-US")
        : "N/A",
      startDate: data.startDate
        ? data.startDate.toLocaleDateString("en-US")
        : "N/A",
    };

    console.log("Dispatching addEmployee with:", newEmployee);
    dispatch(addEmployee(newEmployee));

    setIsModalOpen(true); // Open the modal instead of alert
    reset(); // Reset form immediately (or could reset on modal close)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {t("createEmployee.title")}
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-3 mb-5">
            {t("createEmployee.sections.personalInformation")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1">
                {t("createEmployee.fields.firstName")}
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: t("createEmployee.validation.firstNameRequired"),
                })}
                className={`mt-0 block w-full px-3 py-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-indigo-300 focus:border-indigo-500"
                } focus:ring-opacity-50 sm:text-sm`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1">
                {t("createEmployee.fields.lastName")}
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: t("createEmployee.validation.lastNameRequired"),
                })}
                className={`mt-0 block w-full px-3 py-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-indigo-300 focus:border-indigo-500"
                } focus:ring-opacity-50 sm:text-sm`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Date of Birth - Using Controller */}
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1">
                {t("createEmployee.fields.dateOfBirth")}
              </label>
              <Controller
                control={control}
                name="dateOfBirth"
                rules={{
                  required: t("createEmployee.validation.dateOfBirthRequired"),
                }}
                render={({ field }) => (
                  <DatePicker
                    id="dateOfBirth"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    selected={field.value}
                    placeholderText="MM/DD/YYYY"
                    className={`mt-0 block w-full px-3 py-2 border ${
                      errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      errors.dateOfBirth
                        ? "focus:ring-red-500 focus:border-red-500"
                        : "focus:ring-indigo-300 focus:border-indigo-500"
                    } focus:ring-opacity-50 sm:text-sm`}
                    wrapperClassName="w-full"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                  />
                )}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            {/* Start Date - Using Controller */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1">
                {t("createEmployee.fields.startDate")}
              </label>
              <Controller
                control={control}
                name="startDate"
                rules={{
                  required: t("createEmployee.validation.startDateRequired"),
                }}
                render={({ field }) => (
                  <DatePicker
                    id="startDate"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    selected={field.value}
                    placeholderText="MM/DD/YYYY"
                    className={`mt-0 block w-full px-3 py-2 border ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      errors.startDate
                        ? "focus:ring-red-500 focus:border-red-500"
                        : "focus:ring-indigo-300 focus:border-indigo-500"
                    } focus:ring-opacity-50 sm:text-sm`}
                    wrapperClassName="w-full"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                  />
                )}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Address Section */}
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-3 mb-5">
            {t("createEmployee.sections.address")}
          </h2>
          <fieldset className="space-y-4">
            {/* Street */}
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700 mb-1">
                {t("createEmployee.fields.street")}
              </label>
              <input
                type="text"
                id="street"
                {...register("street", {
                  required: t("createEmployee.validation.streetRequired"),
                })}
                className={`mt-0 block w-full px-3 py-2 border ${
                  errors.street ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.street
                    ? "focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-indigo-300 focus:border-indigo-500"
                } focus:ring-opacity-50 sm:text-sm`}
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  {t("createEmployee.fields.city")}
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", {
                    required: t("createEmployee.validation.cityRequired"),
                  })}
                  className={`mt-0 block w-full px-3 py-2 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.city
                      ? "focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-indigo-300 focus:border-indigo-500"
                  } focus:ring-opacity-50 sm:text-sm`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* State - Using CustomSelect and Controller */}
              <div>
                <Controller
                  name="state"
                  control={control}
                  rules={{
                    required: t("createEmployee.validation.stateRequired"),
                  }}
                  render={({ field }) => (
                    <CustomSelect
                      id="state"
                      label={t("createEmployee.fields.state")}
                      options={stateOptions}
                      {...field}
                      placeholder={t("createEmployee.fields.state")}
                      error={errors.state?.message}
                    />
                  )}
                />
              </div>

              {/* Zip Code */}
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  {t("createEmployee.fields.zipCode")}
                </label>
                <input
                  type="text"
                  id="zipCode"
                  {...register("zipCode", {
                    required: t("createEmployee.validation.zipCodeRequired"),
                  })}
                  className={`mt-0 block w-full px-3 py-2 border ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.zipCode
                      ? "focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-indigo-300 focus:border-indigo-500"
                  } focus:ring-opacity-50 sm:text-sm`}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Department Section */}
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-3 mb-5">
            {t("createEmployee.sections.department")}
          </h2>
          <div>
            <Controller
              name="department"
              control={control}
              rules={{
                required: t("createEmployee.validation.departmentRequired"),
              }}
              render={({ field }) => (
                <CustomSelect
                  id="department"
                  label={t("createEmployee.fields.department")}
                  options={departmentOptions}
                  {...field}
                  placeholder={t("createEmployee.fields.department")}
                  error={errors.department?.message}
                />
              )}
            />
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
                {t("createEmployee.buttons.save")}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={t("createEmployee.modal.title")}>
        <p>{t("createEmployee.modal.message")}</p>
        {/* You could add a button inside the modal to navigate or just rely on the close button/overlay */}
      </Modal>
    </Layout>
  );
};

export default CreateEmployeePage;
