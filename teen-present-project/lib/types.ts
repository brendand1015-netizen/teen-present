export type SubmissionSection = "general" | "portledge";
export type SubmissionStatus = "pending" | "approved" | "rejected";

export type Submission = {
  id: string;
  image_url: string;
  reflection: string;
  name: string | null;
  section: SubmissionSection;
  status: SubmissionStatus;
  created_at: string;
};

export type CuratedPhotoReflection = {
  id: string;
  photo: string;
  alt: string;
  title: string;
  date: string;
  reflection: string;
};

export type CuratedContributor = {
  id: string;
  name: string;
  items: CuratedPhotoReflection[];
};
