export interface Lesson {
  part: string
  intro: string
  body: string
  task: { icon: string; title: string; body: string }
  journal: string
  mantra: string
}

export interface ProgramLesson {
  id: number
  title: string
  free: boolean
  lesson: Lesson
}

export interface Part {
  id: number
  title: string
  tag: string
  desc: string
  lessons: ProgramLesson[]
}

export const PROGRAM: Part[] = [
  {
    id: 1,
    title: 'The Truth',
    tag: 'Part 1 · The Truth',
    desc: 'The only thing that gives anxiety its power is mystery. Every lesson here removes some of that mystery. When you truly understand what is happening — not intellectually, but in your bones — the fear of the feeling begins to dissolve on its own.',
    lessons: [
      {
        id: 1,
        title: "It's Just Adrenaline",
        free: true,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "There is one word that explains everything you feel during anxiety. One word. Not a complex disorder, not a broken mind, not a chemical imbalance requiring years of careful management. One word. Once you truly understand it, everything changes.",
          body: `<p>The racing heart. The breathlessness. The electric surge through your body. The overwhelming certainty that something terrible is about to happen.</p>
<p>You have called it anxiety. A panic attack. Fear. Something wrong with you. You may have been told it is a complex disorder — something requiring careful management, possibly medication, years of therapy. Something you might have to live with forever.</p>
<p>That story is wrong. And it has made everything worse.</p>
<p>Here is the embarrassingly simple truth: <strong>what you feel is adrenaline.</strong></p>
<p>One chemical. Released by one gland — the adrenal gland, sitting above your kidneys — when your brain perceives a threat. Adrenaline speeds up your heart, opens your airways, floods your muscles with blood, sharpens your senses, and creates the overwhelming certainty of danger.</p>
<p>Every single symptom of every panic attack you have ever had is adrenaline doing exactly what it was designed to do. There is nothing else happening. No mysterious disorder. No broken mechanism. One chemical, one misfiring smoke detector, one false alarm.</p>
<p>Here is the second part — the part that should stop you in your tracks: <strong>this is the exact same feeling as excitement. The exact same chemical. The exact same physical sensations. Identical.</strong></p>
<p>Think about the last time you did something physically intense — a hard run, a heavy set at the gym, a sprint to catch a train. Your heart was hammering. Your breathing was rapid and shallow. Your chest was tight. Your legs were shaking. You were sweating. You felt a surge of something electric moving through your body.</p>
<p>That was adrenaline. The same adrenaline. Doing the same job.</p>
<p>Or think about standing at the top of a rollercoaster just before the drop. The stomach lurch. The racing heart. The electric feeling in your chest. The breathlessness. Every cell in your body screaming with sensation.</p>
<p>Or the feeling before you walk into a job interview, step onto a stage, ask someone out, take an important phone call. That tight chest. That dry mouth. That buzzing, electric energy you can feel in your hands.</p>
<p>Or falling in love. The racing heart when they walk into the room. The breathlessness. The heightened senses. The feeling that something enormous is happening.</p>
<p>All of it is adrenaline. All of it is your nervous system activating — doing exactly what it was designed to do. In every single one of those moments, the chemistry is identical to what happens during a panic attack. The same hormone. The same cascade of physical responses. The same racing heart, tight chest, electric body.</p>
<p>The only difference — the <em>only</em> difference — is the story your brain tells about what the feeling means.</p>
<p>In excitement: <em>this is good, this is alive, lean in.</em><br/>In anxiety: <em>danger, something is wrong, escape.</em></p>
<p>Same sensation. Completely different meaning. And here is what that tells you: <strong>the feeling itself is neutral.</strong> It is not inherently dangerous or inherently wonderful. It is adrenaline — energy, activation, the body doing its job. The meaning is assigned by the brain. And the brain can learn to assign a different one.</p>
<p>This is not positive thinking. This is not telling yourself everything is fine when it doesn't feel fine. This is understanding the actual chemistry and letting that understanding change what the feeling means to you.</p>
<p>The sensations are chemically identical. The meaning is everything. And the meaning — this is the whole point — <strong>can change.</strong></p>
<p>Not through years of therapy. Not through medication. Through understanding what the feeling actually is. That is all. That is where recovery begins — not with a technique, not with a programme, but with seeing clearly what you are actually dealing with.</p>
<p>You are not dealing with a disorder. You are dealing with a smoke detector that has become too sensitive. That is a completely different problem. And it has a completely different — and far simpler — solution.</p>`,
          task: { icon: '🎯', title: 'Name it accurately', body: "Every time anxiety shows up today — any level, any form — say this: 'That's adrenaline. The same thing I feel when I'm excited. My body is doing its job.' Don't try to make it go away. Don't try to calm down. Just name it accurately. You are replacing a wrong story with a true one." },
          journal: "Write down what you've been told anxiety is — by doctors, therapists, articles, your own conclusions. Then write what you now understand it to actually be. What is the difference between those two stories? What has the first story cost you?",
          mantra: "It's just adrenaline. The same as excitement. One chemical. One misfiring alarm."
        }
      },
      {
        id: 2,
        title: "What's Actually Happening In Your Body",
        free: true,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "Every symptom of anxiety feels random and terrifying until you know what's causing it. None of it is random. Every single sensation maps directly to a physiological purpose. Understanding this doesn't just reassure — it removes the second layer of fear entirely.",
          body: `<p>When the brain perceives threat — real or imagined — it fires a signal to the adrenal glands: release adrenaline. Within seconds, the body is in full emergency mode. Every system reconfigures for one purpose: survival.</p>
<p>Here is what happens, and why:</p>
<p><strong>Heart racing:</strong> Adrenaline tells the heart to beat faster and harder to pump blood to the large muscles. The pounding you feel is your heart doing its job with unusual efficiency. It is not failing — it is excelling.</p>
<p><strong>Breathlessness and chest tightness:</strong> Breathing quickens to pull in more oxygen. The chest muscles tighten. Paradoxically this can create the feeling of not getting enough air — but your blood oxygen is normal or elevated. You are not suffocating.</p>
<p><strong>Dizziness and derealization:</strong> Fast shallow breathing reduces CO2 in the blood, causing blood vessels to narrow slightly. Reduced flow to the brain's perceptual centres creates the dreamlike, unreal quality. It is breathing chemistry — not madness.</p>
<p><strong>Tingling and numbness:</strong> The same CO2 change affects the extremities first — hands, feet, face, lips. Entirely caused by breathing pattern. Not a stroke. Not neurological damage.</p>
<p><strong>Nausea and stomach symptoms:</strong> Adrenaline shunts blood away from the digestive system toward the muscles. Digestion stops mid-process. The gut's own nervous system reacts directly to stress hormones. Uncomfortable. Not illness.</p>
<p><strong>Trembling and weak legs:</strong> The muscles are flooded with glucose and primed for action. With nowhere to direct the energy — no running, no fighting — the muscles tremble and the legs feel unreliable. They will not give way.</p>
<p><strong>Feeling of impending doom:</strong> This is the amygdala — the brain's threat centre — communicating in its only language: danger. When flooded with adrenaline it sends the maximum alarm signal. The certainty is not evidence. It is the alarm at full volume.</p>
<p><strong>The pattern is always the same:</strong> adrenaline, body prepares for threat, sensations arise, sensations feel alarming, more adrenaline. Every symptom has a direct physiological cause. None of it is random. None of it is dangerous. All of it is temporary.</p>
<div class="weekes-quote">"The symptoms of anxiety are the symptoms of a body doing its job — doing it too hard, for too long, in response to a threat that isn't there. Not illness. Exhaustion."<span class="weekes-attr">— Dr. Claire Weekes</span></div>`,
          task: { icon: '🔍', title: 'Map your symptoms', body: "Write down every symptom you get during anxiety. Next to each one, write what's actually causing it physiologically. Racing heart: adrenaline pumping blood. Dizziness: CO2 and breathing. Nausea: digestion stopping. Do this until you have a cause for every symptom. You are converting mystery into mechanism." },
          journal: "Which symptom frightens you most? Write what you used to think it meant — heart attack, stroke, going mad, losing control. Now write what it actually is. Read both versions. The gap between them is where the second fear lives.",
          mantra: "Every symptom has a cause. None of it is dangerous. All of it is adrenaline doing its job."
        }
      },
      {
        id: 3,
        title: "The Sensitised Nervous System",
        free: true,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "Anxiety doesn't arrive fully formed. It builds — gradually, quietly — until the alarm is firing for almost nothing at all. Understanding exactly how this happens is the moment you stop blaming yourself and start understanding the mechanism.",
          body: `<p>Nobody develops anxiety disorder overnight. It builds gradually — so gradually that most people cannot point to the moment it started. It does not announce itself. It creeps in.</p>
<p>It starts with stress. Not necessarily dramatic stress — though sometimes that too. More often it is the slow accumulation of ordinary pressure: a demanding job, a difficult relationship, financial worry, a period of poor sleep, a health scare, a season of life that simply asked too much for too long. You were not having a breakdown. You were just stressed. Most people would not have even called it anxiety. It was just life being hard.</p>
<p>But underneath the surface, without you noticing, the nervous system was keeping score. Every week of sustained pressure was training it to stay alert. Every difficult period was lowering the threshold — the level of stimulus required to fire the alarm. The nervous system was learning, through sheer repetition, to be ready. To stay on guard. To treat the world as a place that required constant vigilance.</p>
<p>And then one day — maybe you were out at the supermarket, or sitting on the sofa watching television, or driving somewhere completely routine — it happened.</p>
<p>Out of nowhere, your heart started hammering. Your chest tightened. You could not get a proper breath. The world felt strange and unreal. A wave of absolute terror washed through you with no warning and no obvious cause. Your body was screaming that something was catastrophically wrong.</p>
<p><em>Am I dying? Is this a heart attack? Am I going mad? What is happening to me?</em></p>
<p>That moment — that first full panic attack, or that first time the alarm fired hard with no apparent reason — is the turning point. Not because anything new went wrong with your body. But because of what happened next.</p>
<p>You became afraid of your own nervous system.</p>
<p>Understandably, completely reasonably, you looked at what just happened and concluded: <em>something is wrong with me.</em> You went to the doctor. You Googled the symptoms. You started monitoring how you felt. You began bracing for it to happen again. You started avoiding situations where it might occur. You became hypervigilant about every sensation in your body — every flutter, every tight breath, every strange feeling.</p>
<p>And in doing so — with entirely good intentions, doing exactly what any reasonable person would do — you accidentally taught your already-sensitised nervous system the one thing that deepens sensitisation: <strong>that the alarm was right to fire.</strong></p>
<p>The nervous system took your fear and your vigilance as confirmation. <em>This feeling is dangerous. This situation requires monitoring. The alarm was correct. Stay alert. Keep the threshold low.</em></p>
<p>The sensitisation deepened. The alarm began firing for smaller triggers. Then for almost no trigger at all. What started as stress became anxiety disorder — not through any new physical problem, but through the feedback loop between a tired nervous system and a frightened response to it.</p>
<div class="weekes-quote">"A sensitised nervous system is not a sick nervous system. It is a tired one. It has been on alert for so long that it now alerts at almost nothing. It needs rest — not more alarm."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>Here is what matters most: <strong>it was always a bluff.</strong></p>
<p>That first panic attack — the one that changed everything, the one that felt like dying — was a shot of adrenaline. That is all it ever was. A sensitised nervous system that had been running under pressure for months, finally firing the full alarm in a moment of quiet. Not because you were dying. Not because something was wrong with your heart or your mind. Because your nervous system was exhausted and over-alert and your body did what bodies do under those conditions.</p>
<p>The catastrophe never came. It never does. Because there was never a catastrophe to come. There was only adrenaline — the same chemical as excitement, the same chemical that surges when you sprint or fall in love or stand at the edge of something thrilling — misfiring in a body that had forgotten what calm felt like.</p>
<p>You developed a fear of a feeling. That is the whole story. And a fear of a feeling can be unlearned — not through years of management, but through understanding what the feeling actually is.</p>
<p>The sensitised nervous system is not broken. It is not sick. It is exhausted and over-trained and waiting — without knowing it — for you to stop confirming its false alarms. Every time you let the feeling pass without adding more fear, the threshold rises a little. The alarm becomes a little less sensitive. The world gets a little bigger.</p>
<p>That is recovery. Not dramatic. Not instant. But real, and entirely within your reach.</p>`,
          task: { icon: '📉', title: 'Trace the sensitisation', body: "Write the honest history of your anxiety. When did it start? What was happening in your life? How did it escalate — what did the alarm start firing at first, and what does it fire at now? You are not looking for causes to blame — you are understanding the mechanism. Seeing the process clearly makes it less mysterious and less frightening." },
          journal: "If the sensitised nervous system is not broken but exhausted — if it needs rest rather than war — what would it mean to stop fighting it? What would you do differently tomorrow if you truly believed the nervous system just needed to be left alone?",
          mantra: "My nervous system is sensitised, not broken. It is tired, not sick. It needs rest, not more alarm."
        }
      },
      {
        id: 4,
        title: "The Accelerator and the Brake",
        free: true,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "Your nervous system has two modes — not metaphorically, but literally. Understanding the on switch and the off switch is the difference between being at the mercy of anxiety and knowing exactly how to work with it.",
          body: `<p>The autonomic nervous system has two branches. They are always in dynamic balance — or should be.</p>
<p><strong>The Sympathetic Nervous System (SNS)</strong> is the accelerator. When it activates, adrenaline is released, the heart speeds up, breathing quickens, muscles prime, digestion stops. This is the alarm state. This is every anxiety symptom you have ever experienced. The SNS is fast, powerful, and designed to be temporary.</p>
<p><strong>The Parasympathetic Nervous System (PNS)</strong> is the brake. Its job is to bring everything back to baseline after the alarm — slow the heart, deepen the breathing, restart digestion, release muscle tension, return the mind to calm. In a well-regulated nervous system the SNS fires, does its job, and the PNS brings everything back down within minutes.</p>
<p>In a sensitised nervous system, the handover breaks down. The SNS stays active past its purpose. The PNS brake is weak — not from disease, but from underuse. Because every time the alarm fired, the person fought or fled or panicked — activating the SNS further rather than allowing the PNS to engage.</p>
<p>The brake has never been practised. It has never been allowed to do its work.</p>
<p>Here is what Weekes understood: <strong>you cannot force the SNS off. But you can engage the PNS directly.</strong></p>
<p>The primary pathway to the parasympathetic nervous system is the vagus nerve — the longest nerve in the body, running from the brainstem through the heart and lungs to the gut. The vagus nerve is activated by one thing more reliably than anything else: <strong>a slow, extended exhale.</strong></p>
<p>Not deep breathing — that activates the SNS. The exhale. Specifically, an exhale longer than the inhale. Four counts in, six counts out. The longer the out-breath, the stronger the vagal signal: stand down, the threat has passed, the brake can engage.</p>
<p>This is not relaxation as a concept. It is a direct physiological pathway — available in any moment, requiring no equipment, no privacy, no special conditions. The exhale is the brake pedal. You have always had access to it.</p>
<div class="weekes-quote">"The body knows how to calm itself. It has always known. The problem is we never let it — we keep adding more alarm before the first one has settled."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>This is also why fighting anxiety makes it worse. Fighting is SNS activation — it is pressing the accelerator while trying to slow down. The only way to engage the brake is to stop pressing the accelerator. Stop fighting. Allow the exhale. Let the PNS do its work.</p>`,
          task: { icon: '🫁', title: 'Find the brake', body: "Practice the 4-6 breath for five minutes: four counts in, six counts out. Don't force the inhale — let it be natural. Make the exhale slow and complete. Do this when you are not anxious, so you know what it feels like. You are training the pathway so it's available when you need it. Notice what changes in your body over five minutes of extended exhaling." },
          journal: "Think about the last time you felt genuinely calm — not absence of anxiety, but actual ease. What were you doing? What was your breathing like? What had you stopped doing that you normally do? Write the conditions of your calm. Those conditions are your PNS engaging. You've already experienced it. You know what it feels like.",
          mantra: "The exhale is the brake. I stop pressing the accelerator. I let the PNS do its work."
        }
      },
      {
        id: 5,
        title: "Second Fear — Why Fighting Makes It Worse",
        free: true,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "Everything your instincts tell you to do when anxiety strikes — fight it, suppress it, escape it, control it — makes it worse. Not slightly worse. Significantly worse. Understanding why is the first step to doing the opposite.",
          body: `<p>You are sitting on the sofa. Watching television, maybe, or just resting. Nothing is happening. And then — out of nowhere — your heart rate spikes. A wave of heat moves through your chest. Your breathing changes. A surge of adrenaline hits your system and suddenly your body is on full alert.</p>
<p>That is First Fear. Automatic. Involuntary. A sensitised nervous system misfiring. It would burn off on its own in two to three minutes if you simply let it.</p>
<p>But you do not let it. Because in the same instant — in the fraction of a second after the sensation arrives — something else happens. Your mind speaks.</p>
<p><em>What is that? Something is wrong. My heart — is that normal? That does not feel normal. What if this is a heart attack? I cannot breathe properly. What if I stop breathing? What if I pass out? What if I am losing my mind? Why is this happening? Why won't it stop? I cannot cope with this. Something is seriously, seriously wrong with me.</em></p>
<p>That is Second Fear. And it changes everything.</p>
<p>Second Fear is not the adrenaline. It is the story you tell yourself about the adrenaline. It is the meaning you assign to the sensation in the moment it arrives. And that meaning — <em>I am dying, I am losing control, something is catastrophically wrong</em> — is itself a threat signal. The nervous system does not know the difference between a real threat and a thought about a threat. It only knows that you are alarmed. And so it does what it always does when you are alarmed: it releases more adrenaline.</p>
<p>More adrenaline means stronger sensations. Stronger sensations mean more frightening thoughts. More frightening thoughts mean more adrenaline. The loop is now running.</p>
<p>What started as a two-minute wave of adrenaline that would have passed quietly is now a full panic attack — sustained, escalating, terrifying — entirely because of the story added on top of the original sensation.</p>
<p>This is the mechanism. This is the whole mechanism. First Fear is the spark. Second Fear is the fuel. Without the fuel, the spark burns out in minutes. With the fuel, it becomes a fire that can last hours.</p>
<p>Think about the specific thoughts that arise for you. They probably follow a pattern:</p>
<p><em>Heart racing:</em> "I'm having a heart attack. My heart is going to give out."<br/>
<em>Breathlessness:</em> "I can't breathe. I'm going to stop breathing. I'm suffocating."<br/>
<em>Derealization:</em> "I'm losing my mind. This isn't real. I'm going insane."<br/>
<em>Trembling:</em> "I'm going to collapse. My legs won't hold me. I'm losing control."<br/>
<em>The feeling itself:</em> "What if it never stops? What if this is permanent? What if I'm broken?"</p>
<p>Every single one of these thoughts is a lie. Not a mistake — a lie. The heart is not failing. You are not stopping breathing. You are not losing your mind. You are not going to collapse. It is not permanent. You are not broken.</p>
<p>It is adrenaline. The same chemical as excitement. Your body doing its job in a nervous system that has become too sensitive. That is all that is happening. The sensation is real. The story about the sensation is fiction.</p>
<div class="weekes-quote">"Second fear is the fear you add to first fear. It is always optional. It is always the mechanism that sustains the suffering. And it can always be withheld."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>Here is what fighting does: every attempt to suppress the feeling, escape the situation, or control the sensation is itself a Second Fear response. It says to the nervous system: <em>this feeling is dangerous enough to require this much effort to contain.</em> The nervous system updates accordingly. The sensitisation deepens. The alarm becomes more hair-trigger. The world gets smaller.</p>
<p>There is a device called a Chinese finger trap — a small woven tube. You insert both index fingers. When you pull to escape, the trap tightens. The only way out is to stop pulling. The escape attempt is the trap.</p>
<p>Anxiety is the same. The fight is the fuel. Stop fighting — stop adding the story, stop adding the second layer of fear on top of the first — and the first wave has nothing to feed on. It peaks. In minutes. And it passes.</p>
<p>Every single time.</p>`,
          task: { icon: '🤲', title: 'Watch the fight response', body: "Today, when anxiety appears, don't try to stop it. Just watch what you automatically do — the tensing, the checking, the trying to think your way out, the urge to escape. Watch the fight response without joining it. You don't have to stop it perfectly. Just observe it. Naming the response is the first step to not being driven by it." },
          journal: "Write down all the ways you have fought anxiety — every technique, every avoidance, every safety behaviour, every reassurance you've sought. How long have you been fighting? What has the fight given you? Be honest. The fight has kept you safe from the feeling. It has also kept you stuck.",
          mantra: "The fight is the fuel. I stop fighting. Without the fight, the wave has nothing to feed on."
        }
      },
      {
        id: 6,
        title: "The Lie — Anxiety's Perfect Bluff",
        free: false,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "Anxiety makes one prediction every time it fires. That prediction has been wrong every single time, in every single instance, without a single exception. This is not reassurance. It is your documented track record.",
          body: `<p>Every panic attack comes with a prediction: <em>something terrible is about to happen.</em></p>
<p>Sometimes the prediction is specific — you are about to have a heart attack, lose control, go mad, faint, stop breathing. Sometimes it is a formless dread — just the absolute certainty that catastrophe is imminent.</p>
<p>This prediction is anxiety's entire power. It is also its entire weakness. Because the prediction has been wrong every single time.</p>
<p>You did not die. You did not go mad. You did not lose control. You did not stop breathing. Every catastrophe anxiety has ever promised you has failed to materialise. Not most of the time. Every time. Without a single exception across your entire history with this feeling.</p>
<p>Think about that. If you made a prediction that was wrong every single time — hundreds of times, not one correct — you would eventually stop trusting the prediction. You would see it as a known error rather than reliable information.</p>
<p>The only reason anxiety's prediction remains convincing is that fear is the most powerful emotion the human brain produces. Conviction in the moment of terror feels indistinguishable from knowledge. But conviction is not evidence. Feeling certain is not the same as being right.</p>
<div class="weekes-quote">"The sensitised person's utter conviction that catastrophe is imminent has never once, in all the cases I have treated, been borne out by events. Not once."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>This is the bluff. Anxiety plays the strongest possible hand — absolute certainty of catastrophe, delivered with the full physiological force of adrenaline — and it holds nothing. The cards are blank. The threat was never real.</p>
<p>Seeing anxiety as a bluff does not make the feelings disappear. But it changes what you do with them. Instead of running from a genuine threat, you are calling a known bluff. Instead of adding Second Fear to a real danger, you are recognising a familiar false alarm.</p>
<p>Your track record is 100% survival. That is the evidence. Hold it.</p>`,
          task: { icon: '📋', title: 'Build your evidence file', body: "Write down every panic attack or severe anxiety episode you can remember. For each one: what did anxiety predict? What actually happened? Go back as far as you can. This list is your evidence file — the documented track record of the bluff. Keep it somewhere accessible. On the hardest days, when the prediction feels absolutely certain, read the file." },
          journal: "The prediction has been wrong every single time — but it still feels convincing. Why? Write about the gap between what you know intellectually (it's always been wrong) and what you feel in the moment (this time it's real). That gap is where anxiety lives. Understanding the gap is the beginning of closing it.",
          mantra: "The prediction has been wrong every single time. I know this bluff. I hold the evidence."
        }
      },
      {
        id: 7,
        title: "You Are Safest When You Feel Most Afraid",
        free: false,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "The most counterintuitive truth in anxiety recovery: the moment of peak terror is the moment of peak physical safety. Understanding this paradox dismantles one of anxiety's most powerful weapons.",
          body: `<p>During a full panic attack, every protection system your body has is activated simultaneously.</p>
<p>Your heart is working at maximum efficiency — pumping blood to every muscle. Your immune system is on heightened alert. Your senses are at their absolute sharpest. Your muscles are primed and ready. Your breathing is maximised for oxygen intake. Your entire physiology is in its most defended, most capable, most ready state.</p>
<p>You are, in that moment, at your most protected.</p>
<p>The certainty you feel — that something terrible is about to happen, that your body is failing, that you are in genuine danger — is the alarm's language. It is not medical reality. The alarm says: danger. Your body says: fully defended.</p>
<p>Nobody has ever died from a panic attack. Nobody has ever gone mad from one. Nobody has ever genuinely lost control — in the sense of being unable to function — from one. Not from anxiety alone, in the absence of another medical condition. These are not reassurances. They are facts.</p>
<p>The heart does not give out from palpitations. The mind does not break from derealization. The legs do not fail from trembling. The feeling of suffocation does not mean you are suffocating — your oxygen is normal or elevated.</p>
<div class="weekes-quote">"When you feel most afraid, your body is at its most capable. The alarm is at its loudest precisely because the protection is at its most complete."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>The threat your alarm is responding to is the alarm itself. The feeling is frightening. The feeling of the feeling is frightening. And the feeling of the feeling of the feeling. This is Second Fear, stacked on Second Fear, all responding to a body that is — underneath it all — completely fine.</p>
<p>When you feel most afraid: you are most protected. The alarm is loudest when it is most wrong. Hold this. It contradicts every instinct you have. It is also true.</p>`,
          task: { icon: '🛡️', title: 'Say the accurate thing', body: "When anxiety hits today — any level — say this out loud: 'I am safest when I feel most afraid. My body is fully protecting me right now.' Not as comfort. As fact. You are correcting the alarm's false report with the accurate physiological picture. Do this every time the alarm fires today." },
          journal: "Write about your worst panic attack — the one that felt most like something terrible was genuinely about to happen. Write it in detail: the sensations, the certainty, the fear. Then write what was actually happening in your body during that moment — the physiology, the protection, the truth. Two versions of the same event. Which one is accurate?",
          mantra: "I am safest when I feel most afraid. My body is protecting me. The alarm is loudest when it is most wrong."
        }
      },
      {
        id: 8,
        title: "It Is Not Complex — We Made It Complex",
        free: false,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "Anxiety has been made complicated — by an industry, by well-meaning but misguided approaches, and by our own desperate attempts to understand something that terrified us. The truth underneath all that complexity is almost embarrassingly simple.",
          body: `<p>Think about everything you have read, been told, and tried in your attempts to manage anxiety.</p>
<p>The diagnoses. The frameworks. The techniques. The medications. The breathing exercises. The grounding methods. The cognitive restructuring. The exposure hierarchies. The safety plans. The management strategies. The idea — perhaps the most damaging idea — that anxiety is something you manage rather than something you understand and move through.</p>
<p>None of this is worthless. Some of it has helped you function. But all of it has, in some way, reinforced the central wrong idea: that anxiety is complex, requiring complex solutions, possibly indefinitely.</p>
<p>It is not complex. It never was.</p>
<p>A smoke detector is not complex. When it goes off in an empty room, you do not need a ten-step management protocol. You do not need to restructure your thoughts about smoke. You do not need to carefully expose yourself to the sound of the alarm at gradually increasing volumes until you habituate.</p>
<p>You need to understand that there is no fire. And you need to stop running from the sound of the alarm.</p>
<p>That is all anxiety recovery is. Understanding that the threat is not real. And learning — slowly, through experience — to stop running.</p>
<div class="weekes-quote">"I have seen people recover from the most severe anxiety disorders imaginable through understanding alone — through finally seeing clearly what was happening to them and what they needed to do. The method is simple. Simple does not mean easy. But simple is true."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>We made it complex because complexity felt proportional to how terrible it felt. Something this frightening must have a complex cause and a complex solution. But the complexity was never in the anxiety. It was in the story we built around it.</p>
<p>Strip the story away. One chemical. One misfiring alarm. One sensitised nervous system that needs rest instead of war. One method: stop running. That is the whole thing.</p>`,
          task: { icon: '✂️', title: 'Strip it back', body: "Write down the simplest possible version of what anxiety is — in one sentence, in your own words. Not the clinical version. Your version. The one that feels true when you read it. Keep it somewhere you can find it on hard days when the complexity creeps back in." },
          journal: "What has the 'complexity' story cost you? The idea that anxiety is a deep, complex disorder requiring years of careful management — how has holding that story affected how you've approached your recovery, your life, your sense of what's possible? Write honestly.",
          mantra: "One chemical. One misfiring alarm. One nervous system that needs rest. That is all this is."
        }
      },
      {
        id: 9,
        title: "You Now See It For What It Is",
        free: false,
        lesson: {
          part: 'Part 1 · The Truth',
          intro: "Ten lessons. Before you move to Part 2, take stock of what you now understand. Not what you intellectually know — what you actually see. Because seeing it clearly is the threshold between Part 1 and Part 2.",
          body: `<p>You now know that what you feel is adrenaline — one chemical, the same as excitement, a misfiring smoke detector.</p>
<p>You know what every symptom is and why it occurs. You know that none of it is dangerous. You know that the racing heart is efficiency, the dizziness is CO2, the derealization is blood flow, the impending doom is the amygdala at full volume.</p>
<p>You know that your nervous system became sensitised through a process — not through weakness, not through a disorder, but through repeated activation and a response that kept confirming the alarm was right.</p>
<p>You know about the SNS and the PNS. You know the exhale is the brake. You know why fighting makes it worse.</p>
<p>You know about Second Fear — the only thing that keeps the first wave burning. You know the prediction has been wrong every single time. You know that you are safest when you feel most afraid.</p>
<p>You know it is not complex. You know we made it complex.</p>
<p>Here is the question that determines whether you are ready for Part 2: <strong>do you believe it?</strong></p>
<p>Not intellectually — do you feel it as true? When the alarm fires, does any part of you now recognise it as a false alarm? Even a small part? Even for a moment?</p>
<p>If yes — you are ready. Part 2 is where understanding becomes practice. Where you take the truth you now hold and learn to apply it in the moment — in real anxiety, in real situations, when the alarm is at its loudest and every instinct says run.</p>
<div class="weekes-quote">"Understanding is not enough by itself. But it is the essential beginning. You cannot face what you do not understand. And you cannot float through what you are still running from."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>If the understanding doesn't feel solid yet — stay here. Reread the lessons that didn't fully land. The truth needs to be in your bones, not just in your head, before the practice in Part 2 can work. There is no rush. The nervous system recovers at its own pace. Understanding cannot be forced — only absorbed.</p>
<p>When you feel it: move on.</p>`,
          task: { icon: '✅', title: 'The readiness check', body: "Write out, in your own words, the complete picture of what anxiety is — what's happening in the body, why the nervous system got sensitised, why fighting makes it worse, what the prediction track record is. Don't look back at the lessons. Write from what you actually understand. The gaps are what to return to before moving on." },
          journal: "What has shifted in how you see anxiety since Lesson 1? Not how you feel — how you understand. What looks different? What do you now see that you couldn't see before? And what part of the truth is still hardest to hold onto when the alarm is actually firing?",
          mantra: "I see it for what it is. A bluff. A false alarm. A sensitised nervous system that needs rest, not war. I am ready."
        }
      }
    ]
  },
  {
    id: 2,
    title: 'The Float',
    tag: 'Part 2 · The Float',
    desc: "Understanding was the first half. This is the second. Floating is not a technique — it is a complete shift in your relationship with the feeling. You stop running. You stop fighting. You let the wave move through you. And slowly, through the accumulation of those experiences, the nervous system learns it was wrong.",
    lessons: [
      {
        id: 10,
        title: "What Floating Actually Means",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "Floating is Dr. Claire Weekes' central instruction — and the most misunderstood one. It does not mean relaxing. It does not mean not feeling. It means something very specific, and once you understand it, everything else in Part 2 follows from it.",
          body: `<p>Dr. Claire Weekes gave four instructions for recovering from anxiety. Four words that contain the entire method:</p>
<p><strong>Face. Accept. Float. Let time pass.</strong></p>
<p>Floating is the third instruction — and the heart of all four. But what does it mean?</p>
<p>It does not mean feeling calm. You will not feel calm when you float — the adrenaline is still present, the sensations are still there. Floating is not the absence of anxiety.</p>
<p>It does not mean tolerating the feeling through gritted teeth, waiting for it to end. That is enduring. Enduring is still a fight — a passive fight, but a fight.</p>
<p>Floating is <strong>moving through the feeling without resistance.</strong> It is like floating in water rather than struggling against it. The water is still there. You are still in it. But you have stopped fighting the current. You have let your body become buoyant. You move with it rather than against it.</p>
<p>In practice, floating feels like this: the alarm fires. Instead of tensing against it — instead of trying to make it stop, escape the situation, or manage the feeling — you drop your shoulders. You soften your body. You breathe out slowly. You say, internally: <em>alright. Here it is. I know what this is. I'm not going anywhere.</em></p>
<p>You let the feeling be present. You let it rock you. You don't grab it and you don't push it away. You float.</p>
<div class="weekes-quote">"Float, don't fight. Loosen your body — go slack, like a rag doll in the wave. The wave cannot drown a person who does not resist it."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>This is the complete reversal of everything anxiety has trained you to do. Every instinct says tense, fight, flee. Floating says: drop, soften, stay.</p>
<p>It is a practice. It will feel impossible the first time. It will feel slightly less impossible the second time. By the tenth time, something will have shifted — not in the anxiety, but in you. The nervous system is watching every response you give. Each float tells it: false alarm. Nothing happened. The threshold can rise.</p>`,
          task: { icon: '🌊', title: 'Practice floating right now', body: "You don't need anxiety to be present to practice floating. Sit or lie down. Create mild discomfort — think of something mildly worrying, or simply notice any tension or unease in your body. Then: drop your shoulders, unclench your jaw, open your hands, slow your exhale. Say internally: 'I'm not fighting this. I let it be here.' Hold that posture — soft, open, not tensed — for two minutes. That is floating. Learn what it feels like when the stakes are low." },
          journal: "What is the difference, in your body, between enduring anxiety and floating through it? Write what enduring feels like physically — the tension, the bracing, the waiting. Then write what floating would feel like if you could do it fully. What would change in your body? What would you stop doing?",
          mantra: "Drop. Soften. Stay. I float through it — I don't fight it, I don't flee it. I let it move through me."
        }
      },
      {
        id: 11,
        title: "Face It",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "The first of Weekes' four instructions. Facing is not courage in the heroic sense. It is simply turning toward the feeling rather than away from it. It is the end of running.",
          body: `<p>Facing means: when the alarm fires, you do not turn away from it.</p>
<p>Not running from the feeling. Not escaping the situation. Not distracting yourself, reassuring yourself, or doing anything that is fundamentally an attempt to be somewhere other than where the feeling is.</p>
<p>Facing sounds simple. In practice it is the hardest part of the method — because every instinct, every learned response, every previous strategy has been about turning away. Running has felt like survival. Staying has felt like danger.</p>
<p>But here is what running has actually done: every time you left a situation because anxiety commanded it, you confirmed the alarm's false report. The nervous system recorded: that situation was dangerous. The alarm was right. Keep the threshold low. The world got smaller. The alarm got more sensitive.</p>
<p>Facing reverses this. Every time you stay — every time you turn toward the feeling rather than away from it — the nervous system receives new data: I was there through the peak. Nothing happened. False alarm. The threshold rises, incrementally, through accumulation.</p>
<p>Facing is not white-knuckling it. It is not enduring the feeling while secretly waiting for it to stop. It is genuinely turning toward it — acknowledging it, looking at it clearly, and choosing to stay.</p>
<div class="weekes-quote">"The only way past the fear is through it. Not around it, not under it, not by managing it from a safe distance. Through it. Every avoidance postpones the moment of facing — and keeps the nervous system sensitised."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>You do not have to feel ready to face it. You will rarely feel ready. You face it because you understand that the alternative — continued running — has a known cost. And the fear of the feeling, when you stop running from it, is never as bad as the anticipation of it.</p>`,
          task: { icon: '👁️', title: 'Turn toward it', body: "Today, when anxiety appears — or when you notice the urge to avoid something — turn toward it. Don't escape, don't distract, don't reassure. Just stay and look at it. Say: 'I know what you are. I'm not leaving.' Hold the stay for as long as the anxiety lasts. When you leave, leave on your terms — not because anxiety commanded it." },
          journal: "What are you currently avoiding? Make an honest list — places, situations, activities, sensations, thoughts. Every avoidance is a place where you are still running. This list is not a source of shame — it is a map of where the facing needs to happen. Which one would you face first if you genuinely believed the feeling couldn't hurt you?",
          mantra: "I turn toward it. I do not run. Every stay recalibrates the alarm. I face it."
        }
      },
      {
        id: 12,
        title: "Accept It",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "Accept is the second instruction — and the most misunderstood. It does not mean resignation. It does not mean you want anxiety or think it's fine. It means something precise and powerful: you stop adding the fight on top of the feeling.",
          body: `<p>Acceptance in Weekes' sense is not:</p>
<p>— Thinking anxiety is acceptable or that you should be happy about it.<br/>
— Giving up on recovery.<br/>
— Pretending the feeling isn't there.<br/>
— Resigning yourself to a life with anxiety.</p>
<p>Acceptance is: <strong>allowing the feeling to be present without adding resistance to it.</strong></p>
<p>The feeling is there. It will be there whether you accept it or not — the adrenaline is already released, the alarm is already firing. The only question is what you add on top of it. Do you add the fight? The second fear? The attempt to control and suppress?</p>
<p>Or do you say: <em>yes, alright, this feeling is here. I know what it is. I don't have to like it. I don't have to want it. But I'm not going to fight it.</em></p>
<p>That is acceptance. The withdrawal of resistance.</p>
<p>And here is what happens when resistance is withdrawn: the feeling, no longer being fought and therefore no longer being fuelled, begins to move. Feelings that are not resisted do not get stuck. They arise, peak, and pass — because that is what feelings do when not interfered with.</p>
<p>It is the resistance that keeps anxiety sustained. The anxiety that lasts for hours, that seems to never end, that becomes the background of an entire day — this is not a particularly powerful anxiety. It is an anxiety being continuously refuelled by the fight against it.</p>
<div class="weekes-quote">"Accept the feelings. Do not fight them, do not run from them. Let them be there. Strange as it may seem, the very act of acceptance begins to release the tension that was sustaining them."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>Acceptance is not passive. It is an active choice — made repeatedly, every time the urge to fight arises. It is one of the most demanding things you will practise. But it is also where the nervous system begins to receive the data it needs: I allowed this feeling. Nothing catastrophic happened. The alarm was wrong.</p>`,
          task: { icon: '🫴', title: 'Say yes to it', body: "When anxiety appears today, say — out loud if possible: 'You can be here. I know what you are. I'm not fighting you.' Then do nothing to make it go away. No distraction, no escape, no reassurance. Just let it be present. Notice what happens to the feeling when you stop fighting it. This is the data you are collecting." },
          journal: "What does it feel like to stop fighting — even briefly? Write about a moment when you stopped trying to control anxiety and just let it be there. What happened to the feeling? If you can't think of one, write about what you imagine would happen if you genuinely stopped resisting. What are you afraid would occur?",
          mantra: "You can be here. I'm not fighting you. Acceptance withdraws the fuel. The feeling can move."
        }
      },
      {
        id: 13,
        title: "Float",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "This is the heart of it. Not a technique — a complete shift in posture toward the feeling. Soft where you were hard. Open where you were closed. Moving with the wave instead of against it.",
          body: `<p>You have faced the feeling. You have accepted its presence. Now you float through it.</p>
<p>Floating is a physical practice as much as a mental one. It begins in the body.</p>
<p><strong>Drop your shoulders.</strong> Notice how high they are — they are almost always raised toward the ears when anxiety is present. Let them fall. Don't force them down. Just release the holding.</p>
<p><strong>Unclench your jaw.</strong> Let your teeth part slightly. Let the muscles around your jaw soften.</p>
<p><strong>Open your hands.</strong> Uncurl the fingers. Let the palms face upward or rest open.</p>
<p><strong>Soften your belly.</strong> The abdomen tightens automatically with anxiety. Let it go slack.</p>
<p><strong>Slow your exhale.</strong> Don't control the inhale — let it be natural. Make the out-breath long and slow. This is the direct signal to the parasympathetic nervous system: the threat has passed. The brake engages.</p>
<p>Now, in that physically softer state — don't try to stop the feeling. Don't try to think your way out of it. Don't monitor it to see if it's getting better. Just... be in it. Let it move through you like a wave moves through water. The wave doesn't stop the water. The water doesn't fight the wave. The wave moves through and the water remains.</p>
<div class="weekes-quote">"Go with the feelings, not against them. Loosen — go slack, like seaweed in the current. The current cannot carry away what does not resist it."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>You will feel the urge to check whether it's working. To monitor the anxiety level, to see if floating is reducing it. Resist this. Monitoring is a subtle form of fighting — it is still treating the feeling as a problem requiring management. Float without checking. Float without agenda. Float because you understand there is nothing else that needs to be done.</p>
<p>The nervous system is watching. Every float is data: false alarm, nothing happened, the threshold can rise. Not today. Not from this one float. But through the accumulation of floats, over time, the sensitisation reverses. The nervous system learns. The alarm becomes less sensitive. The world gets bigger.</p>`,
          task: { icon: '🌊', title: 'Float through a real moment', body: "Today, when anxiety is genuinely present — not imagined, actually there — run the full float. Drop shoulders. Unclench jaw. Open hands. Soften belly. Long slow exhale. Say: 'I'm not fighting this. I let it move through me.' Hold the soft posture. Don't monitor it. Don't try to make it stop. Stay soft until it passes on its own. Then write what happened." },
          journal: "Describe the physical experience of floating — what does it feel like in your body to drop the resistance? What has to happen internally for you to get from braced and fighting to soft and floating? Write the transition in as much detail as you can. This is the practice you are building.",
          mantra: "Drop. Soften. Slow exhale. Let it move through me. I am the water, not the wave."
        }
      },
      {
        id: 14,
        title: "Let Time Pass",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "The fourth and most underrated of Weekes' instructions. Letting time pass is not passive waiting — it is the active practice of not demanding immediate results from a process that works through accumulation.",
          body: `<p>Recovery from a sensitised nervous system is not an event. It is a process. And processes take time — not because something is wrong, but because that is the nature of nervous system recalibration.</p>
<p>The nervous system does not de-sensitise in a straight line. It goes: two steps forward, one step back. A good week followed by a bad day. A period of calm followed by a spike that feels like square one. This is not failure. This is exactly what the process looks like.</p>
<p>The most dangerous moment in recovery is not the setback. It is the catastrophic interpretation of the setback: <em>see? It's not working. I'm back to square one. Everything I've learned is useless.</em> This interpretation — which is itself a form of second fear — causes people to stop floating, resume fighting, and undo the progress that had been made.</p>
<p>Letting time pass means: you do not evaluate the process by today. You evaluate by the direction of travel over weeks and months. Are the bad days slightly less bad than they were three months ago? Are the good periods slightly longer? Is the threshold slightly higher — do smaller things set it off, or does it take more now?</p>
<p>That direction of travel is the recovery. The setbacks are just the path.</p>
<div class="weekes-quote">"Recovery is not the disappearance of anxiety. It is the gradual diminishment of the fear of anxiety. When you no longer dread the feeling — when it can arrive and you can say 'yes, there it is, I know what this is' — you are recovered."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>Letting time pass also means letting the float work without demanding that it work immediately. The nervous system does not update after one float. It updates through accumulation. Each float adds a data point. Over dozens of floats, the pattern changes. Over hundreds, the sensitisation reverses.</p>
<p>This is not slow. It is the actual pace of nervous system learning. Accepting that pace — rather than fighting it — is itself a form of floating.</p>`,
          task: { icon: '📅', title: 'Look at the direction of travel', body: "Think back three months, six months, a year if you can. Write honestly: how does your average anxiety level now compare to then? Not your worst moments — your average. Not whether you've had bad days — whether the bad days are slightly less frequent or less intense. Find the trend. That trend is the recovery, even if today doesn't feel like it." },
          journal: "Write about a setback you've had that felt like total failure at the time. What did anxiety tell you it meant? Now write what it actually meant — a wave in a receding tide. What would you have said to yourself in that moment if you'd understood the process? Write that now, for the next setback that will come.",
          mantra: "Recovery works through accumulation. I judge by the direction, not the day. I let time pass."
        }
      },
      {
        id: 15,
        title: "The Nervous System Needs Rest, Not War",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "Weekes' insight that changed everything: the sensitised nervous system is not an enemy to be defeated. It is an exhausted system that has been on high alert for too long. What it needs is not more battle — it needs to be left alone.",
          body: `<p>Consider how long your nervous system has been running the alarm. Months, probably. Possibly years. Every day, multiple times a day, the full stress response activating — adrenaline flooding the system, every organ on high alert, every muscle primed.</p>
<p>This is metabolically expensive. The body was designed to run the full alarm response for minutes — to sprint from a predator, to fight a threat. Not to run it continuously for months while sitting in an office or lying in bed.</p>
<p>The result is an exhausted system. Not broken. Not diseased. Exhausted. Running on fumes. Firing the alarm at the slightest provocation not because the world is genuinely threatening but because the threshold is so low from overuse that almost anything triggers it.</p>
<p>Now think about what fighting anxiety does to this system.</p>
<p>Every fight is more alarm activation. Every attempt to suppress, control, or manage the feeling is the stressed system being stressed further. Every catastrophic interpretation of a symptom — <em>oh no, here it comes, why won't it stop</em> — is another adrenaline injection into an already overloaded system.</p>
<p>Weekes' insight was this: <strong>the nervous system cannot heal while at war with itself.</strong> Recovery requires the one thing that has not been tried — genuine rest. Not sleep, though sleep helps. Rest from the fight. Cessation of the internal war.</p>
<div class="weekes-quote">"Stop treating your nervous system as an enemy. Stop demanding that it perform differently. Give it what it has been denied for so long: peace. Simply leave it alone, and it will heal itself — because that is what nervous systems do when left in peace."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>Leaving it alone does not mean ignoring symptoms or pretending anxiety isn't there. It means meeting the symptoms with understanding rather than alarm. It means: <em>yes, there is the racing heart. I know what that is. I don't need to do anything about it.</em> And then continuing with your day.</p>
<p>Every moment of non-response is rest for the nervous system. Every float is rest. Every time you let a symptom pass without adding second fear — that is the nervous system being left in peace to do what it has always been capable of doing: healing itself.</p>`,
          task: { icon: '🕊️', title: 'Give it one hour of peace', body: "For one hour today, commit to not fighting anything your nervous system produces. Every symptom, every spike, every uncomfortable sensation — meet it with: 'I know what this is. I don't need to do anything.' Don't monitor, don't analyse, don't try to fix. Just live through the hour with complete non-response to whatever arises. This is one hour of rest for a system that may not have rested in months." },
          journal: "If you genuinely stopped treating your nervous system as an enemy — if you stopped fighting, monitoring, analysing, and trying to fix — what would you do with the mental energy that currently goes into the war? Write what life without the internal battle would actually look like day to day.",
          mantra: "I stop fighting. I give my nervous system rest. Left in peace, it heals itself."
        }
      },
      {
        id: 16,
        title: "Floating In Real Situations",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "Floating when you're alone and calm is one thing. Floating in the supermarket, in a meeting, on the motorway, at a social event — with the alarm firing hard and every instinct saying leave — is another. This is where the practice actually lives.",
          body: `<p>The float has to work in real life — in the situations anxiety has been steering you away from, in the moments when leaving feels urgent and staying feels impossible.</p>
<p>There is no alternative location in which recovery happens. It does not happen in the safety of your home, practising floating with mild discomfort in controlled conditions. It happens in the supermarket when the adrenaline spikes and the exit is right there. It happens in the meeting when the feeling rises and the door is in reach. It happens in the situations anxiety has been managing on your behalf.</p>
<p>The approach is always the same, regardless of the situation:</p>
<p><strong>When the alarm fires: drop your shoulders. Unclench your jaw. Slow your exhale.</strong> Do this in the queue, at the table, in the car, mid-conversation. Nobody can see you float. It requires no pause, no retreat, no privacy.</p>
<p><strong>Say the accurate thing internally:</strong> I know what this is. Adrenaline. My nervous system misfiring. Not danger. I'm not leaving.</p>
<p><strong>Stay through the peak.</strong> The peak is typically 90 seconds to three minutes. Stay through it. When it passes — and it will pass — your nervous system receives the most powerful data it can get: I was there through the worst of it. Nothing happened. False alarm.</p>
<p><strong>Leave on your terms.</strong> Not when anxiety commands it. When you decide to. This distinction matters enormously. Leaving when you choose is not avoidance. Leaving because the alarm demands it is.</p>
<div class="weekes-quote">"It is not the severity of the anxiety that matters — it is whether you face it or flee it. A small facing is worth more than a large endurance."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>Each real-situation float is more valuable than ten low-stakes practices. The nervous system updates from real experience, in the actual context that has been triggering it. The data is specific: this place, this situation, this feeling — and I stayed, and nothing happened, and I floated, and it passed.</p>`,
          task: { icon: '🗺️', title: 'Float somewhere real today', body: "Choose one situation you have been avoiding or partially avoiding because of anxiety. Go there. When the alarm fires, float — drop, soften, slow exhale, stay. You do not have to stay for a long time. You have to stay through the peak. Afterward: write exactly what happened. What did the alarm predict? What actually occurred? That gap is the lie being disproved by direct experience." },
          journal: "What situations has anxiety been managing on your behalf — places you no longer go, things you no longer do, events you redesign around what anxiety will allow? Write the full list. These are not just avoidances. They are the specific locations where your nervous system needs real-situation data. They are your recovery map.",
          mantra: "I float in real situations. I stay through the peak. Each stay writes the new story."
        }
      },
      {
        id: 17,
        title: "When It Spikes Hard",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "The method is clear when anxiety is moderate. When it spikes hard — suddenly, intensely, from nowhere — everything you've learned seems to vanish. This lesson is specifically for those moments.",
          body: `<p>There will be moments when the alarm fires at its hardest — a sudden, intense spike that feels qualitatively different from the anxiety you've been practising with. The feeling of imminent catastrophe is overwhelming. The certainty that this time is different is absolute. Everything you've learned recedes and the old panic rises.</p>
<p>This is not a failure of understanding. It is the alarm at its most sophisticated — it has learned your patterns and it is using its strongest hand. And its strongest hand is still a bluff.</p>
<p>When it spikes hard, the float instructions are identical — but they need to be delivered to a system under maximum alarm. Here is the sequence:</p>
<p><strong>First: name it.</strong> Out loud if possible. "That's adrenaline. That's the alarm. I know what this is." The naming interrupts the automatic second-fear response before it can build. It inserts a true statement between the spike and the catastrophic interpretation.</p>
<p><strong>Second: drop the body immediately.</strong> Shoulders down. Jaw unclenched. Hands open. This is not optional — it is the physical signal that overrides the SNS. The body leads the nervous system, not the other way around.</p>
<p><strong>Third: slow the exhale.</strong> Don't gasp for air — the instinct will be to breathe in harder. Resist it. The long, slow out-breath is the brake. Use it.</p>
<p><strong>Fourth: stay and float.</strong> Do not leave. Do not flee into reassurance, into distraction, into escape. Float. Soften. Let it rock you. The peak is coming and it will pass within minutes.</p>
<div class="weekes-quote">"In the worst moment — when the wave is highest — this is when the float matters most. Not comfort. Not escape. Float."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>After the peak passes — and it always passes — write what happened. The gap between what the alarm predicted and what actually occurred is evidence. Collect it. Every hard spike you float through is the most powerful possible recalibration signal for your nervous system.</p>`,
          task: { icon: '⚡', title: 'Prepare the hard-spike script', body: "Write out the exact four steps for a hard spike — in your own words, in the sequence you'll run them. Keep it somewhere accessible on your phone. Not because you'll need to read it in the moment — but because writing it now, when calm, builds the neural pathway. In the moment, the body remembers what it has practised." },
          journal: "Think of the hardest spike you've had. Write what happened in detail — the sensations, the certainty, the fear. Now write what was actually happening physiologically during that moment. Then write: what would floating through that moment have looked like? What would you have done differently? You are practising the response before the next spike.",
          mantra: "Name it. Drop the body. Slow the exhale. Float. The peak always passes."
        }
      },
      {
        id: 18,
        title: "Setbacks Are Part of It",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "A setback after a period of progress is one of the most demoralising experiences in anxiety recovery. It is also inevitable, expected, and — understood correctly — evidence that recovery is happening.",
          body: `<p>The sensitised nervous system does not de-sensitise in a straight line. It never has. The path is: progress, setback, more progress, setback, more progress. The setbacks are not interruptions to the recovery. They are part of the shape of recovery.</p>
<p>During a setback, the alarm will say: <em>see? You're back to square one. Everything you've learned has failed. The recovery isn't real.</em> This is second fear applied to the recovery process itself — the alarm's most sophisticated attack, targeting the hope that was enabling progress.</p>
<p>Here is what a setback actually is: a wave. The nervous system is still de-sensitising — the threshold is still gradually rising — but the process is uneven. A period of stress, illness, poor sleep, or accumulated pressure can temporarily lower the threshold again, producing a spike that feels like the old anxiety. The tide is going out. This is a wave in the outgoing tide. Waves are not the tide.</p>
<p>Your response to a setback is identical to your response to any anxiety: float. The setback is not a different problem requiring a different method. It is the same alarm, firing for the same reasons, requiring the same response: face, accept, float, let time pass.</p>
<div class="weekes-quote">"A setback met with acceptance and understanding will resolve faster than the original illness. Because now you understand. You are no longer bewildered — you are someone who knows exactly what is happening and exactly what to do."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>The only thing that turns a setback into a true relapse is the decision to resume running. To stop floating and start fighting again. To interpret the wave as proof that the ocean is rising rather than receding.</p>
<p>As long as you keep floating — through the setback, through the hard days, through the moments that feel like failure — the direction of travel continues. The tide continues to go out. The setback is just a wave.</p>`,
          task: { icon: '🌊', title: 'Write your setback plan', body: "Write a specific plan for the next bad day — before it arrives. Step 1: name it as a wave, not the tide. Step 2: float — don't fight, don't flee. Step 3: do not resume avoidance. Step 4: judge by the trend, not the day. Write this now, when you're calm, so it's ready when the setback comes. Because it will come, and having it written changes how it lands." },
          journal: "Think of a past setback that felt like total failure at the time. Now, looking back: was it failure? What happened after it? Where are you now compared to where you were then? Write the actual trajectory — not how it felt in the setback, but what the line looks like when you zoom out.",
          mantra: "This is a wave, not the tide. I float through it. The direction of travel doesn't change."
        }
      },
      {
        id: 19,
        title: "The Voice That Says It's Not Working",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "At some point during recovery, a voice appears that is more insidious than acute panic. It speaks quietly, persistently, and with apparent reasonableness. Learning to recognise it is essential.",
          body: `<p>The voice says things like:</p>
<p><em>You've been doing this for weeks and you're still anxious. Other people recover faster. Maybe you're too far gone. Maybe this approach doesn't work for you. Maybe you're a special case. Maybe you need something more. Maybe recovery isn't actually possible for you.</em></p>
<p>This voice is not insight. It is not honest self-assessment. It is the sensitised nervous system's attempt to get you to resume running — because running, whatever its costs, was at least familiar. The voice sounds reasonable because it uses reason. But its function is the same as the acute panic: to get you to stop floating and start fighting again.</p>
<p>Here is how to recognise it: it always concludes in a direction away from floating. It always recommends more doing — more techniques, more searching, more attempts to accelerate or control the process. It is never satisfied with letting time pass. Because letting time pass, without doing, is the one thing the anxious mind finds most intolerable.</p>
<div class="weekes-quote">"The voice that says 'this is not working' is the same voice that said the catastrophe was real. It has the same track record."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>The response to this voice is the same as the response to all anxiety: face it, accept it, float through it, let time pass. You do not argue with it. You do not try to convince it that recovery is happening. You hear it, name it — <em>that's the voice</em> — and continue floating.</p>
<p>Recovery is not always felt before it is real. The nervous system often de-sensitises below the level of conscious awareness — you may not notice the improvement until one day you realise a situation that used to trigger you no longer does, or you handled a spike with a ease that would have been impossible months ago.</p>
<p>The work is happening. Trust the direction, not the feeling of the moment.</p>`,
          task: { icon: '🎙️', title: 'Name the voice', body: "Write out what the 'it's not working' voice says to you specifically. What are its exact arguments? What does it recommend instead? Then write one response to it — not a refutation, just a recognition: 'I hear you. I know what you are. I'm going to keep floating.' That's the entire response needed." },
          journal: "What would you tell someone else who had been working on recovery for two months and was discouraged? Write the honest, compassionate response you'd give to a friend. Then read it back to yourself. You are that person. That response applies.",
          mantra: "I hear the voice. I know what it is. I name it and keep floating."
        }
      },
      {
        id: 20,
        title: "The New Relationship With Fear",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "The goal was never a life without adrenaline. The goal was always a different relationship with the feeling — one where it can arise and you can say 'yes, there it is' and keep living. That relationship is being built right now.",
          body: `<p>Let's be honest about something: adrenaline will continue to surge throughout your life. Fear before difficult things. Racing heart in intense situations. Nerves before something important. Days when the system is louder than others.</p>
<p>This is not a failure of recovery. This is being human. The nervous system is supposed to activate. It was designed to. The goal was never to remove the alarm — it was to recalibrate it to fire appropriately, and to stop being frightened of the firing.</p>
<p>Full recovery — in Weekes' definition — is not the absence of anxiety. It is <strong>the absence of fear about anxiety.</strong></p>
<p>When the alarm fires and you can say: <em>yes, there it is. I know what this is. It will pass. I don't need to do anything.</em> And then continue with your day — that is recovery. Not the absence of the feeling. The absence of the dread of the feeling.</p>
<p>This is not a small thing. It is everything. A person who experiences anxiety but is not frightened of it is, in every meaningful sense, free. The anxiety is still there. The life is also there. Fully.</p>
<div class="weekes-quote">"I do not promise you a life without anxiety. I promise you something better — a life in which anxiety has lost its power to terrify you. That is worth more."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>The new relationship is being built through every float. Every time you allow the feeling to be present without catastrophe following, the relationship shifts. The feeling becomes more familiar. Familiarity reduces fear. Reduced fear means less second fear. Less second fear means smaller waves. Smaller waves means a quieter system over time.</p>
<p>This is the mechanism of recovery: not fighting the feeling into submission, but becoming so familiar with it, so unafraid of it, that it gradually loses its grip. Not because you conquered it. Because you stopped running from it.</p>`,
          task: { icon: '🤝', title: 'Describe the relationship now', body: "Write a description of your relationship with anxiety as it is today — not as it was on Lesson 1, and not as you wish it to be, but as it actually is right now. What is different? How do you meet the feeling now compared to before? Even the smallest shifts are real. Name them." },
          journal: "What would a healthy relationship with fear look like in your daily life — not the absence of anxiety, but a life where anxiety is present and has no power over your decisions? Write the specific, concrete details. Where would you go? What would you do? How would your days feel? That is what you are building toward.",
          mantra: "Anxiety no longer frightens me the way it did. The relationship is changing. I keep floating."
        }
      },
      {
        id: 21,
        title: "You Were Always Going to Be Okay",
        free: false,
        lesson: {
          part: 'Part 2 · The Float',
          intro: "The last lesson. The simplest. And the most true.",
          body: `<p>Here is what your entire track record tells you, across every panic attack you have ever had, across every alarm that has ever fired:</p>
<p><strong>You were always going to be okay.</strong></p>
<p>Not because you were strong enough, or brave enough, or handled it correctly. Because the threat was never real. Because the adrenaline always burned off. Because your body was always protecting you, not attacking you. Because the lie — however convincing, however total the certainty felt — was always just a lie.</p>
<p>Every catastrophe that anxiety promised never arrived. Every certain death was not death. Every imminent breakdown was not a breakdown. Every time you were convinced that this time was different — it wasn't. The prediction has been wrong one hundred percent of the time, in every single instance, without exception.</p>
<p>You were always going to be okay. You are okay. And you will be okay — not because anxiety will never return, but because you now know what it is. The mystery is gone. The bluff has been called. The smoke detector going off in an empty room is just a smoke detector going off in an empty room.</p>
<div class="weekes-quote">"Recovery is not the absence of feeling. It is the absence of fear about feeling. And that — that is freedom."<span class="weekes-attr">— Dr. Claire Weekes</span></div>
<p>The float is yours now. Not a technique you apply — a way of being with the feeling. Drop. Soften. Slow exhale. Stay. Let it move through you. It always passes.</p>
<p>The sensitised nervous system heals through accumulated safe experience. Every float you have done, every moment you stayed when you wanted to run, every time you said <em>I know what this is</em> — that is the data being written into the nervous system. The threshold is rising. The tide is going out.</p>
<p>Keep floating. Not forever. Just until the alarm fires less, and less hard, and with less certainty — until one day you notice that it has been a while, and the world has gotten a little bigger, and the feeling that used to own you is just a feeling. A passing wave in a calming sea.</p>
<p>You were always going to be okay. You always had this.</p>`,
          task: { icon: '✉️', title: 'Write a letter to Lesson 1 you', body: "Write a letter to yourself as you were at the beginning — frightened, confused, believing the complexity story, convinced something was deeply wrong. Tell them what you now know. Tell them about adrenaline, about the sensitised nervous system, about the bluff, about floating. Tell them the track record. Tell them they were always going to be okay. Mean every word." },
          journal: "Who are you now compared to who you were at Lesson 1? Not how anxious you feel — who you are in relation to the feeling. What do you understand? What do you do differently? What is the actual difference between then and now? Write it. That is your evidence. That is your recovery.",
          mantra: "I was always going to be okay. I know what this is. I float. The tide is going out."
        }
      }
    ]
  }
]

export function getAllLessons(): ProgramLesson[] {
  return PROGRAM.flatMap(part => part.lessons)
}

export function getLessonById(id: number): ProgramLesson | undefined {
  return getAllLessons().find(l => l.id === id)
}

export function getPartForLesson(id: number): Part | undefined {
  return PROGRAM.find(part => part.lessons.some(l => l.id === id))
}
