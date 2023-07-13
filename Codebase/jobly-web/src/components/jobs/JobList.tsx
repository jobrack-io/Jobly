import React from 'react';
import JobCard from './JobCard';

interface Job {
  title: string;
  description: string;
  color: string;
}

interface Props {
  jobs: Job[];
}

const JobList: React.FC<Props> = ({ jobs }) => {
  return (
    <div className="row">
      {jobs.map((job, index) => (
        <div key={index} className="col-md-6 col-lg-4 mb-4">
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
};

export default JobList;
