import { IconType } from "react-icons";
import { 
  FaJava, 
  FaDocker, 
  FaAws, 
  FaNetworkWired
} from "react-icons/fa6";
import {
  SiSpringboot,
  SiHibernate,
  SiMysql,
  SiPostman,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiRedis,
  SiApachekafka,
  SiRabbitmq,
  SiKubernetes,
  SiGithubactions,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiSqlalchemy,
  SiPydantic,
  SiSwagger,
} from "react-icons/si";

export interface TechItem {
  name: string;
  icon?: IconType;
  iconSrc?: string;
  isCore?: boolean;
}

export interface TechCategory {
  label: string;
  badge?: string;
  subtitle?: string;
  items: TechItem[];
}

export interface TimelineEntry {
  period: string;
  description: string;
}

export const techCategories: TechCategory[] = [
  {
    label: "Backend",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Hibernate", icon: SiHibernate },
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "SQLAlchemy", icon: SiSqlalchemy },
      { name: "Pydantic", icon: SiPydantic },
    ],
  },
  {
    label: "Data & Infra",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Docker", icon: FaDocker },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Postman", icon: SiPostman },
      { name: "Swagger", icon: SiSwagger },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
      { name: "Antigravity", iconSrc: "/antigravity-icon.svg" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { name: "System Design", icon: FaNetworkWired },
      { name: "Redis", icon: SiRedis },
      { name: "Kafka", icon: SiApachekafka },
      { name: "RabbitMQ", icon: SiRabbitmq },
      { name: "AWS", icon: FaAws },
      { name: "CI/CD", icon: SiGithubactions },
      { name: "Kubernetes", icon: SiKubernetes },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "2026 - Present",
    description: "Studying computer science from first principles—from light through undersea cables all the way up to networking protocols, backend architecture, and distributed systems."
  },
  {
    period: "2025 - 2026",
    description: "Expanded from Java (<a href=\"#project-springmart\" class=\"text-warm-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-black/20 dark:decoration-white/20 hover:decoration-emerald-400 dark:hover:decoration-emerald-400 underline-offset-4 font-normal\">SpringMart</a>) to Python & FastAPI (<a href=\"#project-crate\" class=\"text-warm-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-black/20 dark:decoration-white/20 hover:decoration-emerald-400 dark:hover:decoration-emerald-400 underline-offset-4 font-normal\">Crate</a>). Studied system design & DevOps fundamentals. Used AI agents to ship 8 apps (6 deployed)."
  },
  {
    period: "2024 - 2025",
    description: "Built <a href=\"#project-wrkout\" class=\"text-warm-200 hover:text-emerald-400 transition-colors duration-200 underline decoration-black/20 dark:decoration-white/20 hover:decoration-emerald-400 dark:hover:decoration-emerald-400 underline-offset-4 font-normal\">wrkout</a> to track progressive overload—used it daily to lose 30 kg (66 lbs) in 1 year."
  },
  {
    period: "2021 - 2025",
    description: "Graduated with a B.Tech in CSE (8.3 CGPA). Applied the 80/20 principle to cut exam study time by over 50%, mastered core DSA patterns in Java, and solved 130+ LeetCode problems."
  }
];

