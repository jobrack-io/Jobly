import axios from "axios";
import { useState } from "react";

function SearchForm() {

    const [text, setText] = useState('');
  const [company, setCompany] = useState('');
  const [skillLevels, setSkillLevels] = useState([]);
  const [companySize, setCompanySize] = useState('');
  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(100000);
  const [jobTypes, setJobTypes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const payload = {
      text,
      company,
      skillLevels,
      companySize,
      locations,
      skills,
      salary: { min: salaryMin, max: salaryMax },
      jobTypes
    };

    try {
      const response = await axios.post('http://localhost:8000/search/jobs', payload);
      console.log(response.data); // Do something with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <form onSubmit={handleSearch} style={
        {
            width: '90%',
            margin: '25px 0px',
            padding: '10px',
            borderRadius: '15px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(to right, #c4d3f6, #f3e7ff)',
          }
    }>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Text</label>
          <input type="text" id="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company</label>
          <input type="text" id="company" className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="skillLevels" className="form-label">Skill Levels</label>
          <select multiple id="skillLevels" className="form-select" value={skillLevels} onChange={(e) => setSkillLevels(Array.from(e.target.selectedOptions, option => option.value))}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="companySize" className="form-label">Company Size</label>
          <input type="text" id="companySize" className="form-control" value={companySize} onChange={(e) => setCompanySize(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="locations" className="form-label">Locations</label>
          <select multiple id="locations" className="form-select" value={locations} onChange={(e) => setLocations(Array.from(e.target.selectedOptions, option => option.value))}>
            <option value="location1">Location 1</option>
            <option value="location2">Location 2</option>
            <option value="location3">Location 3</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="skills" className="form-label">Skills</label>
          <select multiple id="skills" className="form-select" value={skills} onChange={(e) => setSkills(Array.from(e.target.selectedOptions, option => option.value))}>
            <option value="skill1">Skill 1</option>
            <option value="skill2">Skill 2</option>
            <option value="skill3">Skill 3</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="range" id="salary" className="form-range" min="0" max="100000" value={salaryMin} onChange={(e) => setSalaryMin(parseInt(e.target.value))} />
          <input type="range" id="salary" className="form-range" min="0" max="100000" value={salaryMax} onChange={(e) => setSalaryMax(parseInt(e.target.value))} />
          <div>
            Min: ${salaryMin}
          </div>
          <div>
            Max: ${salaryMax}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="jobTypes" className="form-label">Job Types</label>
          <select multiple id="jobTypes" className="form-select" value={jobTypes} onChange={(e) => setJobTypes(Array.from(e.target.selectedOptions, option => option.value))}>
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
  );
}

export default SearchForm;