export interface Course {
  title: string;
  curriculum: string[];
  placement: string[];
  catagory: string;
}

export interface WhyChooseUsCardDetails {
  title: string;
  subtitle: string;
  detail: string;
  clipArt: string;
  backGroundColor: string;
  id: string;
}

export interface WhyChooseUs {
  cardDetails: WhyChooseUsCardDetails;
  flipedCard: string;
  setFlipedCard: React.Dispatch<React.SetStateAction<string>>;
}
export interface Faqs {
  question: string;
  answer: string;
}

export interface Instructor {
  name: string;
  designation: string;
  college: string;
  instagram: string;
  linkedin: string;
  profilePicture: string;
}

export interface CourseDetails {
  heading: string;
  title: string;
  topics: string[];
}

export interface OurValuesCardDetails {
  title: string;
  description: string;
  image?: string;
}

export interface UserDetails {
  enrolled: boolean;
  phoneNumber: number | null;
  name: string;
  progress: number;
  avatar: number | null;
}

export enum EventType {
  COURSE_SYLLABUS_VIEW = "COURSE_SYLLABUS_VIEW",
  LOCK_CLICK = "LOCK_BUTTON_CLICK",
  TALK_TO_CLICK = "TALK_TO_CLICK",
  NOT_SURE_CLICK = "NOT_SURE_CLICK",
  REQUEST_A_CALLBACK_CLICK = "REQUEST_A_CALLBACK_CLICK",
  FORM_HOME = "FORM_HOME",
}

export enum FAQType {
  Program = "Program",
  Curriculum = "Curriculum",
  Teaching = "Teaching",
  EntranceTest = "Entrance Test",
  Mentors = "Mentors",
  PlacementSupport = "Placement Support",
  EntranceFees = "Entrance Fees",
}

export interface FAQItem {
  question: string;
  startingParagraphs: string[];
  pointerTitle: string;
  pointers: string[];
  endingParagraphs: string[];
  endingLine: string;
}

// Interface for the FAQ schema
export interface FAQ {
  type: FAQType;
  faq: FAQItem[];
}

export interface ProgramCard {
  cardTitle: string;
  desc: string;
  bulletPoints: string[];
  highlightedPoints: {
    point: string;
    icon: string;
  }[];
}
export interface Program {
  title: string;
  sectionBackground: string;
  cards: ProgramCard[];
  action: string;
}

export interface DashboardAvailableCoursesData {
  courseName: string;
  courseDesc: string;
  coursePoints: {
    point: string;
    icon: string;
  }[];
}

export interface BlogCarausalData {
  _id: string;
  title: string;
  subtitle: string;
  tag: string;
  author: string;
  time: string;
  image: string;
}

export interface BlogCard {
  _id: string;
  title: string;
  subtitle: string;
  cardDescritpion: string;
  tag: string;
  author: string;
  time: string;
  image: string;
}
