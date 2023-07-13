import axios from "axios";
import { useState } from "react";

const apiUrl = 'http://localhost:8000/search/jobs';

type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
type CompanySize = 'Small' | 'Medium' | 'Large';
type Location = 'New York' | 'London' | 'Tokyo';
type Skill = 'React' | 'JavaScript' | 'Node.js' | 'Python' | 'Java' | 'Ruby';
type JobType = 'Full-time' | 'Part-time' | 'Contract';

interface JobSearchFilter {
  text: string;
  company: string;
  skillLevels: SkillLevel[];
  companySize: CompanySize | '';
  locations: Location[];
  skills: Skill[];
  salaryMin: number;
  salaryMax: number;
  jobTypes: JobType[];
}

function SearchForm() {

  const [filters, setFilters] = useState<JobSearchFilter>({
    text: '',
    company: '',
    skillLevels: [],
    companySize: '',
    locations: [],
    skills: [],
    salaryMin: 0,
    salaryMax: 100000,
    jobTypes: [],
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = event.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: selectedOptions,
    }));
  };

  const handleSalaryRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parseInt(value),
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(apiUrl, filters)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
      <form onSubmit={handleFormSubmit} style={
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
          <label htmlFor="text">Text</label>
          <input type="text" className="form-control" id="text" name="text" value={filters.text} onChange={handleFilterChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="company">Company</label>
          <input type="text" className="form-control" id="company" name="company" value={filters.company} onChange={handleFilterChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="skillLevels">Skill Levels</label>
          <select multiple className="form-select" id="skillLevels" name="skillLevels" value={filters.skillLevels} onChange={handleMultiSelectChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="companySize">Company Size</label>
          <select className="form-select" id="companySize" name="companySize" value={filters.companySize} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="locations">Locations</label>
          <select multiple className="form-select" id="locations" name="locations" value={filters.locations} onChange={handleMultiSelectChange}>
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Tokyo</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="skills">Skills</label>
          <select multiple className="form-select" id="skills" name="skills" value={filters.skills} onChange={handleMultiSelectChange}>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Ruby">Ruby</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="salaryRange">Salary Range</label>
          <input type="range" className="form-range" id="salaryMin" name="salaryMin" min="0" max="100000" step="1000" value={filters.salaryMin} onChange={handleSalaryRangeChange} />
          <input type="range" className="form-range" id="salaryMax" name="salaryMax" min="0" max="100000" step="1000" value={filters.salaryMax} onChange={handleSalaryRangeChange} />
          <div>
            Min: ${filters.salaryMin.toLocaleString()}
            Max: ${filters.salaryMax.toLocaleString()}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="jobTypes">Job Types</label>
          <select multiple className="form-select" id="jobTypes" name="jobTypes" value={filters.jobTypes} onChange={handleMultiSelectChange}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
  );
}

export default SearchForm;