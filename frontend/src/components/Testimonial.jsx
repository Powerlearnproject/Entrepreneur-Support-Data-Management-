import React from 'react';

const testimonials = [
  {
    image: 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/171/718/original/3208c3a7-ce39-4d5c-8097-5e6a145a252a.jpeg?1754411613',
    Orgname: ' Founder, MobiFarms Africa',
    testimony:'Our community recycling project needed hands-on help, not just funds. Thanks to this platform, two amazing volunteers joined us to train local youth and scale our initiative. The best part? It was easy to share our vision and goals clearly—and the right people found us.'
},
  {
    image: 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/171/721/original/b1079428-5f19-421c-882b-ed8fc38307b5.jpeg?1754411929',
     Orgname: 'Designer, HabariCrafts',
    testimony:'Just having our business story, goals, and needs visible on this platform gave us credibility. A retired logistics manager saw our profile and offered to mentor us. Two months later, we cut delivery costs by 30%. We never imagined that kind of help would come so easily.'
 },
  {
    image: 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/171/720/original/8a1ad571-503e-47e2-95af-8f847a4d0875.jpeg?1754411695',
    Orgname: ' Co-founder, MamaBites Delivery',
    testimony:'We didn’t have to beg or pitch endlessly—people came to our page, saw our plan and timeline, and chose to support us. One volunteer helped us with branding, another gave a small grant, and we even got a partnership offer!'
 }

 
]


export default function Testimonial(){
    return(

<>
         {/* Testimonials Section */}
    <div className="py-12 px-4 bg-white">
      <h2 className="text-center text-3xl font-bold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Testimonial 1 */}

        {testimonials.map((testimonial)=>(

      
        <div key={testimonial.name} className="card bg-base-100 shadow-sm p-6">
          <div className="card-body items-center text-center">
            <div className="avatar mb-4">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={testimonial.image} alt="Testimonial 1" />
              </div>
            </div>
             <p className='font-bold'>
              {testimonial.Orgname}
            </p>

            <p>
              {testimonial.testimony}
            </p>

          </div>
        </div>

      
  )

    )}
       

      </div>
    </div>

    </>
    );
}