import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, 
  Plus, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Layout,
  Type,
  FileText,
  ChevronDown,
  ChevronRight,
  Save
} from 'lucide-react';

const ResumeBuilder = ({ user }) => {
  const resumeRef = useRef();
  const [activeTab, setActiveTab] = useState('edit');
  const [expanded, setExpanded] = useState({
    experience: true,
    education: true,
    projects: true
  });
  const [details, setDetails] = useState({
    fullName: user.fullName || user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || '',
    linkedin: '',
    portfolio: '',
    summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: user.roles?.length ? user.roles : []
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/resume/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data) setDetails(data);
        })
        .catch(err => console.error('Error fetching resume:', err));
    }
  }, [user?.id]);

  const saveResume = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/resume/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });
      if (res.ok) alert('Resume progress saved!');
    } catch (err) {
      console.error('Error saving resume:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('my-resume.pdf');
  };

  const addExperience = () => {
    setDetails({
      ...details,
      experience: [...details.experience, { id: Date.now(), role: '', company: '', period: '', desc: '' }]
    });
    setExpanded(prev => ({...prev, experience: true}));
  };

  const addEducation = () => {
    setDetails({
      ...details,
      education: [...details.education, { id: Date.now(), degree: '', school: '', year: '' }]
    });
    setExpanded(prev => ({...prev, education: true}));
  };

  const addProject = () => {
    setDetails({
      ...details,
      projects: [...details.projects, { id: Date.now(), title: '', tech: '', desc: '' }]
    });
    setExpanded(prev => ({...prev, projects: true}));
  };

  const removeExperience = (id) => {
    setDetails({...details, experience: details.experience.filter(e => e.id !== id)});
  };
  const removeEducation = (id) => {
    setDetails({...details, education: details.education.filter(e => e.id !== id)});
  };
  const removeProject = (id) => {
    setDetails({...details, projects: details.projects.filter(e => e.id !== id)});
  };

  return (
    <div className="resume-builder-container">
      <div className="builder-header">
        <div className="editor-header">
          <h2>Resume Builder</h2>
          <p className="text-muted">Build and export your professional resume.</p>
        </div>
        
        <div className="builder-tabs glass-card">
          <button 
            className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            <FileText size={16} /> Edit Details
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <Layout size={16} /> Preview Resume
          </button>
        </div>
      </div>

      <div className="builder-layout">
        {/* Editor Sidebar */}
        <div className={`editor-panel glass ${activeTab !== 'edit' ? 'hidden' : ''}`}>

          <div className="editor-sections">
            <section className="editor-section">
              <label><User size={14} /> Personal Details</label>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={details.fullName}
                onChange={e => setDetails({...details, fullName: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Email" 
                value={details.email}
                onChange={e => setDetails({...details, email: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Phone" 
                value={details.phone}
                onChange={e => setDetails({...details, phone: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Location (e.g., New York, NY)" 
                value={details.location}
                onChange={e => setDetails({...details, location: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="LinkedIn Profile URL" 
                value={details.linkedin}
                onChange={e => setDetails({...details, linkedin: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Portfolio / GitHub URL" 
                value={details.portfolio}
                onChange={e => setDetails({...details, portfolio: e.target.value})}
              />
            </section>

            <section className="editor-section">
              <label><Type size={14} /> Professional Summary</label>
              <textarea 
                rows="4"
                value={details.summary}
                onChange={e => setDetails({...details, summary: e.target.value})}
              ></textarea>
            </section>

            <section className="editor-section">
              <div 
                className="label-with-action accordion-header" 
                onClick={() => setExpanded(prev => ({...prev, experience: !prev.experience}))}
              >
                <label>
                  {expanded.experience ? <ChevronDown size={14} /> : <ChevronRight size={14} />} 
                  <Briefcase size={14} /> Experience
                </label>
                <button 
                  className="add-btn" 
                  onClick={(e) => { e.stopPropagation(); addExperience(); }}
                ><Plus size={14} /></button>
              </div>
              {expanded.experience && details.experience.map((exp, idx) => (
                <div key={exp.id} className="item-group">
                  <div className="item-group-header">
                    <span>Experience {idx + 1}</span>
                    <button className="icon-btn delete-btn" onClick={() => removeExperience(exp.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input 
                    placeholder="Role" 
                    value={exp.role} 
                    onChange={e => {
                      const newExp = [...details.experience];
                      newExp[idx].role = e.target.value;
                      setDetails({...details, experience: newExp});
                    }}
                  />
                  <input 
                    placeholder="Company" 
                    value={exp.company}
                    onChange={e => {
                      const newExp = [...details.experience];
                      newExp[idx].company = e.target.value;
                      setDetails({...details, experience: newExp});
                    }}
                  />
                  <input 
                    placeholder="Period (e.g., 2021 - Present)" 
                    value={exp.period}
                    onChange={e => {
                      const newExp = [...details.experience];
                      newExp[idx].period = e.target.value;
                      setDetails({...details, experience: newExp});
                    }}
                  />
                  <textarea 
                    rows="2"
                    placeholder="Description of responsibilities..." 
                    value={exp.desc}
                    onChange={e => {
                      const newExp = [...details.experience];
                      newExp[idx].desc = e.target.value;
                      setDetails({...details, experience: newExp});
                    }}
                  />
                </div>
              ))}
            </section>

            <section className="editor-section">
              <div 
                className="label-with-action accordion-header"
                onClick={() => setExpanded(prev => ({...prev, education: !prev.education}))}
              >
                <label>
                  {expanded.education ? <ChevronDown size={14} /> : <ChevronRight size={14} />} 
                  <GraduationCap size={14} /> Education
                </label>
                <button 
                  className="add-btn" 
                  onClick={(e) => { e.stopPropagation(); addEducation(); }}
                ><Plus size={14} /></button>
              </div>
              {expanded.education && details.education.map((edu, idx) => (
                <div key={edu.id} className="item-group">
                  <div className="item-group-header">
                    <span>Education {idx + 1}</span>
                    <button className="icon-btn delete-btn" onClick={() => removeEducation(edu.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input 
                    placeholder="Degree / Certificate" 
                    value={edu.degree} 
                    onChange={e => {
                      const newEdu = [...details.education];
                      newEdu[idx].degree = e.target.value;
                      setDetails({...details, education: newEdu});
                    }}
                  />
                  <input 
                    placeholder="School / University" 
                    value={edu.school}
                    onChange={e => {
                      const newEdu = [...details.education];
                      newEdu[idx].school = e.target.value;
                      setDetails({...details, education: newEdu});
                    }}
                  />
                  <input 
                    placeholder="Year" 
                    value={edu.year}
                    onChange={e => {
                      const newEdu = [...details.education];
                      newEdu[idx].year = e.target.value;
                      setDetails({...details, education: newEdu});
                    }}
                  />
                </div>
              ))}
            </section>

            <section className="editor-section">
              <div 
                className="label-with-action accordion-header"
                onClick={() => setExpanded(prev => ({...prev, projects: !prev.projects}))}
              >
                <label>
                  {expanded.projects ? <ChevronDown size={14} /> : <ChevronRight size={14} />} 
                  <Briefcase size={14} /> Projects
                </label>
                <button 
                  className="add-btn" 
                  onClick={(e) => { e.stopPropagation(); addProject(); }}
                ><Plus size={14} /></button>
              </div>
              {expanded.projects && details.projects.map((proj, idx) => (
                <div key={proj.id} className="item-group">
                  <div className="item-group-header">
                    <span>Project {idx + 1}</span>
                    <button className="icon-btn delete-btn" onClick={() => removeProject(proj.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input 
                    placeholder="Project Title" 
                    value={proj.title} 
                    onChange={e => {
                      const newProj = [...details.projects];
                      newProj[idx].title = e.target.value;
                      setDetails({...details, projects: newProj});
                    }}
                  />
                  <input 
                    placeholder="Tech Stack (e.g., React, Node)" 
                    value={proj.tech}
                    onChange={e => {
                      const newProj = [...details.projects];
                      newProj[idx].tech = e.target.value;
                      setDetails({...details, projects: newProj});
                    }}
                  />
                  <textarea 
                    rows="2"
                    placeholder="Project Description" 
                    value={proj.desc}
                    onChange={e => {
                      const newProj = [...details.projects];
                      newProj[idx].desc = e.target.value;
                      setDetails({...details, projects: newProj});
                    }}
                  />
                </div>
              ))}
            </section>

            <section className="editor-section">
              <label><FileText size={14} /> Skills (comma separated)</label>
              <textarea 
                rows="3"
                placeholder="e.g., JavaScript, React, Teamwork, Communication"
                value={details.skills.join(', ')}
                onChange={e => setDetails({...details, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
              ></textarea>
            </section>
          </div>

          <button className="btn btn-primary w-full mt-4" onClick={handleExport}>
            <Download size={18} /> Export as PDF
          </button>
        </div>


        {/* Live Preview */}
        <div className={`preview-panel ${activeTab !== 'preview' ? 'hidden' : ''}`}>
          <div className="preview-actions">
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={saveResume} disabled={isSaving}>
                <Save size={18} /> {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
              <button className="btn btn-primary" onClick={handleExport}>
                <Download size={18} /> Export PDF
              </button>
            </div>
          </div>
          <div className="preview-canvas" ref={resumeRef}>
            <div className="resume-header">
              <h1>{details.fullName}</h1>
              <div className="contact-info">
                {details.email && <span>{details.email}</span>}
                {details.phone && <span>{details.phone}</span>}
                {details.location && <span>{details.location}</span>}
                {details.linkedin && <span>{details.linkedin}</span>}
                {details.portfolio && <span>{details.portfolio}</span>}
              </div>
            </div>

            <div className="resume-body">
              <section>
                <h3 className="resume-section-title">Professional Summary</h3>
                <p>{details.summary}</p>
              </section>

              <section>
                <h3 className="resume-section-title">Experience</h3>
                {details.experience.map(exp => (
                  <div key={exp.id} className="resume-item">
                    <div className="item-header">
                      <strong>{exp.role}</strong>
                      <span>{exp.period}</span>
                    </div>
                    <div className="company">{exp.company}</div>
                    <p className="item-desc">{exp.desc}</p>
                  </div>
                ))}
              </section>

              <section>
                <h3 className="resume-section-title">Education</h3>
                {details.education.map(edu => (
                  <div key={edu.id} className="resume-item">
                    <div className="item-header">
                      <strong>{edu.degree}</strong>
                      <span>{edu.year}</span>
                    </div>
                    <div className="company">{edu.school}</div>
                  </div>
                ))}
              </section>

              <section>
                <h3 className="resume-section-title">Projects</h3>
                {details.projects.map(proj => (
                  <div key={proj.id} className="resume-item">
                    <div className="item-header">
                      <strong>{proj.title}</strong>
                      <span>{proj.tech}</span>
                    </div>
                    <p className="item-desc">{proj.desc}</p>
                  </div>
                ))}
              </section>

              <section>
                <h3 className="resume-section-title">Skills</h3>
                <div className="resume-skills">
                  {details.skills.map(skill => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .resume-builder-container {
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .builder-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .builder-tabs {
          display: inline-flex;
          padding: 0.5rem;
          gap: 0.5rem;
          border-radius: 1rem;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          border-radius: 0.75rem;
          transition: all 0.2s;
        }

        .tab-btn:hover {
          color: var(--text);
        }

        .tab-btn.active {
          background: var(--primary);
          color: white;
        }

        .builder-layout {
          width: 100%;
        }

        .hidden {
          display: none !important;
        }

        .editor-panel {
          padding: 2rem;
          border-radius: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .editor-section {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .editor-section label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .editor-section input, .editor-section textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          padding: 0.75rem;
          border-radius: 0.75rem;
          color: white;
          font-family: inherit;
        }

        .item-group {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          padding: 1rem;
          border-radius: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .accordion-header {
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background 0.2s;
        }

        .accordion-header:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .item-group-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .delete-btn {
          color: var(--danger);
          padding: 4px;
        }
        
        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .label-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .add-btn {
          background: var(--primary);
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .preview-panel {
          background: #334155;
          padding: 3rem;
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          min-height: calc(100vh - 200px);
          overflow-x: auto;
        }

        .preview-actions {
          width: 210mm;
          display: flex;
          justify-content: flex-end;
        }

        .preview-canvas {
          background: white;
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          color: #1e293b;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          font-family: 'Inter', sans-serif;
        }

        .resume-header {
          border-bottom: 2px solid #6366f1;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .resume-header h1 {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .contact-info {
          display: flex;
          gap: 1.5rem;
          font-size: 0.9rem;
          color: #64748b;
        }

        .resume-section-title {
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #6366f1;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.5rem;
          margin: 1.5rem 0 1rem;
        }

        .resume-item {
          margin-bottom: 1rem;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          font-size: 1rem;
        }

        .company {
          color: #64748b;
          font-style: italic;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .item-desc {
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .resume-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .resume-skills span {
          background: #f1f5f9;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .preview-actions {
            width: 100%;
            justify-content: center;
          }
          .builder-header {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}} />
    </div>
  );
};

export default ResumeBuilder;
