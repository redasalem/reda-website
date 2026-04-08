import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { getFirebaseApp } from "../config/firebase";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tech: string[];
  demo: string;
  code: string;
  image?: string; // Optional as user didn't specify it, but UI uses it
}

const db = getFirestore(getFirebaseApp());

function normalizeTechStack(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item).trim());
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export const getProjects = async (): Promise<ProjectData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects: ProjectData[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        description: data.desc || data.description || "",
        tech: normalizeTechStack(data.technologies),
        demo: data.demo || data.demoLink || "",
        code: data.code || data.codeLink || "",
        image: data.image || "/images/placeholder.png",
      };
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
