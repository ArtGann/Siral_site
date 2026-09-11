import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, ArrowUpRight, ArrowLeft, Check, Compass, X, Plus } from '@phosphor-icons/react';
import { services, process } from './content';

const priorities = [
  { label: 'Win more customers', detail: 'Audience, visibility and a clearer path to inquiry.', slug: 'digital-marketing', foundation: 'marketing-strategy' },
  { label: 'Find a clear direction', detail: 'Business priorities, decisions and the next stage.', slug: 'business-consulting', foundation: 'business-consulting' },
  { label: 'Strengthen our brand', detail: 'Positioning, identity and a consistent message.', slug: 'brand-development', foundation: 'marketing-strategy' },
  { label: 'Improve what’s working', detail: 'Customer journeys, performance and continuity.', slug: 'growth-optimization', foundation: 'business-consulting' },
];
const stages = [
  { label: 'We need a plan', detail: 'Help us decide where to focus first.', key: 'plan' },
  { label: 'We’re ready to act', detail: 'We have a direction and want to move it forward.', key: 'act' },
  { label: 'We need a long-term partner', detail: 'Keep business and marketing moving together.', key: 'partner' },
];

export function ServiceFinder() {
  const dialog = useRef(null), heading = useRef(null), trigger = useRef(null);
  const [step, setStep] = useState(0), [goal, setGoal] = useState(null), [stage, setStage] = useState(null), [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => { if (open) heading.current?.focus(); }, [step, open]);
  function close() { dialog.current?.close(); setOpen(false); trigger.current?.focus(); }
  const choice = goal === null ? null : priorities[goal];
  const selectedStage = stage === null ? null : stages[stage];
  const service = choice && selectedStage && services.find(s => s.slug === (selectedStage.key === 'plan' ? choice.foundation : choice.slug));
  const companion = selectedStage?.key === 'partner' ? services.find(s => s.slug === 'ongoing-support') : null;
  const inquiry = service ? '/contact-us/?' + new URLSearchParams({ service: service.slug, ...(companion ? { plan: 'growth-partnership' } : {}), message: `Our priority: ${choice.label}.\nWhere we are: ${selectedStage.label}.\nWe would like to explore ${service.name}${companion ? ' with ongoing support' : ''}.` }) : '/contact-us/';
  return <>
    <section className="finder-invite container" aria-labelledby="finder-title" data-reveal>
      <div className="finder-mark"><Compass size={36} weight="light"/></div>
      <div><p className="eyebrow">Your business. Your starting point.</p><h2 id="finder-title">Let’s connect the right expertise.</h2><p>Two questions. A more focused first conversation.</p></div>
      <button ref={trigger} className="button" onClick={() => setOpen(true)}>Find my starting point <ArrowRight size={20}/></button>
    </section>
    <dialog ref={dialog} className="finder-dialog" aria-labelledby="finder-heading" onCancel={close} onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={e => { if (e.target === dialog.current) { const r=dialog.current.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(); } }}>
      <div className="finder-dialog-top"><span className="eyebrow">SIRAL · Your starting point</span><button className="icon-button" aria-label="Close service finder" onClick={close}><X size={23}/></button></div>
      <div className="finder-progress" aria-label={`Step ${step + 1} of 3`}><span style={{'--progress': (step + 1) / 3}}/></div>
      <div className="finder-body" key={step}>
        <p className="eyebrow finder-step">0{step + 1} / 03 · {['Your priority', 'Your context', 'A direction to explore'][step]}</p>
        <h2 ref={heading} id="finder-heading" tabIndex={-1}>{['What would you like to move forward?', 'Where are you right now?', 'A clear place to begin.'][step]}</h2>
        {step < 2 ? <><p className="finder-description">{step === 0 ? 'Choose the priority closest to your business.' : 'Choose the kind of support that would be most useful.'}</p><div className="finder-options" role="group" aria-label={step === 0 ? 'Your priority' : 'Your context'}>{(step === 0 ? priorities : stages).map((o, i) => <button key={o.label} aria-pressed={(step === 0 ? goal : stage) === i} onClick={() => step === 0 ? setGoal(i) : setStage(i)}><span className="choice-number">0{i + 1}</span><span><strong>{o.label}</strong><small>{o.detail}</small></span><span className="choice-check">{(step === 0 ? goal : stage) === i ? <Check size={19}/> : <Plus size={19}/>}</span></button>)}</div></> : <>
          <p className="finder-description">Based on your priority and the support you’re looking for.</p>
          <div className="finder-result"><span className="eyebrow">Start with</span><h3>{service.name}</h3><p>{service.short}</p><a className="inline-link" href={'/services/' + service.slug + '/'} onClick={close}>Explore this expertise <ArrowUpRight size={17}/></a></div>
          {companion && <p className="finder-companion"><Check size={19}/><span>Connect this with <strong>Ongoing Support</strong> to keep priorities and reviews moving together.</span></p>}
          <p className="finder-result-note">A starting point for discussion. We’ll confirm the right scope together.</p>
        </>}
        <div className="finder-actions"><button className="text-link" onClick={() => step ? setStep(step - 1) : close()}><ArrowLeft size={16}/>{step ? 'Back' : 'Not now'}</button>{step < 2 ? <button className="button" disabled={(step === 0 ? goal : stage) === null} onClick={() => setStep(step + 1)}>{step ? 'See my starting point' : 'Continue'}<ArrowRight size={18}/></button> : <a className="button" href={inquiry} onClick={close}>Discuss this direction <ArrowRight size={18}/></a>}</div>
      </div>
    </dialog>
  </>;
}

