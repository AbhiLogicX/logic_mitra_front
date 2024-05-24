import { useEffect, useState } from "react"
import moment from "moment"


const  EnrollTrainer=({TrainerData})=>{
    const [data , setdata] =useState()

useEffect(()=>{

  setdata(TrainerData)
},[TrainerData])
 
console.log(data?.data)
    return (
        <>

{
        data?.data?.enrollCourse.length===0 ? (<>
        <div className="text-white px-2 py-3"> No Enrolled Courses Data Found</div>
        </>) : (
          <div className="px-2 py-3 "> 
        <div className="">
       
       <div className="flex justify-between items-center my-2"> 
       <h1 className="heading "> Enroll Courses</h1>
       <button className="btn-seeAll px-4 py-1 text-sm"> See All</button>
        </div>
        <div className="card-body ">
          {/* {loading && <h1 className="text-black">Loading...</h1>}
          {error && <h1 className="text-black">{error.message}</h1>}
          
          */}
            
            
  
             
          
            <div className="table-responsive Ttable  overflow-y-auto Table-overflow">
              <table className=" table-striped w-[100%]">
                <thead className="Thead">
                  <tr >
                    <th scope="col">title</th>
                    <th scope="col">Fees</th>
                    <th scope="col">Offer Fees</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                   

                    
                  </tr>
                  
                  
                </thead>
                <tbody>
                {
                  data?.data?.enrollCourse.map(item=>{
                    console.log(item)
                    return(
                      <>
                      <tr className="Tbody" key={item.id}>
                    <td>{item?.courseid?.ctitle}</td>
                    <td>{item?.courseid?.cfees}</td>
                    <td>{item?.courseid?.cofferfees}</td>
                    <td>{item?.paymode}</td>
                    <td>{item?.payamount}</td>
                    <td className="flex flex-row"> {moment(item?.date).format("DD/MM/YYYY")}</td>
                 </tr>
                      </>
                    )
                  })
                }
                 
                </tbody>
              </table>
            </div>
        

          </div>
          </div>
        
        </div>


        )
      }

        </>
    )
}

export default EnrollTrainer