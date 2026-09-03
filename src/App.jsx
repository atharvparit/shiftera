import { useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  ClipboardList,
  Cloud,
  Database,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  MapPin,
  Menu,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  calcGap,
  courses,
  districts,
  gapClassification,
  getSkillEvidence,
  normalizeSkill,
  roleRequirements,
  skills,
} from './data/prototypeData';

const nav = [
  ['government', 'Government', ShieldAlert],
  ['dashboard', 'Overview', LayoutDashboard],
  ['intelligence', 'Skill Intelligence', BrainCircuit],
  ['student', 'Student Skill Gap', GraduationCap],
  ['curriculum', 'Curriculum Intelligence', BookOpen],
  ['about', 'Methodology', ClipboardList],
];

const tone = (priority) => {
  if (priority === 'Critical') return 'red';
  if (priority === 'High') return 'amber';
  if (priority === 'Moderate') return 'blue';
  return 'green';
};

const Pill = ({ children, tone: accent = 'blue' }) => (
  <span className={'pill ' + accent}>{children}</span>
);

const Select = ({ value, onChange }) => (
  <select value={value} onChange={(event) => onChange(event.target.value)}>
    {Object.keys(districts).map((district) => (
      <option key={district} value={district}>
        {district}
      </option>
    ))}
  </select>
);

function Page({ eyebrow, title, sub, action, children }) {
  return (
    <main>
      <header>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{sub}</p>
        </div>
        {action && <div>{action}</div>}
      </header>
      {children}
    </main>
  );
}

function Head({ title, text, action }) {
  return (
    <div className="head">
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      {action}
    </div>
  );
}

