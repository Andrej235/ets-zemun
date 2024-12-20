export default interface ClassSchema {
  /** * Description of the class */ description: string;
  /** * Name of the class */ name: string;
  skillsEarned?: SkillsEarned[];
}
interface SkillsEarned {
  /** * Description of the skill */ description: string;
  /** * Name of the skill */ name: string;
}
