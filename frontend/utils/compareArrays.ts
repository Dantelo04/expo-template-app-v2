export const compareArrays = (array1: string[], array2: string[]) => {
  return (
    array1.length === array2.length &&
    array1.every((c) => array2.includes(c)) &&
    array2.every((c) => array1.includes(c))
  );
};

export const getDifferences = (array1: any[], array2: any[]) => {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    console.log("Invalid input to getDifferences:", { array1, array2 });
    return {
      differences1: [],
      differences2: [],
    };
  }
  
  const normalize = (obj: any) => {
    if (!obj || typeof obj !== 'object') {
      return JSON.stringify(null);
    }
    
    const normalized = { ...obj };

    delete normalized.updatedAt;
    
    const allKeys = ['id', 'amount', 'title', 'type', 'currency', 'date', 'createdAt', 'userId'];
    allKeys.forEach(key => {
      if (!(key in normalized)) {
        normalized[key] = null;
      }
    });
    return JSON.stringify(normalized, Object.keys(normalized).sort());
  };
  
  try {
    const set2 = new Set(array2.map((item) => normalize(item)));
    const set1 = new Set(array1.map((item) => normalize(item)));
    const differences1 = array1.filter((item) => !set2.has(normalize(item))); // records that are in the server but not in the local storage
    const differences2 = array2.filter((item) => !set1.has(normalize(item))); // records that are in the local storage but not in the server

    return {
      differences1,
      differences2,
    };
  } catch (error) {
    console.log("Error in getDifferences:", error);
    return {
      differences1: [],
      differences2: [],
    };
  }
};