function EvidencePanel({ district, role, skill, priority = 'HIGH PRIORITY', explanation, onClose }) {
  const evidence = getSkillEvidence(district, role, skill);
  const signals = evidence.relevantEmployers;
  const aggregate = evidence.aggregate;
  const targetSkill = normalizeSkill(skill);
  const showLimitedState = !signals.length;
  const currentSkillInfo = aggregate.find((item) => normalizeSkill(item.skill) === targetSkill) || {
    skill,
    count: 0,
    total: evidence.totalEmployers || 1,
  };
  const priorityTone = priority.toLowerCase().includes('high') ? 'red' : priority.toLowerCase().includes('medium') ? 'amber' : 'blue';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="evidence-panel" onClick={(event) => event.stopPropagation()}>
        <div className="evidence-header">
          <div>
            <span className="eyebrow">SKILL EVIDENCE</span>
            <h3>{skill}</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close evidence panel">
            <X size={18} />
          </button>
        </div>

        <div className="evidence-meta">
          <Pill tone={priorityTone}>{priority}</Pill>
        </div>

        <div className="evidence-grid">
          <div className="evidence-stat">
            <span>Market</span>
            <strong>{district}</strong>
          </div>
          <div className="evidence-stat">
            <span>Target role</span>
            <strong>{role}</strong>
          </div>
        </div>

        <div className="evidence-section">
          <span className="eyebrow">EMPLOYER DEMAND SIGNALS</span>
          {showLimitedState ? (
            <div className="evidence-empty">
              <strong>Limited prototype evidence available for this role and market.</strong>
              <p>Production deployment would use verified labour-market and employer data.</p>
            </div>
          ) : (
            <div className="evidence-employers">
              {signals.map((entry) => (
                <div key={`${entry.employer}-${entry.role}`} className="evidence-employer">
                  <h4>{entry.employer}</h4>
                  <p>{entry.role}</p>
                  <div className="evidence-skill-list">
                    {entry.skills.map((item) => (
                      <span
                        key={`${entry.employer}-${item}`}
                        className={normalizeSkill(item) === targetSkill ? 'active' : ''}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="evidence-section">
          <span className="eyebrow">AGGREGATED SIGNAL</span>
          <div className="evidence-summary-row">
            <strong>{currentSkillInfo.count} / {currentSkillInfo.total}</strong>
            <span>representative employers</span>
          </div>
          <div className="aggregate-list">
            {aggregate.slice(0, 6).map((item) => (
              <div key={item.skill} className="aggregate-item">
                <span>{item.skill}</span>
                <strong>{item.count} / {item.total}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="evidence-explanation">
          <span className="eyebrow">WHY THIS SKILL?</span>
          <p>{explanation || `${skill} appears across representative employer signals in ${district}, reinforcing its value for the ${role} role.`}</p>
        </div>

        <p className="evidence-disclaimer">
          Prototype employer signals. Employer names and demand values are representative data for demonstrating the
          SkillBridge intelligence workflow.
        </p>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, value, label, warn = false }) {
  return (
    <div className="card kpi">
      <i className={warn ? 'warn' : ''}>
        <Icon size={20} />
      </i>
      <b>{value}</b>
      <span>{label}</span>
      <small>{warn ? 'Needs intervention' : 'Representative signal'}</small>
    </div>
  );
}

function DemandTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const signal = payload[0].payload;

  return (
    <div className="demand-tooltip">
      <b>{label}</b>
      <span>
        Current demand <strong>{signal.jobDemand.toLocaleString()}</strong>
      </span>
      <span>
        Forecast <strong>{signal.futureDemand.toLocaleString()} (+{signal.demandGrowth}%)</strong>
      </span>
      <span>
        Talent supply <strong>{signal.candidateSupply.toLocaleString()}</strong>
      </span>
      <span>
        Projected gap <strong>{calcGap(signal)}%</strong>
      </span>
    </div>
  );
}

function Chart({ data, forecast = false }) {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <BarChart data={data}>
        <CartesianGrid stroke="#e8edf5" vertical={false} />
        <XAxis dataKey="skill" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(value) => value.toLocaleString()} />
        <Tooltip content={<DemandTooltip />} />
        <Legend />
        <Bar dataKey="jobDemand" name="Current demand" fill="#2563d8" radius={[6, 6, 0, 0]} />
        {forecast && (
          <Bar dataKey="futureDemand" name="Forecast demand" fill="#7fa8ed" radius={[6, 6, 0, 0]} />
        )}
        <Bar dataKey="candidateSupply" name="Talent supply" fill="#c0cede" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function Dashboard({ district, setDistrict, go }) {
  const profile = districts[district];
  const top = profile.signals.slice(0, 4);
  const highest = [...profile.signals].sort((a, b) => calcGap(b) - calcGap(a))[0];
  const fastest = [...profile.signals].sort((a, b) => b.demandGrowth - a.demandGrowth)[0];

  return (
    <Page
      eyebrow="OVERVIEW"
      title="Workforce intelligence for demand-aware skilling"
      sub="SkillBridge aligns industry demand, student readiness, and curriculum reform across districts."
      action={<Select value={district} onChange={setDistrict} />}
    >
      <div className="notice">
        <Sparkles size={14} />
        SkillBridge prototype for Smart India Hackathon 2026 — problem statement 26134.
      </div>

      <div className="kpis">
        <Kpi icon={Database} value={profile.jobs.toLocaleString()} label="Demand signals tracked" />
        <Kpi icon={Target} value={profile.signals.length} label="Priority skills monitored" />
        <Kpi icon={ShieldAlert} value={`${calcGap(highest)}%`} label={`Highest gap · ${highest.skill}`} warn />
        <Kpi icon={TrendingUp} value={`+${fastest.demandGrowth}%`} label={`Fastest growth · ${fastest.skill}`} />
      </div>

      <section className="intelligence-card">
        <div>
          <span className="eyebrow">SKILLBRIDGE INTELLIGENCE</span>
          <h2>{highest.skill} is the most urgent market gap in {district}.</h2>
          <p>
            Forecast demand is rising faster than talent supply, creating a {calcGap(highest)}% workforce gap
            that requires action across curriculum, hiring, and skilling pathways.
          </p>
        </div>
        <div className="insight-metrics">
          <span>
            <b>{highest.futureDemand.toLocaleString()}</b>Forecast demand
          </span>
          <span>
            <b>{highest.candidateSupply.toLocaleString()}</b>Talent supply
          </span>
          <span>
            <b>+{highest.demandGrowth}%</b>Growth rate
          </span>
          <span>
            <b>{calcGap(highest)}%</b>Skill gap
          </span>
        </div>
        <div className="insight-action">
          <b>Recommended action</b>
          <p>Expand training capacity and refresh the corresponding curriculum modules.</p>
          <button className="primary" onClick={() => go('intelligence')}>
            View Skill Intelligence <ChevronRight size={17} />
          </button>
        </div>
      </section>

      <div className="grid two">
        <section className="card">
          <Head title="District demand outlook" text="Current demand → forecast demand → talent supply" />
          <Chart data={top} forecast />
          <p className="chart-insight">
            <b>{highest.skill}</b> currently shows the sharpest mismatch between demand and available talent in{' '}
            {district}.
          </p>
        </section>

        <section className="card">
          <Head title={`${district} priority skills`} text="Ranked by demand, growth and supply gap" />
          {[...profile.signals]
            .sort(
              (a, b) =>
                b.jobDemand + b.demandGrowth * 100 + calcGap(b) * 100 -
                (a.jobDemand + a.demandGrowth * 100 + calcGap(a) * 100),
            )
            .slice(0, 4)
            .map((signal, index) => (
              <div className="emerge" key={signal.skill}>
                <small>0{index + 1}</small>
                <b>{signal.skill}</b>
                <span>
                  <Pill tone={tone(gapClassification(signal))}>{gapClassification(signal)} gap</Pill>
                  +{signal.demandGrowth}%
                </span>
              </div>
            ))}
        </section>
      </div>
    </Page>
  );
}

function Intelligence({ district, setDistrict }) {
  const profile = districts[district];
  const signals = [...profile.signals].sort((a, b) => calcGap(b) - calcGap(a));
  const averageGap = Math.round(signals.reduce((sum, item) => sum + calcGap(item), 0) / signals.length);

  return (
    <Page
      eyebrow="MARKET EXPLORER"
      title="Skill Intelligence"
      sub="Explore district demand, talent supply, growth rates, and the gap behind each critical skill."
      action={<Select value={district} onChange={setDistrict} />}
    >
      <div className="notice">
        <MapPin size={14} />
        Representative market signals are used to demonstrate the SkillBridge decision model.
      </div>

      <div className="grid intel">
        <section className="card map-card">
          <Head title="District opportunity map" text="Select a district to refresh the intelligence model" />
          <div className="mapshape">
            {Object.keys(districts).map((item, index) => (
              <button
                key={item}
                type="button"
                className={item === district ? 'selected' : ''}
                onClick={() => setDistrict(item)}
                style={{ left: `${12 + (index % 3) * 29}%`, top: `${15 + Math.floor(index / 3) * 31}%` }}
              >
                {item.split(' ')[0]}
              </button>
            ))}
          </div>
          <p className="mapkey">● Selected district　○ Other representative cluster</p>
        </section>

        <section className="card insight-card">
          <Pill tone="red">{averageGap}% average gap</Pill>
          <Gauge size={36} />
          <h3>{district} District Insight</h3>
          <p>{profile.insight}</p>
          <div className="score">
            <i style={{ width: `${averageGap}%` }} />
          </div>
          <small>Sectors: {profile.sectors.join(' · ')}</small>
        </section>
      </div>

      <div className="grid two">
        <section className="card">
          <Head title="Demand vs supply outlook" text="Current demand → forecast demand → workforce supply" />
          <Chart data={signals.slice(0, 5)} forecast />
        </section>

        <section className="card">
          <Head title="Explainable priority factors" text="Transparent scoring for the market signal engine" />
          <div className="factor"><b>35%</b> Market demand</div>
          <div className="factor"><b>25%</b> Growth momentum</div>
          <div className="factor"><b>25%</b> Supply-demand gap</div>
          <div className="factor"><b>15%</b> Curriculum coverage</div>
          <p className="muted">
            District and role relevance determine which signals rise to the top of the SkillBridge priority stack.
          </p>
        </section>
      </div>
    </Page>
  );
}

function Government({ district, setDistrict }) {
  const [evidence, setEvidence] = useState(null);
  const profile = districts[district];
  const sortedSignals = [...profile.signals].sort((a, b) => calcGap(b) - calcGap(a));
  const highestGap = sortedSignals[0];
  const fastestGrowth = [...profile.signals].sort((a, b) => b.demandGrowth - a.demandGrowth)[0];
  const totalDemandSignals = profile.signals.reduce((sum, signal) => sum + signal.jobDemand, 0);
  const districtComparison = Object.entries(districts)
    .map(([name, item]) => {
      const averageGap = Math.round(item.signals.reduce((sum, signal) => sum + calcGap(signal), 0) / item.signals.length);
      const level = averageGap > 45 ? 'High' : averageGap >= 30 ? 'Moderate' : 'Low';
      return { district: name, gap: averageGap, level };
    })
    .sort((a, b) => b.gap - a.gap);

  const getPriorityLabel = (signal) => {
    if (!signal) return 'HIGH';
    if (signal.demandGrowth >= 15 || signal.skill === 'Cloud Computing') return 'HIGH';
    return calcGap(signal) > 45 ? 'HIGH' : 'MEDIUM';
  };

  const getPriorityTone = (signal) => {
    if (!signal) return 'amber';
    if (calcGap(signal) > 45 || signal.demandGrowth >= 15) return 'red';
    return 'amber';
  };

  const openEvidence = (signal) => {
    const role = signal.roles?.[0] || 'Java Backend Developer';
    setEvidence({
      district,
      role,
      skill: signal.skill,
      priority: getPriorityLabel(signal),
      explanation: `${signal.skill} shows strong market demand combined with a local talent gap and limited curriculum coverage in ${district}.`,
    });
  };

  const recommendationSkills = sortedSignals.slice(0, 3).map((signal) => signal.skill).join(', ');

  return (
    <Page
      eyebrow="GOVERNMENT"
      title="Government Skill Intelligence"
      sub="Identify district-level skill gaps and prioritize workforce development."
      action={<Select value={district} onChange={setDistrict} />}
    >
      <div className="notice">
        <MapPin size={14} />
        Prototype / Representative Data
      </div>

      <div className="kpis gov-kpis">
        <Kpi icon={Database} value={totalDemandSignals.toLocaleString()} label="Market demand signals" />
        <Kpi icon={Target} value={profile.signals.length.toString()} label="Priority skills" />
        <Kpi icon={ShieldAlert} value={`${calcGap(highestGap)}%`} label={`Highest skill gap · ${highestGap.skill}`} warn />
        <Kpi icon={TrendingUp} value={`+${fastestGrowth.demandGrowth}%`} label={`Fastest growing · ${fastestGrowth.skill}`} />
      </div>

      <div className="gov-lead-grid">
        <section className="card">
          <Head title="District Market Outlook" text="Representative demand signals by skill and forecast growth" />
          <Chart data={profile.signals.slice(0, 5)} forecast />
        </section>

        <section className="card gov-side-panel">
          <Head title="Decision flow" text="Market signals → demand → supply → skill gap → priority → action" />
          <div className="decision-flow">
            {['Market signals', 'Demand', 'Supply', 'Skill gap', 'Priority', 'Action'].map((step) => (
              <span key={step} className="flow-pill">{step}</span>
            ))}
          </div>

          <div className="gov-metrics-block">
            <div>
              <span className="eyebrow">Priority sectors</span>
              <ul className="gov-list">
                {profile.sectors.map((sector, index) => (
                  <li key={sector}>
                    <span>{index + 1}.</span>
                    <strong>{sector}</strong>
                    <Pill tone={index < 2 ? 'red' : 'amber'}>{index < 2 ? 'HIGH' : 'MEDIUM'}</Pill>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="eyebrow">Emerging skills</span>
              <ul className="gov-list compact">
                {profile.signals.slice(0, 4).map((signal) => (
                  <li key={signal.skill}>
                    <strong>{signal.skill}</strong>
                    <span>+{signal.demandGrowth}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="gov-two-col">
        <section className="card">
          <Head title="Priority Skills" text="Prototype priority factors based on demand, growth, supply gap and curriculum coverage" />
          <div className="priority-list">
            {sortedSignals.slice(0, 4).map((signal) => {
              const priorityLabel = getPriorityLabel(signal);
              return (
                <div key={signal.skill} className="priority-item">
                  <div className="priority-copy">
                    <b>{signal.skill}</b>
                    <p>
                      {signal.skill} shows strong market demand combined with a local talent gap and limited curriculum
                      coverage in {district}.
                    </p>
                  </div>
                  <div className="priority-meta">
                    <Pill tone={getPriorityTone(signal)}>{priorityLabel}</Pill>
                    <button type="button" className="text-button" onClick={() => openEvidence(signal)}>
                      View Evidence
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="prototype-factors">
            <span className="eyebrow">Prototype priority factors</span>
            <div className="factor-grid">
              <div className="factor"><b>35%</b> Demand</div>
              <div className="factor"><b>25%</b> Growth</div>
              <div className="factor"><b>25%</b> Supply Gap</div>
              <div className="factor"><b>15%</b> Curriculum Gap</div>
            </div>
          </div>
        </section>

        <section className="card recommendation-card">
          <span className="eyebrow">SKILLBRIDGE RECOMMENDATION</span>
          <h3>{district} Market</h3>
          <p>
            Prioritize backend development and data-oriented training programs, with emphasis on {recommendationSkills}.
          </p>
          <div className="recommendation-actions">
            <h4>Recommended Actions</h4>
            <ol>
              <li>Expand training capacity</li>
              <li>Modernize relevant curriculum</li>
              <li>Prioritize high-gap skills</li>
              <li>Monitor emerging skill demand</li>
            </ol>
          </div>
        </section>
      </div>

      <section className="card">
        <Head title="District Skill Gaps" text="Skill demand, supply and gap classification drawn from the district intelligence model" />
        <div className="table-wrap">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Demand</th>
                <th>Supply</th>
                <th>Gap</th>
                <th>Gap %</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedSignals.slice(0, 6).map((signal) => (
                <tr key={signal.skill}>
                  <td>{signal.skill}</td>
                  <td>{signal.jobDemand > 3500 ? 'High' : signal.jobDemand > 2200 ? 'Medium' : 'Low'}</td>
                  <td>{signal.candidateSupply > 2200 ? 'High' : signal.candidateSupply > 1500 ? 'Medium' : 'Low'}</td>
                  <td>{calcGap(signal) > 45 ? 'High' : calcGap(signal) >= 30 ? 'Moderate' : 'Low'}</td>
                  <td>{calcGap(signal)}%</td>
                  <td><Pill tone={getPriorityTone(signal)}>{getPriorityLabel(signal)}</Pill></td>
                  <td>{calcGap(signal) > 45 ? 'Prioritize training' : 'Expand training'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="gov-two-col">
        <section className="card">
          <Head title="Training Priority" text="What the government and training ecosystem should do next" />
          <div className="mini-table">
            <div className="mini-row mini-head">
              <span>Skill</span>
              <span>Demand</span>
              <span>Supply</span>
              <span>Gap</span>
              <span>Action</span>
            </div>
            {sortedSignals.slice(0, 4).map((signal) => (
              <div key={`${signal.skill}-training`} className="mini-row">
                <span>{signal.skill}</span>
                <span>{signal.jobDemand > 3500 ? 'High' : 'Medium'}</span>
                <span>{signal.candidateSupply > 2200 ? 'High' : 'Medium'}</span>
                <span>{calcGap(signal)}%</span>
                <span>{calcGap(signal) > 45 ? 'Expand training' : 'Increase seats'}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <Head title="District Comparison" text="Representative district-level intensity of workforce gaps" />
          <div className="comparison-list">
            {districtComparison.map((item) => (
              <div key={item.district} className="comparison-row">
                <span>{item.district}</span>
                <strong>{item.level}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <p className="gov-disclaimer">
        Representative prototype data — intended to demonstrate the SkillBridge workforce-intelligence workflow.
      </p>

      {evidence && (
        <EvidencePanel
          district={evidence.district}
          role={evidence.role}
          skill={evidence.skill}
          priority={evidence.priority}
          explanation={evidence.explanation}
          onClose={() => setEvidence(null)}
        />
      )}
    </Page>
  );
}

function Student({ district }) {
  const [role, setRole] = useState('Java Backend Developer');
  const [location, setLocation] = useState(district);
  const [chosen, setChosen] = useState(['Java', 'HTML', 'CSS', 'Python']);
  const [done, setDone] = useState(false);
  const [evidence, setEvidence] = useState(null);

  const profile = districts[location];
  const core = roleRequirements[role];

  const recommendations = useMemo(() => {
    const market = profile.signals.filter((signal) => signal.roles.includes(role));
    const bySkill = new Map(market.map((signal) => [signal.skill, signal]));

    const coreItems = core.map((skill) => ({
      skill,
      source: 'CORE ROLE SKILL',
      signal: bySkill.get(skill),
      score: bySkill.get(skill) ? 80 + calcGap(bySkill.get(skill)) / 5 : 65,
    }));

    const marketItems = market
      .filter((signal) => !core.includes(signal.skill))
      .map((signal) => ({
        skill: signal.skill,
        source: signal.demandGrowth >= 15 ? 'EMERGING SKILL' : 'DISTRICT MARKET SKILL',
        signal,
        score: 45 + calcGap(signal) / 3,
      }));

    return [...coreItems, ...marketItems].sort((a, b) => b.score - a.score);
  }, [core, profile.signals, role]);

  const missing = recommendations.filter((item) => !chosen.includes(item.skill));
  const matched = core.filter((skill) => chosen.includes(skill));
  const completion = Math.round((matched.length / core.length) * 100);
  const strengths = chosen.filter((skill) => core.includes(skill));

  const getPriorityMeta = (item) => {
    if (!item.signal) return { label: 'HIGH PRIORITY', tone: 'amber' };
    if (item.source === 'EMERGING SKILL' || item.signal.demandGrowth >= 15) return { label: 'EMERGING', tone: 'blue' };
    if (calcGap(item.signal) >= 35) return { label: 'HIGH PRIORITY', tone: 'red' };
    return { label: 'MEDIUM PRIORITY', tone: 'amber' };
  };

  const getExplanation = (item) => {
    if (!item.signal) return 'Frequently requested for the selected role and local market.';
    if (item.source === 'EMERGING SKILL' || item.signal.demandGrowth >= 15) {
      return 'Emerging demand signal with strong local momentum and a clear market fit opportunity.';
    }
    if (calcGap(item.signal) >= 30) {
      return 'Strong representative employer signal + curriculum gap + local supply gap.';
    }
    return 'Common supporting skill across relevant employer signals for the selected market.';
  };

  const openEvidence = (item) => {
    const priorityMeta = getPriorityMeta(item);
    setEvidence({
      district: location,
      role,
      skill: item.skill,
      priority: priorityMeta.label,
      explanation: getExplanation(item),
    });
  };

  const toggleSkill = (skill) => {
    setChosen((current) =>
      current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill],
    );
  };

  return (
    <Page
      eyebrow="PERSONALIZED PATHWAY"
      title="Find your skill gap"
      sub="Match role ambitions with local market priorities and identify the shortest path to readiness."
    >
      <div className="student">
        <section className="card form-card">
          <label>
            Target role
            <select value={role} onChange={(event) => { setRole(event.target.value); setDone(false); setEvidence(null); }}>
              {Object.keys(roleRequirements).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Target market
            <select value={location} onChange={(event) => { setLocation(event.target.value); setDone(false); setEvidence(null); }}>
              {Object.keys(districts).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <b>Current skills</b>
          <div className="chips">
            {skills.map((skill) => (
              <button
                key={skill}
                type="button"
                className={chosen.includes(skill) ? 'chosen' : ''}
                onClick={() => toggleSkill(skill)}
              >
                {chosen.includes(skill) && <Check size={13} />}
                {skill}
              </button>
            ))}
          </div>

          <button className="primary" onClick={() => setDone(true)}>
            Analyze my skill gap <ChevronRight size={17} />
          </button>
          <p className="prototype-note">Representative prototype data</p>
        </section>

        {done && (
          <section className="card result-card">
            <div className="result-head">
              <span className="eyebrow">READINESS SCORE</span>
              <h3>{completion}% match for {role}</h3>
            </div>

            <div className="score-bar">
              <i style={{ width: `${completion}%` }} />
            </div>

            <div className="analysis-grid">
              <div className="analysis-card">
                <span className="eyebrow">YOUR MARKET FIT</span>
                <h4>{role}</h4>
                <p>{location} Market</p>
                <div className="market-fit-row">
                  <strong>{completion}%</strong>
                  <span>Market Match</span>
                </div>
              </div>

              <div className="analysis-card">
                <span className="eyebrow">YOUR CURRENT STRENGTHS</span>
                <div className="strength-list">
                  {strengths.length ? strengths.map((skill) => (
                    <span key={skill} className="strength-item">
                      ✓ {skill}
                    </span>
                  )) : <span className="strength-item">Add current skills to map readiness.</span>}
                </div>
              </div>
            </div>

            <div className="recommend-block">
              <span className="eyebrow">PRIORITY SKILL GAPS</span>
              <div className="recommend">
                {missing.slice(0, 5).map((item) => {
                  const priorityMeta = getPriorityMeta(item);
                  return (
                    <div key={item.skill} className="recommend-item">
                      <div className="recommend-copy">
                        <b>{item.skill}</b>
                        <small>{item.source}</small>
                        <p>{getExplanation(item)}</p>
                      </div>
                      <div className="recommend-actions">
                        <Pill tone={priorityMeta.tone}>{priorityMeta.label}</Pill>
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => openEvidence(item)}
                        >
                          View Evidence
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="roadmap-block">
              <span className="eyebrow">RECOMMENDED ROADMAP</span>
              <ol className="roadmap-list">
                {missing.slice(0, 4).map((item, index) => (
                  <li key={`${item.skill}-roadmap`} className="roadmap-item">
                    <span className="roadmap-index">{String(index + 1).padStart(2, '0')}</span>
                    <div className="roadmap-copy">
                      <b>{item.skill}</b>
                      <small>{getPriorityMeta(item).label}</small>
                    </div>
                    <button type="button" className="text-button" onClick={() => openEvidence(item)}>
                      View Evidence
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </div>

      {evidence && (
        <EvidencePanel
          district={evidence.district}
          role={evidence.role}
          skill={evidence.skill}
          priority={evidence.priority}
          explanation={evidence.explanation}
          onClose={() => setEvidence(null)}
        />
      )}
    </Page>
  );
}

function Curriculum({ district, setDistrict }) {
  const [course, setCourse] = useState('Java Development');
  const [generated, setGenerated] = useState(false);

  const selectedCourse = courses[course];
  const profile = districts[district];

  const marketSignals = useMemo(
    () =>
      selectedCourse.core.map((skill) => {
        const match = profile.signals.find((signal) => signal.skill === skill);
        return (
          match || {
            skill,
            jobDemand: 0,
            demandGrowth: 0,
            candidateSupply: 0,
            priority: 'Moderate',
            futureDemand: 0,
            sector: 'Role baseline',
          }
        );
      }),
    [profile.signals, selectedCourse.core],
  );

  const gaps = selectedCourse.core.filter((skill) => selectedCourse.coverage[skill] !== 'Strong');
  const modernize = selectedCourse.legacy.length;
  const analyzed = selectedCourse.core.length;
  const coverageScore = Object.values(selectedCourse.coverage).reduce((total, value) => {
    if (value === 'Strong') return total + 1;
    if (value === 'Partial') return total + 0.5;
    return total;
  }, 0);
  const alignment = Math.round((coverageScore / analyzed) * 100);

  const recommendation = [...gaps]
    .map((skill) => ({ skill, signal: marketSignals.find((signal) => signal.skill === skill) }))
    .sort((a, b) => (b.signal?.jobDemand || 0) - (a.signal?.jobDemand || 0));

  return (
    <Page
      eyebrow="CURRICULUM INTELLIGENCE"
      title="See where curriculum falls behind industry demand."
      sub="SkillBridge compares the academic path with local market demand and identifies the highest-value updates."
    >
      <div className="course">
        <label>
          Course
          <select value={course} onChange={(event) => { setCourse(event.target.value); setGenerated(false); }}>
            {Object.keys(courses).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Market
          <Select value={district} onChange={(value) => { setDistrict(value); setGenerated(false); }} />
        </label>

        <div className="alignment-box">
          <b>{alignment}%</b>
          <span>
            Industry alignment
            <small>{alignment < 60 ? 'Needs modernization' : 'Partially aligned'}</small>
          </span>
        </div>
      </div>

      <div className="kpis curriculum-kpis">
        <Kpi icon={Target} value={analyzed} label="Skills analyzed" />
        <Kpi icon={ShieldAlert} value={gaps.length} label="Curriculum gaps" warn />
        <Kpi icon={BookOpen} value={modernize} label="Modules to modernize" />
      </div>

      <section className="card">
        <Head title="Curriculum → market gap" text={`${district} market signals mapped against ${course}`} />
        <div className="table market-table">
          <div className="row tablehead">
            <span>Skill</span>
            <span>Demand</span>
            <span>Forecast</span>
            <span>Coverage</span>
            <span>Status</span>
          </div>

          {marketSignals.map((signal) => {
            const coverage = selectedCourse.coverage[signal.skill];
            const status = coverage === 'Strong' ? 'green' : coverage === 'Partial' ? 'amber' : 'red';

            return (
              <div className="row" key={signal.skill}>
                <b>{signal.skill}</b>
                <span>{signal.jobDemand.toLocaleString()}</span>
                <span>
                  {signal.futureDemand.toLocaleString()} <small>+{signal.demandGrowth}%</small>
                </span>
                <span>{coverage || 'None'}</span>
                <Pill tone={status}>{coverage || 'Gap'}</Pill>
              </div>
            );
          })}
        </div>
      </section>

      {selectedCourse.legacy.length > 0 && (
        <section className="card legacy">
          <Head title="Legacy module guidance" text="Modernization priorities for outdated training content" />
          {selectedCourse.legacy.map((module) => (
            <div key={module.skill}>
              <b>{module.skill}</b>
              <p>{module.text}</p>
            </div>
          ))}
        </section>
      )}

      <button className="primary generate" onClick={() => setGenerated(true)}>
        Generate curriculum update summary <ChevronRight size={17} />
      </button>

      {generated && (
        <section className="card update-summary">
          <Head title="Recommended update plan" text="Priority actions ranked against local market demand" />
          <ol>
            {recommendation.slice(0, 4).map((item) => (
              <li key={item.skill}>
                {item.skill} — {item.signal ? `${item.signal.futureDemand.toLocaleString()} projected demand` : 'Priority gap'}
              </li>
            ))}
          </ol>
          <p>Update the curriculum to cover the highest-demand skills first and add applied projects to validate learner readiness.</p>
        </section>
      )}
    </Page>
  );
}

function About() {
  const pipeline = [
    'Industry demand',
    'Skill intelligence',
    'Supply / demand gap',
    'Curriculum alignment',
    'Student skill gap',
    'Recommendations',
    'Human validation',
    'Outcomes',
    'Continuous learning',
  ];

  return (
    <Page
      eyebrow="TRUST & TRANSPARENCY"
      title="How SkillBridge works"
      sub="A product architecture that turns labour-market signals into curriculum and talent decisions."
    >
      <div className="grid two">
        <section className="card">
          <h3>SkillBridge product flow</h3>
          <div className="pipeline-list">
            {pipeline.map((step, index) => (
              <p className="item" key={step}>
                <i>{index + 1}</i>
                {step}
              </p>
            ))}
          </div>
        </section>

        <section className="card">
          <h3>Production-ready architecture</h3>
          <div className="pipeline-list">
            {['Labour market data', 'NLP + skill extraction', 'Demand modelling', 'Supply analysis', 'Gap detection', 'Curriculum recommendations', 'Human review'].map((step, index) => (
              <p className="item" key={step}>
                <i>{index + 1}</i>
                {step}
              </p>
            ))}
          </div>
        </section>
      </div>

      <section className="card tech">
        <div>
          <h3>Current prototype</h3>
          <p>React · JavaScript · Local structured data · Recharts · Rule-based intelligence model</p>
        </div>
        <div>
          <h3>Future production stack</h3>
          <p>Spring Boot · PostgreSQL · Python · scikit-learn · NLP pipelines · LLM explanation layer</p>
        </div>
      </section>

      <p className="disclaimer">
        This demo reflects representative prototype data for Smart India Hackathon 2026. The product is designed for a
        future production pipeline and should not be treated as an official labour-market statistic release.
      </p>
    </Page>
  );
}

export default function App() {
  const [page, setPage] = useState('government');
  const [district, setDistrict] = useState('Pune');
  const [mobile, setMobile] = useState(false);

  const content =
    page === 'government' ? (
      <Government district={district} setDistrict={setDistrict} />
    ) : page === 'dashboard' ? (
      <Dashboard district={district} setDistrict={setDistrict} go={setPage} />
    ) : page === 'intelligence' ? (
      <Intelligence district={district} setDistrict={setDistrict} />
    ) : page === 'student' ? (
      <Student district={district} />
    ) : page === 'curriculum' ? (
      <Curriculum district={district} setDistrict={setDistrict} />
    ) : (
      <About />
    );

  return (
    <div className="app-shell">
      <aside className={mobile ? 'open' : ''}>
        <div className="brand">
          <i>
            <BarChart3 size={19} />
          </i>
          <div>
            SkillBridge
            <small>Shift Era</small>
          </div>
          <button type="button" onClick={() => setMobile(false)}>
            <X />
          </button>
        </div>

        <nav>
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              className={page === id ? 'active' : ''}
              onClick={() => {
                setPage(id);
                setMobile(false);
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <footer>
          <Cloud size={17} />
          <span>SkillBridge prototype</span>
          <small>Shift Era · SIH 2026</small>
        </footer>
      </aside>

      <div className="content-panel">
        <button className="menu" type="button" onClick={() => setMobile(true)}>
          <Menu />
        </button>
        {content}
      </div>
    </div>
  );
}
