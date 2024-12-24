export const handleSkillChange = (value, formData, setFormData) => {
  if (value && !formData.skill.includes(value)) {
    setFormData((prevState) => ({
      ...prevState,
      skill: [...prevState.skill, value],
    }));
  }
};

export const removeSkill = (skills, setFormData, skillToRemove) => {
  const newSkills = skills.filter((skill) => skill !== skillToRemove);
  setFormData((prevState) => ({
    ...prevState,
    skill: newSkills,
  }));
};
