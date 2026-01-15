import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tech: string[];
  demo: string;
  code: string;
  image?: string; // Optional as user didn't specify it, but UI uses it
}

export const getProjects = async (): Promise<ProjectData[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'projects'));
    const projects: ProjectData[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        description: data.desc || data.description || '',
        tech: Array.isArray(data.technologies) ? data.technologies : (data.technologies?.split(',') || []),
        demo: data.demo || data.demoLink || '',
        code: data.code || data.codeLink || '',
        image: data.image || '/images/placeholder.png', // Fallback image
      };
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
