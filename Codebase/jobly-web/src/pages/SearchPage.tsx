import SearchForm from '../components/SearchForm';
import JobList from '../components/jobs/JobList';

function SearchPage() {
    const jobs = [
        {
          id: '1',
          title: 'Job 1',
          description: 'This is job 1 description.',
          color: 'primary',
        },
        {
          id: '2',
          title: 'Job 2',
          description: 'This is job 2 description.',
          color: 'secondary',
        },
        {
          id: '3',
          title: 'Job 3',
          description: 'This is job 3 description.',
          color: 'secondary',
        },
        {
          id: '4',
          title: 'Job 4',
          description: 'This is job 4 description.',
          color: 'secondary',
        },
        {
          id: '5',
          title: 'Job 5',
          description: 'This is job 5 description.',
          color: 'secondary',
        },
        {
          id: '6',
          title: 'Job 6',
          description: 'This is job 6 description.',
          color: 'secondary',
        },
        // Add more job objects as needed
      ];
      
    return (    
        <div className="container">
            {/* First column */}
            <div className='row'>
            <div className="col-sm-3">
                <SearchForm/>
            </div>
            {/* Second column */}
            <div className="col-sm-9 mt-4 px-1">
                <JobList jobs={jobs} />
            </div>
            </div>
        </div>
    );
};

export default SearchPage;
