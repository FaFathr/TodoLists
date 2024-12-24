
export const validateFormData = (formData) => {
    const errors = {};
  
    if (!formData.name.firstName) {
      errors.firstName = "First name is required";
    }
  
    if (!formData.name.lastName) {
      errors.lastName = "Last name is required";
    }
  
    if (!formData.role) {
      errors.role = "Role is required";
    }
  
    if (!formData.birthDate) {
      errors.birthDate = "Birth date is required";
    }
  
    if (formData.skill.length === 0) {
      errors.skill = "At least one skill is required";
    }
  
    return errors;
  };
  