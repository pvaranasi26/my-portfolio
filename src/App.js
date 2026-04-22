import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [revealElements, setRevealElements] = useState(new Set());
  const [kpi, setKpi] = useState({ years: 0, sites: 0, pp: 0, awards: 0 });
  const kpiStarted = useRef(false);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setRevealElements(prev => new Set([...prev, entry.target]));
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const kpiEl = document.querySelector('.hero-kpi-grid');
    if (kpiEl) {
      const kpiObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !kpiStarted.current) {
          kpiStarted.current = true;
          const duration = 1800;
          const start = Date.now();
          const targets = { years: 17, sites: 3, pp: 4, awards: 3 };
          const tick = () => {
            const p = Math.min((Date.now() - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setKpi({
              years: Math.floor(eased * targets.years),
              sites: Math.floor(eased * targets.sites),
              pp: Math.floor(eased * targets.pp),
              awards: Math.floor(eased * targets.awards),
            });
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      }, { threshold: 0.5 });
      kpiObserver.observe(kpiEl);

      // scroll-triggered entrance for skill quadrants (staggered)
      const skillObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            skillObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      document.querySelectorAll('.skill-quadrant').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.12}s`;
        skillObs.observe(el);
      });

      // scroll-triggered entrance for cert cards (3-D flip staggered)
      const certObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            certObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.cert-card').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
        certObs.observe(el);
      });

      return () => {
        revealObserver.disconnect();
        kpiObserver.disconnect();
        skillObs.disconnect();
        certObs.disconnect();
      };
    }
    return () => revealObserver.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <a className="nav-brand" onClick={() => scrollToSection('top')}>PKV</a>
        <ul className="nav-links">
          <li><a onClick={() => scrollToSection('about')}>About</a></li>
          <li><a onClick={() => scrollToSection('skills')}>Skills</a></li>
          <li><a onClick={() => scrollToSection('experience')}>Experience</a></li>
          <li><a onClick={() => scrollToSection('certifications')}>Certifications</a></li>
          <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-geo" aria-hidden="true" />
        <div className="hero-main">
          <div className="hero-content">
            <div className="hero-tag">Power Platform Architect</div>
            <h1>Pradeep Kumar<br/><em>Varanasi</em></h1>
            <p className="hero-sub">
              Senior Microsoft technology architect with <strong>17+ years</strong> delivering enterprise solutions
              across banking, energy, and oil &amp; gas. Specialized in Power Platform architecture,
              SharePoint modernization, and Azure integration.
            </p>
            <div className="hero-badges">
              <span className="badge">Power Apps &amp; Power Automate</span>
              <span className="badge">Microsoft Dataverse</span>
              <span className="badge">SharePoint Online</span>
              <span className="badge">Azure Integration</span>
              <span className="badge">Enterprise ALM &amp; Governance</span>
              <span className="badge">Copilot in Power Apps</span>
            </div>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollToSection('experience')}>View Experience</button>
              <button className="btn-outline" onClick={() => scrollToSection('contact')}>Get in Touch</button>
            </div>
          </div>
          <div className="hero-photo">
            <img src="/profile.jpg" alt="Pradeep Kumar Varanasi" className="profile-circle"/>
          </div>
        </div>
        <div className="hero-kpi-grid">
          <div className="kpi-card">
            <div className="kpi-value">{kpi.years}+</div>
            <div className="kpi-label">Years Experience</div>
            <div className="kpi-sub">Enterprise delivery</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{kpi.sites}K+</div>
            <div className="kpi-label">Sites Migrated</div>
            <div className="kpi-sub">Zero data loss</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{kpi.pp}+</div>
            <div className="kpi-label">Power Platform</div>
            <div className="kpi-sub">Years architecting</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{kpi.awards}</div>
            <div className="kpi-label">Industry Awards</div>
            <div className="kpi-sub">Best Performer · Star</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-label">01 — About</div>
        <div className="section-title">Architecture that <span>scales</span></div>
        <div className="about-grid">
          <div className={`about-text reveal ${revealElements.has(document.querySelector('.about-text')) ? 'visible' : ''}`}>
            <p>Senior Power Platform Architect and M365 Solutions Lead currently at <strong>First Horizon National Bank (FHN)</strong> in Memphis, TN, leading two concurrent enterprise initiatives in a regulated banking environment.</p>
            <p>Deep expertise in <strong>end-to-end Power Platform architecture</strong> — data modeling, security design, ALM governance, deployment pipelines — and large-scale SharePoint modernization spanning 3,000+ site collections across banking, energy, and oil &amp; gas sectors.</p>
            <p>Architected solutions adopted as <strong>reference architecture by enterprise teams</strong>. Trusted by enterprise architects and business leadership to own end-to-end decisions from POC through production.</p>
            <p>Currently leveraging <strong>Copilot in Power Apps</strong> via Power Apps Premium license for AI-assisted app building and Dataverse natural language queries.</p>
          </div>
          <div className="about-highlights">
            <div className={`highlight-card reveal ${revealElements.has(document.querySelector('.highlight-card')) ? 'visible' : ''}`}>
              <h4>SharePoint Modernization</h4>
              <p>Leading migration of ~2,500 site collections at FHN. Previously led 400-site migration at LG&amp;E. Zero data loss. Banking-grade compliance.</p>
            </div>
            <div className={`highlight-card reveal ${revealElements.has(document.querySelector('.highlight-card:nth-child(2)')) ? 'visible' : ''}`}>
              <h4>Power Platform Architecture</h4>
              <p>Architected enterprise Audit Risk Assessment Platform (Power Apps, Power Automate, Dataverse) — adopted as FHN reference architecture for future projects.</p>
            </div>
            <div className={`highlight-card reveal ${revealElements.has(document.querySelector('.highlight-card:nth-child(3)')) ? 'visible' : ''}`}>
              <h4>Azure &amp; Databricks Integration</h4>
              <p>Evaluated Power Platform → Azure Databricks connectivity via VNet, private endpoints, service principal. Recommendation adopted org-wide.</p>
            </div>
            <div className={`highlight-card reveal ${revealElements.has(document.querySelector('.highlight-card:nth-child(4)')) ? 'visible' : ''}`}>
              <h4>Team Leadership</h4>
              <p>Led 10–12 person onsite/offshore delivery teams at M&amp;T Bank and Chevron. Best Performer and Star Performance award recipient.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-bg">
        <div className="section-label">02 — Competencies</div>
        <div className="section-title">Core <span>Technical Skills</span></div>
        <div className="skills-intro">4 domains · 49 competencies across the Microsoft enterprise stack</div>
        <div className="skills-grid">
          <div className="skill-quadrant pp" data-num="01">
            <div className="skill-quadrant-head">
              <h3>▸ Power Platform Architecture</h3>
              <span className="skill-count">14 skills</span>
            </div>
            <div className="skill-tag-cloud">
              <span className="skill-tag">Power Apps Canvas</span>
              <span className="skill-tag">Power Apps Model-Driven</span>
              <span className="skill-tag">Power Automate</span>
              <span className="skill-tag">Microsoft Dataverse</span>
              <span className="skill-tag">Power BI</span>
              <span className="skill-tag">Power Pages</span>
              <span className="skill-tag">ALM &amp; DevOps</span>
              <span className="skill-tag">Managed Solutions</span>
              <span className="skill-tag">Environment Variables</span>
              <span className="skill-tag">DLP Policies</span>
              <span className="skill-tag">Center of Excellence (CoE)</span>
              <span className="skill-tag">Service Principal Strategy</span>
              <span className="skill-tag">Copilot in Power Apps</span>
              <span className="skill-tag">Deployment Pipelines</span>
            </div>
          </div>
          <div className="skill-quadrant sp" data-num="02">
            <div className="skill-quadrant-head">
              <h3>▸ SharePoint &amp; M365</h3>
              <span className="skill-count">13 skills</span>
            </div>
            <div className="skill-tag-cloud">
              <span className="skill-tag">SharePoint Online</span>
              <span className="skill-tag">SPFx Web Parts</span>
              <span className="skill-tag">Application Customizers</span>
              <span className="skill-tag">Tenant-Wide Extensions</span>
              <span className="skill-tag">Large-Scale Migrations</span>
              <span className="skill-tag">Sharegate</span>
              <span className="skill-tag">SPMT</span>
              <span className="skill-tag">PnP PowerShell</span>
              <span className="skill-tag">InfoPath → Power Apps</span>
              <span className="skill-tag">Nintex → Power Automate</span>
              <span className="skill-tag">Hub Sites</span>
              <span className="skill-tag">Viva Connections</span>
              <span className="skill-tag">Document IDs &amp; Sets</span>
            </div>
          </div>
          <div className="skill-quadrant az" data-num="03">
            <div className="skill-quadrant-head">
              <h3>▸ Azure &amp; Integration</h3>
              <span className="skill-count">10 skills</span>
            </div>
            <div className="skill-tag-cloud">
              <span className="skill-tag">Azure Databricks</span>
              <span className="skill-tag">Azure AD / Entra ID</span>
              <span className="skill-tag">App Registrations</span>
              <span className="skill-tag">Managed Identity</span>
              <span className="skill-tag">Service Principals</span>
              <span className="skill-tag">REST APIs</span>
              <span className="skill-tag">Microsoft Graph API</span>
              <span className="skill-tag">Azure DevOps CI/CD</span>
              <span className="skill-tag">VNet Integration</span>
              <span className="skill-tag">Private Endpoints</span>
            </div>
          </div>
          <div className="skill-quadrant dev" data-num="04">
            <div className="skill-quadrant-head">
              <h3>▸ Development Background</h3>
              <span className="skill-count">12 skills</span>
            </div>
            <div className="skill-tag-cloud">
              <span className="skill-tag">C#</span>
              <span className="skill-tag">ASP.NET</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">ReactJS</span>
              <span className="skill-tag">PowerShell (PnP)</span>
              <span className="skill-tag">CSOM</span>
              <span className="skill-tag">SQL Server</span>
              <span className="skill-tag">SSIS</span>
              <span className="skill-tag">SSRS</span>
              <span className="skill-tag">AngularJS</span>
              <span className="skill-tag">jQuery</span>
              <span className="skill-tag">ADO.NET</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label">03 — Career</div>
        <div className="section-title">Professional <span>Experience</span></div>
        <div className="exp-timeline">
          <div className="exp-item reveal">
            <div className="exp-meta">
              <span className="exp-company">First Horizon National Bank (FHN)</span>
              <span className="exp-dates">Nov 2023 — Present</span>
            </div>
            <div className="exp-title">Power Platform Architect / SharePoint Technical Lead · Memphis, TN</div>
            <div className="exp-sub">SharePoint Modernization Program</div>
            <ul className="exp-bullets">
              <li>Leading enterprise migration of <strong>~2,500 site collections</strong> from SharePoint 2016 On-Prem and 2019 SPSE to SharePoint Online — zero data loss, banking-grade compliance</li>
              <li>Retiring legacy platforms: <strong>InfoPath → Power Apps</strong>, <strong>Nintex / OOTB → Power Automate</strong></li>
              <li>Preserved <strong>Document IDs and Document Sets</strong> — compliance-critical, rarely achieved at this scale</li>
              <li>Implemented tenant-wide <strong>SPFx application customizer</strong>, Hub Sites, Viva Connections, and PnP-based provisioning</li>
              <li>Built PowerShell governance scripts used directly in leadership reporting</li>
              <li>Implemented <strong>CI/CD DevOps pipelines</strong> for SPFx and Power Platform ALM</li>
            </ul>
            <div className="exp-sub">Audit Risk Assessment Platform</div>
            <ul className="exp-bullets">
              <li>Architected enterprise <strong>Audit Risk Assessment</strong> application — Power Apps, Power Automate, Dataverse — multi-role: Preparer, Approver, Admin</li>
              <li>Designed normalized <strong>Dataverse schema</strong>, security model (roles + Azure AD groups), multi-stage approval workflows</li>
              <li>Designed full <strong>ALM strategy</strong>: managed solutions, environment variables, Deployment Pipelines (Dev → Test → Prod)</li>
              <li>POC'd Power Platform → Azure Databricks; Dataverse-only model <strong>adopted as reference architecture at FHN</strong></li>
              <li>Led architecture reviews with enterprise architects, data, and security teams — solution approved as org standard</li>
            </ul>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <span className="exp-company">LG&amp;E and KU</span>
              <span className="exp-dates">Feb 2020 — Nov 2023</span>
            </div>
            <div className="exp-title">Senior SharePoint &amp; Power Platform Developer · Louisville, KY</div>
            <ul className="exp-bullets">
              <li>Led migration of <strong>~400 site collections + 150 BI sites</strong> (SharePoint 2013 → Online) using Sharegate</li>
              <li>Modernized <strong>Nintex forms → Power Apps</strong> and <strong>Nintex workflows → Power Automate</strong> including complex onboarding workflows</li>
              <li>Migrated <strong>SSRS → Power BI</strong>; implemented Power Pages for internal/external websites with role-based auth</li>
              <li>Built standalone batch migration PowerShell scripts for large-scale automated content migration</li>
            </ul>
            <div className="exp-tech"><span>Technologies:</span> SharePoint 2013/2019/Online · Power Apps · Power Automate · Power BI · Power Pages · Nintex · Sharegate · SPFx · PowerShell</div>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <span className="exp-company">M&amp;T Bank</span>
              <span className="exp-dates">Jul 2016 — Jan 2020</span>
            </div>
            <div className="exp-title">Senior Software Engineer — SharePoint · Buffalo, NY</div>
            <ul className="exp-bullets">
              <li>Led <strong>10-person onsite/offshore team</strong> delivering SharePoint 2013 enterprise application for RM Workbench</li>
              <li>Developed provider-hosted apps (CSOM, JSOM, REST API); built custom web parts, event receivers, SP Timer jobs</li>
              <li>Implemented SharePoint role-based security; built Master Page customizations with jQuery, Bootstrap, HTML5</li>
              <li>🏆 <strong>Best Performer</strong> recognition — M&amp;T Bank</li>
            </ul>
            <div className="exp-tech"><span>Technologies:</span> SharePoint 2013/Online · C# · CSOM · JSOM · REST API · AngularJS · D3.js · SQL Server · IIS · TFS</div>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <span className="exp-company">Chevron</span>
              <span className="exp-dates">Oct 2014 — Jul 2016</span>
            </div>
            <div className="exp-title">Senior SharePoint Developer · Bakersfield, CA</div>
            <ul className="exp-bullets">
              <li>Led <strong>12-person onsite/offshore team</strong> on Mobility &amp; Decision Support Applications</li>
              <li>Migrated SharePoint 2010 → SP2013 provider-hosted model; built SSRS reports and custom AngularJS components</li>
              <li>Implemented InfoPath tracking apps; configured SharePoint 2013 Workflows via Workflow Manager</li>
            </ul>
          </div>

          <div className="exp-item reveal">
            <div className="exp-meta">
              <span className="exp-company">Infosys Limited</span>
              <span className="exp-dates">Jan 2011 — Oct 2014</span>
            </div>
            <div className="exp-title">Technology Lead · Clients: Marathon Petroleum (OH) · NDSL (India)</div>
            <ul className="exp-bullets">
              <li>Led SDLC across Request Tracker, Recommendation Tracker, Verification &amp; Validation SharePoint systems</li>
              <li>Prevented SQL timeout on <strong>1M+ row</strong> tables using NOLOCK patterns; managed Linked Servers for migration</li>
              <li>🏆 <strong>Star Performance</strong> award — Infosys</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="skills-bg">
        <div className="section-label">04 — Credentials</div>
        <div className="section-title">Certifications &amp; <span>Education</span></div>
        <div className="certs-grid">
          <div className="cert-card featured">
            <div className="cert-badge">MCSE</div>
            <div className="cert-name">Microsoft Certified Solution Expert — SharePoint</div>
            <div className="cert-status active">Active credential</div>
          </div>
          <div className="cert-card">
            <div className="cert-badge">CSM</div>
            <div className="cert-name">Certified ScrumMaster (CSM)</div>
            <div className="cert-status">June 2024</div>
          </div>
          <div className="cert-card">
            <div className="cert-badge">MCTS</div>
            <div className="cert-name">MCTS — SharePoint 2010 App Dev &amp; Config (70-573 / 70-667)</div>
            <div className="cert-status">Completed</div>
          </div>
          <div className="cert-card">
            <div className="cert-badge">MCTS</div>
            <div className="cert-name">MCTS — .NET Framework &amp; HTML5/JS/CSS3 (70-536 / 70-480)</div>
            <div className="cert-status">Completed</div>
          </div>
          <div className="cert-card">
            <div className="cert-badge">MCTS</div>
            <div className="cert-name">MCTS — SQL Server &amp; Workflow Foundation (70-433 / 70-504)</div>
            <div className="cert-status">Completed</div>
          </div>
        </div>
        <div style={{marginTop: '48px'}}>
          <div className="edu-card">
            <div className="edu-icon">🎓</div>
            <div>
              <div className="edu-deg">B.Tech — Electronics and Communications Engineering</div>
              <div className="edu-school">Jawaharlal Nehru Technological University (JNTU), 2007</div>
              <div className="edu-medal">🥇 Gold Medal — JNTU Vice Chancellor Award for Academic Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-bg">
        <div className="section-label">05 — Connect</div>
        <div className="section-title">Get in <span>Touch</span></div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">✉</div>
              <div className="contact-text">
                <div className="label">Email</div>
                <div className="value"><a href="mailto:pradeepv.sharepoint@gmail.com">pradeepv.sharepoint@gmail.com</a></div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-text">
                <div className="label">Phone</div>
                <div className="value">(661) 379-5133</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">in</div>
              <div className="contact-text">
                <div className="label">LinkedIn</div>
                <div className="value"><a href="https://linkedin.com/in/pradeepkumarvaranasi" target="_blank" rel="noreferrer">linkedin.com/in/pradeepkumarvaranasi</a></div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-text">
                <div className="label">Location</div>
                <div className="value">Memphis, Tennessee — Remote / Hybrid</div>
              </div>
            </div>
          </div>
          <div>
            <div className="contact-note">
              <h3>Open to Opportunities</h3>
              <p>Targeting Power Platform Architect, M365 Architect, and SharePoint Architect roles at enterprise scale. Preferred: Remote or Hybrid. Open to North Carolina, Florida, and Atlanta relocation.</p>
              <div className="auth-badge">🔐 H1B Visa · Approved I-140</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>Pradeep Kumar Varanasi</span>
        <span>Power Platform Architect · Memphis, TN</span>
        <span>pradeepvaranasi.com</span>
      </footer>
    </>
  );
}

export default App;
