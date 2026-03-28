'use client'
import Link from 'next/link'
import BottomNav from './BottomNav'
import { PROGRAM } from '@/lib/program-data'

interface Props {
  user: { email?: string; id?: string } | null
  profile: { current_day: number; streak: number; is_unlocked: boolean } | null
  completedLessons: number[]
}

export default function HomeClient({ user, profile, completedLessons }: Props) {
  const currentLesson = profile?.current_day || 1
  const allLessons = PROGRAM.flatMap(p => p.lessons)
  const today = allLessons.find(l => l.id === currentLesson) || allLessons[0]
  const completedCount = completedLessons.length
  const isNew = completedCount === 0

  return (
    <div className="app-shell">
      <nav className="navbar">
        <span className="navbar-logo">{"It's Just"} <span>Adrenaline</span></span>
        <div className="navbar-actions">
          <Link href="/panic" className="icon-btn" title="The Float">🌊</Link>
          <form action="/auth/signout" method="POST">
            <button className="icon-btn" title="Sign out">↩</button>
          </form>
        </div>
      </nav>

      <div className="page-content fade-up">

        <div className="home-welcome">
          <div className="home-welcome-tag">Welcome</div>
          <h1 className="home-welcome-headline">Hey — you made it.</h1>

          <p className="home-welcome-opener">
            You found this place the same way most people do. You have tried
            everything. Supplements. Therapy. Exercise. Meditation. Breathing
            techniques. Grounding exercises. CBT. EMDR. The list goes on.
            Every coping mechanism you could find. Some helped a little.
            None of them fixed it.
          </p>

          <p className="home-welcome-opener">
            If you are anything like most people who end up here, you have a
            bookshelf full of self-help books and half-filled workbooks. A vitamin
            drawer stacked with supplements you found mentioned on some forum as
            the anxiety cure. You have highlighted passages, downloaded apps,
            tried protocols, booked appointments. You have put in the work.
          </p>

          <p className="home-welcome-opener">
            And yet here you are. Still searching.
          </p>

          <div className="home-welcome-divider" />

          <p className="home-welcome-truth">
            Here is what nobody has told you clearly: those things were never
            going to fix it. Not because they are useless — some are genuinely
            helpful — but because they are all built on the wrong idea about
            what anxiety actually is.
          </p>

          <p className="home-welcome-truth">
            Anxiety is not complex. It is not a deep psychological disorder
            requiring years of careful management. It does not mean something
            is fundamentally wrong with you. But you think it is complex,
            because it feels complex — because the fear is overwhelming and
            the medical language is intimidating and the self-help industry
            has every incentive to keep you searching.
          </p>

          <p className="home-welcome-truth">
            So you keep looking for the missing piece. The one insight that
            finally makes it click. And sometimes something works — for a week,
            a month — and then fades. And you are back at the same spot,
            wondering what you are doing wrong.
          </p>

          <p className="home-welcome-truth">
            You are not doing anything wrong. You have just been solving
            the wrong problem.
          </p>

          <div className="home-welcome-divider" />

          <p className="home-welcome-truth">
            What you will learn in this programme is different. Not another
            coping strategy. Not a new technique to layer on top of everything
            else you are already doing. The actual truth about what is happening
            in your body — simple, physiological, demystified — and why, once
            you genuinely understand it, the fear begins to dissolve on its own.
          </p>

          <p className="home-welcome-truth">
            Dr. Claire Weekes understood this decades ago. A physician and
            researcher who had experienced severe anxiety herself, she spent
            her life explaining what it actually was — and what it was not.
            She called her method floating. Not fighting the feeling, not
            managing it, not distracting yourself from it — floating through it.
            Letting it be there. Stopping being afraid of it. Because once you
            truly understand what anxiety is, there is nothing left to be afraid of.
          </p>

          <p className="home-welcome-truth">
            A sensitised nervous system misfiring. That is all this is.
            Harmless. Temporary. And entirely reversible — not through
            willpower or management, but through understanding.
          </p>

          <p className="home-welcome-truth">
            Thousands of people have recovered using nothing more than this.
            No special supplements. No years of therapy. Just the truth,
            clearly understood, genuinely believed.
          </p>

          <div className="home-welcome-closing">
            You can too. This is the way.
          </div>

          <div className="home-welcome-sign">— {"It's Just Adrenaline"}</div>
        </div>

        {/* Programme */}
        <div className="section-header">
          {isNew ? 'Start here' : 'Continue your programme'}
        </div>
        <Link href={`/lesson/${today.id}`} className="today-card">
          <div className="today-badge">
            📖 Lesson {currentLesson} of {allLessons.length}
            {completedCount > 0 && ` · ${completedCount} done`}
          </div>
          <div className="today-body">
            <div className="today-arc">{today.lesson.part}</div>
            <div className="today-title">{today.title}</div>
            <div className="today-excerpt">{today.lesson.intro}</div>
          </div>
          <div className="today-cta">{isNew ? 'Begin →' : 'Continue →'}</div>
        </Link>

        {/* The Float */}
        <Link href="/panic" className="home-pocket-strip">
          <div className="home-pocket-left">
            <span className="home-pocket-icon">🌊</span>
            <div>
              <div className="home-pocket-title">Feeling it right now?</div>
              <div className="home-pocket-sub">Open The Float</div>
            </div>
          </div>
          <span>→</span>
        </Link>

        {/* Track record */}
        <div className="home-record">
          <div className="home-record-stat">100%</div>
          <div className="home-record-text">
            Your survival rate. Every panic attack you have ever had ended.
            Every catastrophe anxiety predicted never arrived. Every single time.
            That is your evidence. The lie has never once told the truth.
          </div>
        </div>

      </div>

      <BottomNav active="home" />
    </div>
  )
}
