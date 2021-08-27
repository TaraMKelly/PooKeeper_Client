import { Link } from 'react-router-dom'
import { FaPaw } from 'react-icons/fa';

function HomePage () {
    // const url = "./homepage.jpeg"
    const url = "https://www.netclipart.com/pp/m/8-80568_download-welcome-to-the-zoo-clipart-lion-welcome.png"

    return(
        // <div style={{height: "100%"}, {width: "100%"}} className="homepage">
        <>
         <img src={url} style={{opacity: "1"}} alt="zoo" className="homepage"/> 
             <Link className='py-6 px-10 bg-yellow-500 rounded-full text-3xl hover:bg-yellow-300 transition duration-300 ease-in-out flex items-center text-center animate-bounce absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' to={'/animals'}>
              Meet Animals Now! <FaPaw style={{paddingLeft: "5px"}}/>
            </Link>
        </>
            

           
           
        // </div>
        
    )
}

export default HomePage;