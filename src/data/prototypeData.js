// Prototype / representative signals. Fields mirror a future ML-ready market-intelligence pipeline.
const signal=(skill,jobDemand,demandGrowth,candidateSupply,sector,roles,o={})=>({skill,jobDemand,demandGrowth,candidateSupply,trainingCount:o.trainingCount||Math.round(candidateSupply/18),placementCount:o.placementCount||Math.round(candidateSupply/6),employerCount:o.employerCount||Math.round(jobDemand/95),sector,roles,curriculumCoverage:o.curriculumCoverage??'None',trend:o.trend||'Growing',priority:o.priority||'High',futureDemand:o.futureDemand||Math.round(jobDemand*(1+demandGrowth/100))})
export const normalizeSkill=(value='')=>String(value).trim().replace(/\s+/g,' ').toLowerCase()
export const employerSignals={
 Pune:[
  {employer:'Pune CloudWorks',role:'Cloud Engineer',district:'Pune',skills:['AWS','Docker','Kubernetes','Terraform','Git'],signalType:'representative'},
  {employer:'Deccan Software Systems',role:'Cloud Engineer',district:'Pune',skills:['AWS','Docker','Linux','Git','Terraform'],signalType:'representative'},
  {employer:'Maharashtra Cloud Systems',role:'Cloud Engineer',district:'Pune',skills:['AWS','Docker','Kubernetes','Git','Python'],signalType:'representative'},
  {employer:'Sapphire Cloud Labs',role:'Cloud Engineer',district:'Pune',skills:['AWS','Docker','Git','Kubernetes','Linux'],signalType:'representative'},
  {employer:'Pune DevOps Grid',role:'DevOps Engineer',district:'Pune',skills:['AWS','Docker','Kubernetes','Git','Terraform'],signalType:'representative'},
  {employer:'NovaPeak Systems',role:'Java Backend Developer',district:'Pune',skills:['Java','SQL','Spring Boot','REST APIs','Git'],signalType:'representative'},
  {employer:'Pune Technology Group',role:'Java Backend Developer',district:'Pune',skills:['Java','SQL','Spring Boot','PostgreSQL','Git'],signalType:'representative'},
  {employer:'Western Digital Labs',role:'Data Analyst',district:'Pune',skills:['Python','SQL','Data Analytics','Excel','Git'],signalType:'representative'},
  {employer:'Deccan Digital Works',role:'Full Stack Developer',district:'Pune',skills:['JavaScript','React','REST APIs','Git','Docker'],signalType:'representative'}
 ],
 Mumbai:[
  {employer:'HarborGrid Systems',role:'Cloud Engineer',district:'Mumbai',skills:['AWS','Docker','Kubernetes','Git','Terraform'],signalType:'representative'},
  {employer:'MetroSignal Labs',role:'Data Analyst',district:'Mumbai',skills:['Python','SQL','Data Analytics','Excel','Git'],signalType:'representative'},
  {employer:'Mumbai Digital Works',role:'Data Analyst',district:'Mumbai',skills:['Python','SQL','Tableau','Git','Data Analytics'],signalType:'representative'},
  {employer:'FinEdge Analytics',role:'Data Analyst',district:'Mumbai',skills:['Python','SQL','Data Analytics','Power BI','Git'],signalType:'representative'},
  {employer:'Bharat Metrics',role:'Data Analyst',district:'Mumbai',skills:['Python','SQL','Data Analytics','Excel','Tableau'],signalType:'representative'},
  {employer:'Silverline Finance',role:'Cybersecurity Analyst',district:'Mumbai',skills:['Cybersecurity','Python','Git','SQL','Threat Modeling'],signalType:'representative'},
  {employer:'Nexora Fintech',role:'Java Backend Developer',district:'Mumbai',skills:['Java','SQL','Spring Boot','REST APIs','Git'],signalType:'representative'},
  {employer:'Northline Systems',role:'Software Engineer',district:'Mumbai',skills:['Java','Git','REST APIs','SQL','Docker'],signalType:'representative'}
 ],
 Nagpur:[
  {employer:'Central India Systems',role:'Data Analyst',district:'Nagpur',skills:['Python','SQL','Data Analytics','Excel','Git'],signalType:'representative'},
  {employer:'Vidarbha Digital Solutions',role:'Software Engineer',district:'Nagpur',skills:['Java','SQL','Spring Boot','PostgreSQL','Git'],signalType:'representative'},
  {employer:'OrangeByte Technologies',role:'Backend Developer',district:'Nagpur',skills:['Java','Spring Boot','REST APIs','Docker','Git'],signalType:'representative'},
  {employer:'Nagpur CloudWorks',role:'Cloud Engineer',district:'Nagpur',skills:['AWS','Docker','Linux','Git','Kubernetes'],signalType:'representative'},
  {employer:'Central Tech Systems',role:'Java Backend Developer',district:'Nagpur',skills:['Java','SQL','Spring Boot','REST APIs','Git'],signalType:'representative'},
  {employer:'MahaTech Logistics',role:'Data Analyst',district:'Nagpur',skills:['Python','SQL','Data Analytics','Tableau','Git'],signalType:'representative'},
  {employer:'Indigo Digital Systems',role:'Java Backend Developer',district:'Nagpur',skills:['Java','SQL','REST APIs','Git','PostgreSQL'],signalType:'representative'},
  {employer:'Nagpur Tech Edge',role:'Java Backend Developer',district:'Nagpur',skills:['Java','Spring Boot','SQL','Docker','Git'],signalType:'representative'}
 ],
 Nashik:[
  {employer:'PrecisionForge Systems',role:'Java Backend Developer',district:'Nashik',skills:['Java','SQL','Docker','Git','REST APIs'],signalType:'representative'},
  {employer:'IndusFlow Labs',role:'Cloud Engineer',district:'Nashik',skills:['Cloud Computing','AWS','Docker','Git','Python'],signalType:'representative'},
  {employer:'Saffron Automation',role:'Data Analyst',district:'Nashik',skills:['Python','SQL','Data Analytics','Industrial IoT','Git'],signalType:'representative'},
  {employer:'ValleyWorks Systems',role:'AI/ML Engineer',district:'Nashik',skills:['Python','Machine Learning','SQL','Docker','Git'],signalType:'representative'},
  {employer:'Nashik Manufacturing Works',role:'Industrial Automation Engineer',district:'Nashik',skills:['Industrial Automation','Python','SQL','PLC','Data Analytics'],signalType:'representative'},
  {employer:'ShreeWorks Tech',role:'Software Engineer',district:'Nashik',skills:['Java','Git','REST APIs','SQL','Docker'],signalType:'representative'}
 ],
 Kolhapur:[
  {employer:'Shivaji Industrial Systems',role:'Java Backend Developer',district:'Kolhapur',skills:['Java','SQL','Spring Boot','REST APIs','Git'],signalType:'representative'},
  {employer:'Kolhapur Digital Works',role:'Java Backend Developer',district:'Kolhapur',skills:['Java','SQL','Git','REST APIs','Docker'],signalType:'representative'},
  {employer:'Western India Software Labs',role:'Backend Developer',district:'Kolhapur',skills:['Java','SQL','Spring Boot','Docker','Git'],signalType:'representative'},
  {employer:'Deccan Technology Systems',role:'Software Engineer',district:'Kolhapur',skills:['Java','SQL','PostgreSQL','Git','Docker'],signalType:'representative'},
  {employer:'K-Works Technology',role:'Backend Developer',district:'Kolhapur',skills:['Java','SQL','REST APIs','Docker','Git'],signalType:'representative'},
  {employer:'Sahyadri Industrial Automation',role:'Industrial Automation Engineer',district:'Kolhapur',skills:['Industrial Automation','Python','SQL','Data Analytics','PLC'],signalType:'representative'}
 ],
 Solapur:[
  {employer:'Pearl Digital Systems',role:'Full Stack Developer',district:'Solapur',skills:['JavaScript','React','REST APIs','Git','Docker'],signalType:'representative'},
  {employer:'Horizon Services',role:'Cloud Engineer',district:'Solapur',skills:['Cloud Computing','AWS','Docker','Python','Git'],signalType:'representative'},
  {employer:'SolapurEdge Analytics',role:'Data Analyst',district:'Solapur',skills:['Python','SQL','Data Analytics','Git','Excel'],signalType:'representative'},
  {employer:'S3 Digital',role:'Java Backend Developer',district:'Solapur',skills:['Java','Spring Boot','REST APIs','Git','Docker'],signalType:'representative'},
  {employer:'Solapur Industrial Systems',role:'Automation Engineer',district:'Solapur',skills:['Industrial Automation','Python','SQL','Data Analytics','PLC'],signalType:'representative'},
  {employer:'Southern IT Works',role:'Software Engineer',district:'Solapur',skills:['Java','Git','REST APIs','SQL','Docker'],signalType:'representative'}
 ],
 'Chhatrapati Sambhajinagar':[
  {employer:'Sutra Manufacturing',role:'Java Backend Developer',district:'Chhatrapati Sambhajinagar',skills:['Java','SQL','Spring Boot','REST APIs','Git'],signalType:'representative'},
  {employer:'PulseForge Systems',role:'Data Analyst',district:'Chhatrapati Sambhajinagar',skills:['Python','SQL','Data Analytics','Git','Excel'],signalType:'representative'},
  {employer:'Riverstone Automation',role:'Industrial Engineer',district:'Chhatrapati Sambhajinagar',skills:['Industrial Automation','Python','SQL','Data Analytics','PLC'],signalType:'representative'},
  {employer:'Meridian Tech',role:'Cloud Engineer',district:'Chhatrapati Sambhajinagar',skills:['Cloud Computing','AWS','Docker','Git','Linux'],signalType:'representative'},
  {employer:'Deccan Works Systems',role:'Software Engineer',district:'Chhatrapati Sambhajinagar',skills:['Java','Git','REST APIs','SQL','Docker'],signalType:'representative'},
  {employer:'Aurora Industrial Labs',role:'Automation Engineer',district:'Chhatrapati Sambhajinagar',skills:['Industrial Automation','Python','PLC','SQL','Data Analytics'],signalType:'representative'}
 ]
}
export const districts={
 Pune:{jobs:8240,sectors:['Software product','AI services','Engineering'],roles:['Java Backend Developer','Cloud Engineer','Data Analyst','AI/ML Engineer'],skills:['AI / ML','Cloud Computing','Data Engineering','Spring Boot','DevOps','Docker','SQL'],insight:'Software, AI/ML and cloud roles create the strongest representative shortage signals.',signals:[signal('AI / ML',8240,18,2910,'AI services',['AI/ML Engineer'],{priority:'Critical'}),signal('Cloud Computing',6720,15,3500,'Software product',['Cloud Engineer','Java Backend Developer']),signal('Data Engineering',6400,17,2900,'Software product',['Data Analyst']),signal('Spring Boot',5900,12,3300,'Software product',['Java Backend Developer']),signal('DevOps',5100,16,2600,'Engineering',['Cloud Engineer']),signal('Docker',4600,14,2850,'Engineering',['Java Backend Developer','Cloud Engineer'],{priority:'Moderate'}),signal('SQL',5400,8,4300,'Software product',['Java Backend Developer','Data Analyst'],{priority:'Moderate'})],employerSignals:employerSignals.Pune},
 Mumbai:{jobs:7960,sectors:['FinTech','Financial services','Enterprise technology'],roles:['Cybersecurity Analyst','Cloud Engineer','Data Analyst','Java Backend Developer'],skills:['Cybersecurity','Cloud Computing','Data Analytics','API Security','Java','AI / ML','SQL'],insight:'Cybersecurity, cloud and analytics are prominent representative signals in this financial-services market.',signals:[signal('Cybersecurity',6800,19,3500,'Financial services',['Cybersecurity Analyst'],{priority:'Critical'}),signal('Cloud Computing',7580,14,4100,'Enterprise technology',['Cloud Engineer','Java Backend Developer']),signal('Data Analytics',6300,13,4100,'FinTech',['Data Analyst']),signal('API Security',4300,18,1700,'FinTech',['Java Backend Developer','Cybersecurity Analyst']),signal('Java',5500,9,3900,'Enterprise technology',['Java Backend Developer'],{priority:'Moderate'}),signal('AI / ML',5900,12,3200,'FinTech',['AI/ML Engineer']),signal('SQL',5700,7,4400,'FinTech',['Java Backend Developer','Data Analyst'],{priority:'Moderate'})],employerSignals:employerSignals.Mumbai},
 Nagpur:{jobs:4210,sectors:['Logistics technology','IT services','Public digital services'],roles:['Java Backend Developer','Software Engineer','Cloud Engineer','Data Analyst'],skills:['Cloud Computing','Data Analytics','Logistics Technology','Java','Cybersecurity','Python','SQL'],insight:'Cloud, analytics and logistics technology lead this representative market profile.',signals:[signal('Cloud Computing',3880,16,2050,'IT services',['Cloud Engineer','Java Backend Developer']),signal('Data Analytics',3650,15,2200,'Logistics technology',['Data Analyst']),signal('Logistics Technology',3400,18,1700,'Logistics technology',['Data Analyst']),signal('Java',3100,10,2200,'IT services',['Java Backend Developer'],{priority:'Moderate'}),signal('Cybersecurity',2900,14,1650,'Public digital services',['Cybersecurity Analyst']),signal('Python',2800,12,1900,'IT services',['Data Analyst','AI/ML Engineer'],{priority:'Moderate'}),signal('SQL',3000,7,2450,'Logistics technology',['Java Backend Developer','Data Analyst'],{priority:'Moderate'})],employerSignals:employerSignals.Nagpur},
 Nashik:{jobs:3120,sectors:['Industrial automation','Manufacturing technology','IT services'],roles:['Java Backend Developer','Cloud Engineer','Data Analyst','AI/ML Engineer'],skills:['Data Analytics','Automation','Industrial IoT','Cloud Computing','Java','Python','SQL'],insight:'Automation, analytics and industrial IoT shape this representative district signal.',signals:[signal('Data Analytics',2810,15,1610,'Manufacturing technology',['Data Analyst']),signal('Automation',2700,18,1320,'Industrial automation',['Java Backend Developer']),signal('Industrial IoT',2520,20,1180,'Industrial automation',['Cloud Engineer'],{priority:'Critical'}),signal('Cloud Computing',2440,13,1530,'IT services',['Cloud Engineer','Java Backend Developer']),signal('Java',2300,9,1700,'IT services',['Java Backend Developer'],{priority:'Moderate'}),signal('Python',2150,11,1510,'Manufacturing technology',['Data Analyst','AI/ML Engineer'],{priority:'Moderate'}),signal('SQL',2250,6,1840,'Manufacturing technology',['Java Backend Developer','Data Analyst'],{priority:'Moderate'})],employerSignals:employerSignals.Nashik},
 Kolhapur:{jobs:2040,sectors:['Industrial technology','IT services','Manufacturing'],roles:['Java Backend Developer','Full Stack Developer','Automation Engineer','Embedded Systems Engineer'],skills:['Software Development','Data Analytics','Industrial Automation','Cloud Computing','Java','SQL'],insight:'Software development and industrial technology are the strongest representative needs.',signals:[signal('Software Development',1850,13,1220,'IT services',['Java Backend Developer','Full Stack Developer']),signal('Data Analytics',1760,14,1140,'Manufacturing',['Data Analyst']),signal('Industrial Automation',1680,17,970,'Industrial technology',['Java Backend Developer']),signal('Cloud Computing',1480,12,1050,'IT services',['Cloud Engineer'],{priority:'Moderate'}),signal('Java',1420,8,1160,'IT services',['Java Backend Developer'],{priority:'Moderate'}),signal('SQL',1480,7,1240,'Manufacturing',['Java Backend Developer','Data Analyst'],{priority:'Moderate'})],employerSignals:employerSignals.Kolhapur},
 Solapur:{jobs:1860,sectors:['Digital services','IT services','SME technology'],roles:['Full Stack Developer','Cloud Engineer','Data Analyst','Java Backend Developer'],skills:['Software Development','Data Analytics','Cloud Computing','Digital Services','Java','SQL'],insight:'Digital services, cloud adoption and analytics lead this representative local signal.',signals:[signal('Software Development',1600,13,1100,'IT services',['Java Backend Developer','Full Stack Developer']),signal('Data Analytics',1510,14,1020,'Digital services',['Data Analyst']),signal('Cloud Computing',1420,15,940,'Digital services',['Cloud Engineer']),signal('Digital Services',1350,16,900,'SME technology',['Full Stack Developer']),signal('Java',1180,7,980,'IT services',['Java Backend Developer'],{priority:'Moderate'}),signal('SQL',1230,6,1020,'Digital services',['Java Backend Developer','Data Analyst'],{priority:'Moderate'})],employerSignals:employerSignals.Solapur},
 'Chhatrapati Sambhajinagar':{jobs:2760,sectors:['Manufacturing technology','IT services','Industrial systems'],roles:['Java Backend Developer','Data Analyst','Industrial Engineer','Cloud Engineer'],skills:['Java Backend','Data Analytics','Manufacturing Technology','Cloud Computing','Spring Boot','SQL'],insight:'Java backend, data analytics and manufacturing technology have distinct representative demand signals.',signals:[signal('Java Backend',2650,16,1450,'IT services',['Java Backend Developer']),signal('Data Analytics',2500,14,1510,'Manufacturing technology',['Data Analyst']),signal('Manufacturing Technology',2380,18,1190,'Industrial systems',['Java Backend Developer']),signal('Cloud Computing',2190,15,1420,'IT services',['Cloud Engineer','Java Backend Developer']),signal('Spring Boot',2100,15,1100,'IT services',['Java Backend Developer']),signal('SQL',2050,8,1650,'Manufacturing technology',['Java Backend Developer','Data Analyst'],{priority:'Moderate'})],employerSignals:employerSignals['Chhatrapati Sambhajinagar']}
}
export const roleRequirements={'Java Backend Developer':['Java','SQL','Spring Boot','REST APIs','Git','Docker'],'Full Stack Developer':['JavaScript','HTML','CSS','React','REST APIs','Git','Docker'],'Data Analyst':['Python','SQL','Data Analytics','Git'],'AI/ML Engineer':['Python','Machine Learning','SQL','Docker','Git'],'Cloud Engineer':['AWS','Docker','Git','Python'],'Cybersecurity Analyst':['Cybersecurity','Python','Git','SQL']}
export const skills=['Java','Python','JavaScript','HTML','CSS','SQL','Git','Spring Boot','REST APIs','React','Docker','AWS','Machine Learning','Data Analytics','Cybersecurity']
export const courses={'Java Backend Development':{primaryRole:'Java Backend Developer',modules:['Java Basics','OOP','Collections','JDBC','Spring Boot','REST APIs','SQL'],core:['Java','Spring Boot','REST APIs','SQL','Git','Docker'],coverage:{Java:'Strong', 'Spring Boot':'None', 'REST APIs':'None', SQL:'Partial', Git:'None', Docker:'None'},legacy:[{skill:'Servlets',text:'Lower current market relevance. Review for modernization in favor of Spring Boot-based architecture.'},{skill:'JSP',text:'Lower current market relevance. Review for modernization toward modern API-driven backend workflows.'}]},'Full Stack Development':{primaryRole:'Full Stack Developer',modules:['HTML','CSS','JavaScript','React','Node Basics','REST APIs'],core:['JavaScript','HTML','CSS','React','REST APIs','Git','Docker'],coverage:{JavaScript:'Strong',HTML:'Strong',CSS:'Strong',React:'None','REST APIs':'None',Git:'Partial',Docker:'None'},legacy:[{skill:'PHP Basics',text:'Lower current market relevance. Review for modernization toward JavaScript-driven full-stack delivery.'}]},'Data Analytics':{primaryRole:'Data Analyst',modules:['Excel','Statistics','SQL Basics','Data Visualization'],core:['SQL','Python','Data Analytics','Git'],coverage:{SQL:'Partial',Python:'None','Data Analytics':'Strong',Git:'None'},legacy:[]},'Cloud & DevOps':{primaryRole:'Cloud Engineer',modules:['Linux','Networking','AWS','Docker','CI/CD'],core:['Cloud Computing','AWS','Docker','Git','Python'],coverage:{'Cloud Computing':'Partial',AWS:'None',Docker:'None',Git:'Partial',Python:'None'},legacy:[{skill:'Legacy VM provisioning',text:'Lower current market relevance. Review for modernization toward cloud-native delivery and automation.'}]},'Industrial Automation':{primaryRole:'Automation Engineer',modules:['PLC Basics','Sensors','Industrial IoT','Python','Automation'],core:['Industrial Automation','Python','SQL','Data Analytics','Docker'],coverage:{'Industrial Automation':'Partial',Python:'None',SQL:'Partial','Data Analytics':'None',Docker:'None'},legacy:[{skill:'Manual process tracking',text:'Lower current market relevance. Review for modernization toward connected industrial workflows and analytics.'}]},'AI & ML':{primaryRole:'AI/ML Engineer',modules:['Python Basics','Linear Algebra','Machine Learning'],core:['Python','Machine Learning','Docker','Cloud Computing'],coverage:{Python:'Strong','Machine Learning':'Strong',Docker:'None','Cloud Computing':'None'},legacy:[]},'Web Development':{primaryRole:'Full Stack Developer',modules:['HTML','CSS','JavaScript','PHP'],core:['JavaScript','React','REST APIs','Git','Docker'],coverage:{JavaScript:'Strong',React:'None','REST APIs':'None',Git:'None',Docker:'None'},legacy:[]}}
export const calcGap=s=>Math.max(0,Math.round((s.futureDemand-s.candidateSupply)/s.futureDemand*100))
export const gapClassification=s=>{let gap=calcGap(s);return gap>45?'High':gap>=30?'Moderate':'Low'}
export const getDistrictMarketData=(district='Pune')=>({
  district,
  sectors: districts[district]?.sectors || [],
  roles: districts[district]?.roles || [],
  skills: districts[district]?.skills || [],
  employerSignals: districts[district]?.employerSignals || [],
  signals: districts[district]?.signals || []
})
export const readCompanySubmissions=()=>{
  if (typeof window === 'undefined' || !window.localStorage) return []
  try {
    const stored=JSON.parse(window.localStorage.getItem('skillbridge-company-submissions') || '[]')
    if(!Array.isArray(stored)) return []
    return stored.map((item={})=>{
      const required=Array.isArray(item.requiredSkills)?item.requiredSkills:[]
      const preferred=Array.isArray(item.preferredSkills)?item.preferredSkills:[]
      const emerging=Array.isArray(item.emergingSkills)?item.emergingSkills:[]
      const companyValue=item.company || item.companyName || item.employer || 'Company'
      const skills=[...required,...preferred,...emerging].map(skill=>String(skill).trim()).filter(Boolean)
      return {
        ...item,
        company: companyValue,
        companyName: item.companyName || companyValue,
        employer: item.employer || companyValue,
        district: item.district || 'Pune',
        role: item.role || 'Java Backend Developer',
        requiredSkills: required.map(skill=>String(skill).trim()).filter(Boolean),
        preferredSkills: preferred.map(skill=>String(skill).trim()).filter(Boolean),
        emergingSkills: emerging.map(skill=>String(skill).trim()).filter(Boolean),
        skills,
        signalType: item.signalType || 'company-submitted signal'
      }
    })
  } catch {
    return []
  }
}
export const getCombinedEmployerSignals=(district='Pune',role=null,submittedSignals=readCompanySubmissions())=>{
  const districtSignals=[...(employerSignals[district] || []), ...(Array.isArray(submittedSignals) ? submittedSignals : []).filter(item=>normalizeSkill(item.district)===normalizeSkill(district))]
  if(!role) return districtSignals

  const normalizedRole=normalizeSkill(role)
  const matches=getRoleMatches(normalizedRole)
  const exactRoleSignals=districtSignals.filter(item=>matches.includes(normalizeSkill(item.role)))
  if(exactRoleSignals.length) return exactRoleSignals

  const roleTokens=normalizedRole.split(/\s+/).filter(token=>token.length>2 && !['and','for','the'].includes(token))
  const fallback=districtSignals.filter(item=>{
    const entryRole=normalizeSkill(item.role)
    return roleTokens.some(token=>entryRole.includes(token))
  })
  return fallback.length ? fallback : districtSignals
}
const roleFamilyMap={
  'java backend developer':['java backend developer','backend developer','software engineer','java developer','backend engineer'],
  'cloud engineer':['cloud engineer','devops engineer','cloud architect','site reliability engineer','cloud infrastructure engineer'],
  'full stack developer':['full stack developer','software engineer','frontend developer','backend developer','web developer'],
  'data analyst':['data analyst','business analyst','analytics engineer','data specialist','reporting analyst'],
  'software engineer':['software engineer','full stack developer','backend developer','frontend developer','application engineer'],
  'cybersecurity analyst':['cybersecurity analyst','security analyst','network security engineer','information security analyst'],
  'industrial automation engineer':['industrial automation engineer','automation engineer','industrial engineer','controls engineer'],
  'embedded systems engineer':['embedded systems engineer','embedded engineer','electronics engineer','controls engineer'],
  'cad/cam engineer':['cad/cam engineer','design engineer','manufacturing engineer','mechanical design engineer'],
  'automation engineer':['automation engineer','industrial automation engineer','industrial engineer','controls engineer'],
  'ai/ml engineer':['ai/ml engineer','machine learning engineer','data scientist','analytics engineer'],
  'data scientist':['data scientist','data analyst','ai/ml engineer','analytics engineer'],
  'cloud architect':['cloud architect','cloud engineer','devops engineer','site reliability engineer']
}

