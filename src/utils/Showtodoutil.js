export const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  
  export const getSkillBackground = (index) => {
    const colors = [
      "bg-[#E7FFF5] text-[#009E20]",
      "bg-[#EFF8FF] text-[#175CD3]",
      "bg-[#F9F5FF] text-[#C64143]",
    ];
    return colors[index % colors.length];
  };
  