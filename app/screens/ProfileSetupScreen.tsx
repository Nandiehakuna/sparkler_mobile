import React from "react";
import { View, StyleSheet, Button, ScrollView, Text } from "react-native";
import { FormField, Form } from "../components/forms";

import * as Yup from 'yup'

export default () => {
  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };


const validationSchema = Yup.object().shape({
  // Name: Required field
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters").label('Name'),

  // Bio: Optional field but with a character limit
  bio: Yup.string()
    .max(500, "Bio cannot exceed 500 characters")
    .nullable().label("bio"),

  // Role: Optional but limited to certain values
  role: Yup.string()
    .oneOf(["Frontend", "Backend", "Fullstack"], "Role must be Frontend, Backend, or Fullstack")
    .nullable(),

  // Languages: Optional, accepts a comma-separated string
  languages: Yup.string()
    .matches(
      /^[a-zA-Z\s,]*$/,
      "Languages should only contain letters, spaces, and commas"
    )
    .nullable(),

  // Stage: Optional but must match specific values
  stage: Yup.string()
    .oneOf(
      ["Learning", "Developing Projects", "Expert"],
      "Stage must be Learning, Developing Projects, or Expert"
    )
    .nullable(),

  // Project Description: Optional but limited in size
  projectDescription: Yup.string()
    .max(1000, "Project description cannot exceed 1000 characters")
    .nullable(),

  // Project Link: Optional but must be a valid URL
  projectLink: Yup.string()
    .url("Please enter a valid project link URL")
    .nullable(),

  // Partners: Optional
  partners: Yup.string()
    .max(300, "Partners information should not exceed 300 characters")
    .nullable(),

  // Looking For: Optional but limited
  lookingFor: Yup.string()
    .max(300, "Looking For section should not exceed 300 characters")
    .nullable(),

  // Contact Details: Optional but must be a valid email or phone number format
  contactDetails: Yup.string()
    .test(
      "is-valid-contact",
      "Enter a valid email or phone number",
      (value) =>
        !value || // Allow null or empty values
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || // Email pattern
        /^[+]?[0-9]{7,15}$/.test(value) // Phone number pattern
    )
    .nullable(),

  // YouTube Link: Optional but must be a valid URL
  youtube: Yup.string()
    .url("Enter a valid YouTube link")
    .nullable(),

  // TikTok Link: Optional but must be a valid URL
  tiktok: Yup.string()
    .url("Enter a valid TikTok link")
    .nullable(),

  // Instagram Link: Optional but must be a valid URL
  instagram: Yup.string()
    .url("Enter a valid Instagram link")
    .nullable(),

  // Custom Link: Optional but must be a valid URL
  customLink: Yup.string()
    .url("Enter a valid custom link URL")
    .nullable(),
});


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form
        initialValues={{
          name: "",
          bio: "",
          youtube: "",
          tiktok: "",
          instagram: "",
          customLink: "",
          role: "",
          languages: "",
          stage: "",
          projectDescription: "",
          projectLink: "",
          partners: "",
          lookingFor: "",
          contactDetails: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* Name Field */}
        <FormField
          name="name"
          placeholder="Enter your name"
          label="Name"
        />

        {/* Bio Field */}
        <FormField
          name="bio"
          placeholder="Tell us about yourself"
          label="Bio"
          multiline
          numberOfLines={4}
        />

        {/* Developer Role */}
        <FormField
          name="role"
          placeholder="Frontend, Backend, or Fullstack?"
          label="Role"
        />

        {/* Languages */}
        <FormField
          name="languages"
          placeholder="e.g., Java, Python, React"
          label="Languages Familiar With"
        />

        {/* Stage */}
        <FormField
          name="stage"
          placeholder="Learning, Developing Projects, or Expert"
          label="Current Stage"
        />

        {/* Project Description */}
        <FormField
          name="projectDescription"
          placeholder="Describe your project if working on one"
          label="Project Description"
          multiline
          numberOfLines={4}
        />

        {/* Project Link */}
        <FormField
          name="projectLink"
          placeholder="https://yourprojectlink.com"
          label="Project Link"
          keyboardType="url"
        />

        {/* Project Partners */}
        <FormField
          name="partners"
          placeholder="Mention partners or state you are looking for one"
          label="Project Partners"
        />

        {/* Looking for a Partner */}
        <FormField
          name="lookingFor"
          placeholder="What are you looking for in a project partner?"
          label="Looking For in a Partner"
        />

        {/* Contact Details */}
        <FormField
          name="contactDetails"
          placeholder="Email, phone, or social link"
          label="Contact Details"
          keyboardType="email-address"
        />

        {/* Links Section */}
        <Text style={styles.sectionHeader}>Social Links</Text>

        <FormField
          name="youtube"
          placeholder="https://youtube.com/yourchannel"
          label="YouTube"
          keyboardType="url"
        />

        <FormField
          name="tiktok"
          placeholder="https://tiktok.com/@yourhandle"
          label="TikTok"
          keyboardType="url"
        />

        <FormField
          name="instagram"
          placeholder="https://instagram.com/yourhandle"
          label="Instagram"
          keyboardType="url"
        />

        <FormField
          name="customLink"
          placeholder="https://yourwebsite.com"
          label="Custom Link"
          keyboardType="url"
        />

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={() => console.log("Form submitted")} />
        </View>
      </Form>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#000", // Dark background
    flexGrow: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
});
