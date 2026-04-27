export const getStats = () => {
  return {
    researchReports: parseInt(localStorage.getItem("researchReports")) || 0,
    indexedDocs: parseInt(localStorage.getItem("indexedDocs")) || 0,
  };
};

export const incrementResearchReports = () => {
  const current = parseInt(localStorage.getItem("researchReports")) || 0;
  localStorage.setItem("researchReports", current + 1);
};

export const incrementIndexedDocs = () => {
  const current = parseInt(localStorage.getItem("indexedDocs")) || 0;
  localStorage.setItem("indexedDocs", current + 1);
};