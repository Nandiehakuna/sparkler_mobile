import * as Yup from "yup";

// Define the shape of form values for type safety
export interface FormValues {
  name: string;
  bio?: string;
  role?: "Frontend" | "Backend" | "Fullstack";
  stage?: "Learning" | "Developing Projects" | "Expert";
  languages?: string;
  projectDescription?: string;
  projectLink?: string;
  partners?: string;
  lookingFor?: string;
  contactDetails?: string;
  youtube?: string;
  tiktok?: string;
  instagram?: string;
  customLink?: string;
}

// Common reusable validation rules
const urlValidation = Yup.string().url("Enter a valid URL").nullable();

const maxLength = (limit: number, label: string) =>Yup.string() .max(limit, `${label} cannot exceed ${limit} characters`).nullable();

// Field-specific validations
const nameValidation = Yup.string().required("Name is required") .min(2, "Name must be at least 2 characters").label("Name");

const bioValidation = maxLength(500, "Bio");

const roleValidation = Yup.string().oneOf(["Frontend", "Backend", "Fullstack"], "Role must be Frontend, Backend, or Fullstack").nullable();

const stageValidation = Yup.string().oneOf( ["Learning", "Developing Projects", "Expert"],"Stage must be Learning, Developing Projects, or Expert") .nullable();

const contactDetailsValidation = Yup.string().test( "is-valid-contact", "Enter a valid email or phone number", (value) => !value ||/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||/^[+]?[0-9]{7,15}$/.test(value));

// Combined validation schema
export const validationSchema = Yup.object<FormValues>({
  name: nameValidation,
  bio: bioValidation,
  role: roleValidation,
  stage: stageValidation,
  projectDescription: maxLength(1000, "Project description"),
  projectLink: urlValidation,
  partners: maxLength(300, "Partners information"),
  lookingFor: maxLength(300, "Looking For section"),
  contactDetails: contactDetailsValidation,
  youtube: urlValidation,
  tiktok: urlValidation,
  instagram: urlValidation,
  customLink: urlValidation,
  languages: Yup.string().matches( /^[a-zA-Z\s,]*$/,"Languages should only contain letters, spaces, and commas").nullable(),
});
