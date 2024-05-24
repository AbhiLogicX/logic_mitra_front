
import moment from "moment"

const BEnrollStudent=({BstudentData})=>{

   
    return (
        <>

<section>


{
  BstudentData?.length===0 ? (<>
        <div className="text-white px-2 py-2 "> There is no Transaction Data</div>
        </>) : (
          <div className=" py-3 "> 
        <div className="">
       
       <div className="flex justify-between items-center my-2"> 
       <h1 className="heading ">No. of Enrollment Students</h1>
       <button className="btn-seeAll px-4 py-1 text-sm"> See All</button>
        </div>
        <div className="card-body ">
          {/* {loading && <h1 className="text-black">Loading...</h1>}
          {error && <h1 className="text-black">{error.message}</h1>}
          
          */}
            
            
  
             
          
            <div className="table-responsive Ttable h-[500px] overflow-y-auto">
              <table className=" table-striped w-[100%]">
                <thead className="Thead">
                  <tr >
                    <th scope="col">Student Name</th>
                    <th scope="col">Reciever</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                   

                    
                  </tr>
                  
                  
                </thead>
                <tbody>
                {
                  BstudentData?.map(item=>{
                    console.log(BstudentData)
                    return(
                      <>
                 <tr className="Tbody" key={item.id}>
                    <td>{item?.sname}</td>
                    <td>{item?.sname}</td>
                    <td>{item?.cardType}</td>
                    <td>{item?.transmethod}</td>
                    <td>{item?.amount}</td>
                    <td className="flex flex-row"> {moment(item?.date).format("DD/ mm /yyyy")}</td>
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

</section>

        </>
    )

}

export default BEnrollStudent