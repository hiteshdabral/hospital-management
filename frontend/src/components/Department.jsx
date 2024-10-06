import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const Department = () => {
    const departmentsArray=[
        {
            name:"Pediatrics",
            imageUrl:"/departments/pedia.jpg",
        },
        {
            name:"Orthopedics",
            imageUrl:"/departments/ortho.jpg",
        },
        {
            name:"Cardiology",
            imageUrl:"/departments/cardio.jpg",
        },
        {
            name:"Neurology",
            imageUrl:"/departments/neuro.jpg",
        },
        {
            name:"Onchology",
            imageUrl:"/departments/onco.jpg",
        },
        {
            name:"Radiology",
            imageUrl:"/departments/radio.jpg",
        }
    ]
    const responsive={
        superLargeDesktop: {
            breakpoint: { max: 3000, min: 1324 },
            items: 4,
            slidesToSlide: 1
          },
          desktop: {
            breakpoint: { max: 1324, min: 1005 },
            items: 3,
            slidesToSlide: 1
          },
          tablet: {
            breakpoint: { max: 1005, min: 700 },
            items: 2,
            slidesToSlide: 1
          },
          mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
            slidesToSlide: 1
          }
    };
    return (
        <div className='container departments'>
            <h2>Departments</h2>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet","mobile"]}>
              {departmentsArray.map((ele,i)=>{
                return (
                    <div className='card' key={i}>
                        <div className='depart-name'>{ele.name}</div>
                        <img src={ele.imageUrl} alt={ele.name} />
                    </div>
                )
              })}
            </Carousel>
        </div>
    )

}

export default Department