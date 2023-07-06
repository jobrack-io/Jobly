import '../assets/aboutus.css';

function AboutUsPage(){
  return (
    <>
      <section className="py-5">
        <div className="container">
          <h3 className="mb-4">Jobly</h3>
          <p>
            Introducing Jobly, your ultimate companion in the exhilarating quest for your dream job! Our delightful web application is meticulously designed to uplift and empower job candidates like you, providing a range of exceptional features to enhance your job search journey.
          </p>
        </div>
        <div className="container px-1 py-1" id="featured-3">
          <div className="row g-4 py-2 row-cols-1 row-cols-lg-1">
            <div className="feature col">
              <div className='clearfix'>
                <div className="feature-icon bg-primary bg-gradient float-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars" viewBox="0 0 16 16">
                    <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V2.5zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5h-1zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V4zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V3zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14z"/>
                  </svg>
                </div>
                <div className="float-start ms-2 mt-2"><h2>Discover</h2></div>
              </div>
              <p>With Jobly's enchanting job search functionality, you'll embark on a magical adventure through a vast database of captivating job listings. Our intuitive search filters and personalized recommendations will guide you to discover those shimmering positions that align perfectly with your unique qualifications and aspirations. But the excitement doesn't stop there! We understand that timing is crucial in this exhilarating journey. That's why Jobly offers you the golden opportunity to stay ahead with our captivating job alerts. Imagine receiving delightful notifications tailored to your preferences, ensuring you never miss a thrilling job opening again. It's like having a personal job-search fairy, fluttering by your side, ready to lead you to exciting new opportunities.</p>
            </div>
            
            <div className="feature col">
              <div className='clearfix'>
                <div className="feature-icon bg-primary bg-gradient float-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
                  </svg>
                </div>
                <div className="float-start ms-2 mt-2"><h2>Stay Ahead</h2></div>
              </div>
              <p>We believe that organization is the key to unlocking your true potential. Jobly's application management system is your trusty ally in this endeavor. Effortlessly track your progress, from the first flicker of interest to the triumphant moment of receiving an interview invitation. You'll be able to gracefully manage all your applications, keeping a keen eye on their status and storing valuable notes, leaving you free to dance through the job search process with ease.</p>
            </div>

            <div className="feature col">
              <div className='clearfix'>
                <div className="feature-icon bg-primary bg-gradient float-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bullseye" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                    <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  </svg>
                </div>
                <div className="float-start ms-2 mt-2"><h2>Polish Your Resume to Perfection</h2></div>
              </div>
              <p>Your resume is your shining armor, and with Jobly, you can polish it to perfection. Say goodbye to a one-size-fits-all approach. Our delightful feature allows you to create and store multiple versions of your resume, each artfully tailored to different job applications or industries. Craft your story, highlight your skills, and captivate potential employers with resumes as unique and remarkable as you are.</p>
            </div>

            <div className="feature col">
              <div className='clearfix'>
                <div className="feature-icon bg-primary bg-gradient float-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
                  </svg>
                </div>
                <div className="float-start ms-2 mt-2"><h2>Unlock Your Potential</h2></div>
              </div>
              <p>We believe in your unlimited potential and the power of continuous growth. Jobly is not just a job search application; it's your guide to personal and professional excellence. Unlock a treasure trove of resources, curated courses, and a delightful learning roadmap that will help you thrive. Unleash your inner brilliance, refine your skills, and equip yourself with the tools needed to conquer any challenge that comes your way.</p>
            </div>
          </div>
        </div>
        <p>
          So, dear job seeker, are you ready to embark on this delightful journey with Jobly? Let's spread our wings and soar towards a brighter future, where the perfect job awaits you. Remember, with Jobly by your side, the possibilities are endless, and your dreams are within reach. Get ready to shine and let your career story unfold in the most extraordinary and enchanting way!
        </p>
      </section>
      
    </>
  );
};

export default AboutUsPage;