export function ProcessExplorer() {
  const [active, setActive] = useState(0);
  return <div className="home-process" data-reveal><p className="eyebrow">A thoughtful process. A practical plan.</p><h2>Clarity at every step.</h2><p className="process-hint">Explore how the work moves forward.</p><div className="process-explorer">{process.map((p, i) => <div key={p.name} className={'explorer-step ' + (active === i ? 'active' : '')}><h3><button aria-expanded={active === i} aria-controls={'explorer-' + i} onClick={() => setActive(active === i ? -1 : i)}><span className="step-num">0{i + 1}</span><span>{p.name}</span><Plus size={20}/></button></h3><div className="explorer-detail" id={'explorer-' + i} aria-hidden={active !== i} inert={active !== i}><div><p>{p.text}</p><div className="explorer-output"><span className="eyebrow">What moves you forward</span><p>{p.output}</p></div></div></div></div>)}</div><a className="text-link" href="/approach/">See the full approach <ArrowUpRight size={17}/></a></div>;
}

export function ExperienceMotion({ motion, location }) {
  const progress = useRef(null), [showTop, setShowTop] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        progress.current?.style.setProperty('--read-progress', distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0);
        setShowTop(window.scrollY > window.innerHeight);
      });
    };
    const resize = new ResizeObserver(update);
    resize.observe(document.body);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [location]);
  useEffect(() => {
    const site = document.querySelector('.site');
    const visibility = () => site?.classList.toggle('page-paused', document.hidden);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('animation-paused', !e.isIntersecting)));
    document.querySelectorAll('.hero-art').forEach(e => observer.observe(e));
    return () => { document.removeEventListener('visibilitychange', visibility); observer.disconnect(); };
  }, [location]);
  return <><div className="reading-progress" ref={progress} aria-hidden="true"/><button className={'back-to-top ' + (showTop ? 'visible' : '')} aria-label="Back to top" tabIndex={showTop ? 0 : -1} aria-hidden={!showTop} onClick={() => { window.scrollTo({ top: 0, behavior: motion ? 'smooth' : 'instant' }); document.querySelector('.skip-link')?.focus({ preventScroll: true }); }}><ArrowUp size={19}/></button></>;
}
