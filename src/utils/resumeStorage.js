/**
 * LocalStorage multi-resume manager utility
 */

const STORAGE_KEY = 'ats_architect_resumes_db';
const LEGACY_STORAGE_KEY = 'ats_architect_resumes';

export function getAllResumes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) {
      // Check if legacy single resume exists
      const legacy = localStorage.getItem('resumeData');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const starter = {
          id: 'resume-1',
          title: parsed.personalInfo?.fullName ? `${parsed.personalInfo.fullName}'s Resume` : 'Untitled Resume',
          updatedAt: new Date().toISOString(),
          data: parsed,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify([starter]));
        return [starter];
      }
      return [];
    }
    return JSON.parse(raw);
  } catch (_e) {
    return [];
  }
}

export function saveResume(resume) {
  try {
    const list = getAllResumes();
    const id = resume.id || `resume-${Date.now()}`;
    const title = resume.title || (resume.personalInfo?.fullName ? `${resume.personalInfo.fullName}'s Resume` : 'Untitled Resume');
    const updatedItem = {
      id,
      title,
      updatedAt: new Date().toISOString(),
      data: { ...resume, id, title },
    };

    const existingIndex = list.findIndex((r) => r.id === id);
    if (existingIndex >= 0) {
      list[existingIndex] = updatedItem;
    } else {
      list.unshift(updatedItem);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(list));
    localStorage.setItem('resumeData', JSON.stringify(updatedItem.data));
    return updatedItem;
  } catch (e) {
    console.error('Data persistence failed:', e);
    alert('Warning: Your browser storage is full. We could not save your recent changes. Please free up space to avoid data loss.');
    throw e;
  }
}

export function deleteResume(id) {
  try {
    const list = getAllResumes().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch (_e) {
    return [];
  }
}

export function duplicateResume(id) {
  try {
    const list = getAllResumes();
    const target = list.find((r) => r.id === id);
    if (!target) return list;

    const newId = `resume-${Date.now()}`;
    const copy = {
      id: newId,
      title: `${target.title} (Copy)`,
      updatedAt: new Date().toISOString(),
      data: {
        ...target.data,
        id: newId,
        title: `${target.title} (Copy)`,
      },
    };
    list.unshift(copy);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch (_e) {
    return [];
  }
}
