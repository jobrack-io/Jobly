import React from 'react';
import { Link } from 'react-router-dom';

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
    <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none' }}>
    <div className={`card bg-${job.color}`}>
      <div className="card-body">
        
          <h5 className="card-title">{job.title}</h5>
          <p className="card-text">{job.description}</p>
        
      </div>
    </div>
    </Link>
  );
};

export default JobCard;
