import type { FaqItem } from '@/types';

const DEFAULT_FAQS = [
  {
    question: 'Do I need to be based in Karachi?',
    answer: 'For on-site roles, yes. You’ll need to be based in Karachi and work from our office. Remote roles depend on the position.',
  },
  {
    question: 'Do you hire remotely?',
    answer: 'Yes. We hire both remote and on-site depending on the role.',
  },
  {
    question: 'Do you hire fresh graduates?',
    answer: 'Yes. Some of our strongest performers started as fresh graduates. If you have the skills, curiosity, and drive to improve, you can grow quickly here.',
  },
  {
    question: 'Do I need previous agency experience?',
    answer: 'No. Agency experience helps, but we care more about your ability to do great work, solve problems, and deliver results.',
  },
  {
    question: 'My role isn’t listed. Can I still apply?',
    answer: 'Yes. Select the “Don’t see your role?” option and tell us why you’d be a great fit. If there’s a match, we’ll reach out.',
  },
  {
    question: 'Do I need a portfolio to apply?',
    answer: 'Yes. Your portfolio helps us understand your skills, creativity, and the quality of your work.',
  },
  {
    question: 'How long does the hiring process take?',
    answer: 'We move fast. You’ll get a clear answer within one week of applying.',
  },
  {
    question: 'Will I hear back if I’m rejected?',
    answer: 'Yes. Every application is reviewed by a real person, not AI. You’ll hear back either way.',
  },
  {
    question: 'Is there a test task?',
    answer: 'If your role requires a test task, it will be paid. The task depends on the position and helps us understand how you approach real work.',
  },
  {
    question: 'Can I apply if I don’t meet every requirement?',
    answer: 'Yes. If you believe you can do the work, we’d still like to hear from you. Show us what you can do.',
  },
  {
    question: 'What happens after I apply?',
    answer: 'We review your application and work. If it stands out, we’ll reach out for the next step. You’ll hear back either way.',
  },
];

interface FaqSectionProps {
  items?: FaqItem[];
}

export default function FaqSection({ items }: FaqSectionProps) {
  const displayFaqs = items && items.length > 0
    ? items.filter(i => i.isVisible).map(i => ({ question: i.question, answer: i.answer }))
    : DEFAULT_FAQS;
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="label">Before you apply</span>
          <h2>
            Quick <em>answers.</em>
          </h2>
        </div>
        <div className="faq reveal">
          {displayFaqs.map((faq, index) => (
            <details key={index} className="fq">
              <summary>
                {faq.question}
                <span className="fqi" aria-hidden="true"></span>
              </summary>
              <div className="fqa">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
