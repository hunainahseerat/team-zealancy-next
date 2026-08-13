import type { TeamMember } from '@/types';

interface LeaderItem {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  bgClass?: string;
  instagramUrl: string;
  linkedinUrl: string;
}

const BG_CLASSES = ['g-royal', 'g-violet', 'g-dusk', 'g-plum'];

const DEFAULT_LEADERS: LeaderItem[] = [
  {
    name: 'Afraz Chaudry',
    role: 'Founder & CEO',
    avatarUrl: '/assets/team/leader-01.jpg',
    bgClass: 'g-royal',
    bio: 'A founder on paper, but more of a mentor to the team. Afraz started as a freelance video editor at 19 and built Zealancy from scratch. Today he\'s focused on building a team where people take ownership, grow fast, and become better at their craft.',
    instagramUrl: 'https://www.instagram.com/teamzealancy/',
    linkedinUrl: 'https://www.linkedin.com/company/zealancy',
  },
  {
    name: 'Shehroz Khan',
    role: 'Head of Fulfillment',
    avatarUrl: '/assets/team/leader-02.jpg',
    bgClass: 'g-violet',
    bio: 'The person who makes sure things actually happen. Shehroz left film school to go all-in on Zealancy and brought experience managing large teams and coaching creatives. From solving problems to building systems, he keeps the machine moving.',
    instagramUrl: 'https://www.instagram.com/teamzealancy/',
    linkedinUrl: 'https://www.linkedin.com/company/zealancy',
  },
  {
    name: 'Aribah Siddiqui',
    role: 'Head of Growth',
    avatarUrl: '/assets/team/Leader-04.jpg',
    bgClass: 'g-dusk',
    bio: 'Aribah is the person behind Zealancy\'s growth engine. She works across marketing, sales, and strategy to bring in the right opportunities and turn creative work into measurable results.',
    instagramUrl: 'https://www.instagram.com/teamzealancy/',
    linkedinUrl: 'https://www.linkedin.com/company/zealancy',
  },
  {
    name: 'Kamal Ahmed',
    role: 'Executive Creative Director',
    avatarUrl: '/assets/team/leader-03.jpg',
    bgClass: 'g-plum',
    bio: 'The person behind the quality bar at Zealancy. Kamal leads our creative team, challenges ideas, and pushes everyone to think bigger. He\'s the one making sure good work becomes great work.',
    instagramUrl: 'https://www.instagram.com/teamzealancy/',
    linkedinUrl: 'https://www.linkedin.com/company/zealancy',
  },
];

interface LeadershipProps {
  members?: TeamMember[];
}

export default function Leadership({ members }: LeadershipProps) {
  const displayLeaders: LeaderItem[] = members && members.length > 0
    ? members.filter(m => m.isVisible).map((m, idx) => ({
        name: m.name,
        role: m.role,
        bio: m.bio,
        avatarUrl: m.avatarUrl || DEFAULT_LEADERS[idx % DEFAULT_LEADERS.length].avatarUrl,
        bgClass: m.avatarUrl ? '' : BG_CLASSES[idx % BG_CLASSES.length],
        instagramUrl: m.instagramUrl || 'https://www.instagram.com/teamzealancy/',
        linkedinUrl: m.linkedinUrl || 'https://www.linkedin.com/company/zealancy',
      }))
    : DEFAULT_LEADERS;

  return (
    <section className="section" id="core-leadership">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="label">Core Leadership</span>
          <h2>
            The people behind the <em>work.</em>
          </h2>
        </div>
        <div className="lead-grid">
          {displayLeaders.map((leader, index) => (
            <article key={index} className="lcard reveal">
              <div className={`lph ${leader.bgClass || ''}`}>
                <img
                  src={leader.avatarUrl}
                  alt={`${leader.name} — ${leader.role}`}
                  width={400}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div className="lbody">
                <h3 className="ln">{leader.name}</h3>
                <div className="lr">{leader.role}</div>
                <div className="lsoc">
                  <a
                    href={leader.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${leader.name} on Instagram`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href={leader.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${leader.name} on LinkedIn`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4 0 4.75 2.5 4.75 5.8V21h-4v-5.2c0-1.24-.02-2.84-1.9-2.84-1.9 0-2.2 1.36-2.2 2.75V21h-4z" />
                    </svg>
                  </a>
                </div>
                <p>{leader.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