const getRoleMatches=(role='')=>{
  const normalized=normalizeSkill(role)
  if(!normalized) return []
  const family=roleFamilyMap[normalized]||[]
  return Array.from(new Set([normalized, ...family].map(item=>normalizeSkill(item)).filter(Boolean)))
}

export const getEmployerSignals=(district='Pune',role=null,submittedSignals=[] )=>{
  const districtSignals=[...(employerSignals[district]||[]), ...(submittedSignals||[]).filter(item=>normalizeSkill(item.district)===normalizeSkill(district))]
  if(!role) return districtSignals

  const normalizedRole=normalizeSkill(role)
  const matches=getRoleMatches(normalizedRole)
  const exactRoleSignals=districtSignals.filter(item=>matches.includes(normalizeSkill(item.role)))
  if(exactRoleSignals.length) return exactRoleSignals

  const roleTokens=normalizedRole.split(/\s+/).filter(token=>token.length>2 && !['and','for','the'].includes(token))
  const fallback=districtSignals.filter(item=>{
    const entryRole=normalizeSkill(item.role)
    return roleTokens.some(token=>entryRole.includes(token))
  })
  return fallback.length ? fallback : districtSignals
}
export const calculateSkillDemand=(skill,empSignals=[] )=>{
  const normalizedSkill=normalizeSkill(skill)
  const total=empSignals.length
  const count=empSignals.filter(item=>item.skills.some(entry=>normalizeSkill(entry)===normalizedSkill)).length
  return { skill:String(skill).trim(), total, count, frequency: total ? count/total : 0 }
}
export const getSkillEvidence=(district='Pune',role=null,skill='Spring Boot',submittedSignals=[] )=>{
  const signals=getEmployerSignals(district,role,submittedSignals)
  const targetSkill=normalizeSkill(skill)
  const relevant=signals.filter(item=>item.skills.some(entry=>normalizeSkill(entry)===targetSkill))
  const roleSet=new Set(relevant.map(item=>String(item.role).trim()))
  const aggregate=Array.from(new Set(signals.flatMap(item=>item.skills))).map(itemSkill=>({
    skill:itemSkill,
    count:signals.filter(item=>item.skills.some(entry=>normalizeSkill(entry)===normalizeSkill(itemSkill))).length,
    total:signals.length || 1
  })).sort((a,b)=>b.count-a.count||a.skill.localeCompare(b.skill))
  const representativeCount=relevant.filter(item=>item.signalType==='representative').length
  const companyCount=relevant.filter(item=>item.signalType==='company-submitted signal').length
  return {
    district,
    role,
    skill: String(skill).trim(),
    totalEmployers: signals.length,
    totalRelevantEmployers: relevant.length,
    relevantEmployers: relevant,
    relatedRoles: [...roleSet],
    aggregate,
    sourceSummary: {
      representative: representativeCount,
      companySubmitted: companyCount,
      total: relevant.length
    }
  }
}
