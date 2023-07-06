import React from 'react';

interface Job {
  title: string;
  description: string;
  color: string;
}

interface Props {
  job: Job;
}

const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <div className={`card bg-${job.color}`}>
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text">{job.description}</p>
      </div>
    </div>
  );
};

export default JobCard;
