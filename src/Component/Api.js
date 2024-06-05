import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Api = () => {

    const[data, setdata] = useState([]);
    const[fetchdata , setfatchdata] = useState(false);
    const[fetchdataerro , setFetchdataerror] = useState("")
    const[filtredalphabet , setFiltredalphabet] = useState('');
    const[firstTitleLetter , setFirstTitleLetter] = useState([]);
    const[arrayalfa, setArrayAlphabet] = useState([]);
  useEffect(() => {

    if(fetchdata){
      axios.get('https://jsonplaceholder.typicode.com/todos').then((response) =>{
      
        setdata(response.data);
          fetchFirstLatterofTitle(response.data)
        setFetchdataerror('')
      }).catch((error) =>{
            setFetchdataerror(error.message);
      })
    }
    
  } ,[fetchdata])

 const loaddata = () =>{
 if(!fetchdata){
  setfatchdata(true);
 }else{
  setdata([])
  setfatchdata(false)
  setFiltredalphabet('')
 }
 }

  function fetchFirstLatterofTitle(dat){
   
     { dat.map((item,index) =>{
    

      const firstletter = item.title.charAt(0);
      if(firstletter!==''){
        console.log(firstletter);
         setArrayAlphabet(firstletter);

      }else{
        console.log("Skipping duplicate or empty letter:", firstletter);
      }
        return;
     }        
      )
    }
  }
  console.log("array alphabet",arrayalfa)


 const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
   
  const clickedAlphabet = (item) => {
    setFiltredalphabet(item);
    // console.log(item);
    console.log(filtredalphabet); 
  }


  return (
    <div>

      <div  className=''>
         <div  className='text-red-800'> {fetchdataerro!= '' && fetchdataerro}  </div>
        <button className='border border-2 p-4' onClick={loaddata}>{ fetchdata ?'Remove Data':'Load Data'}</button>
        <div className='flex justify-center'>
        {alphabet.map((item,index) =>{
          return(
            <>
            <button className='border border-2 ml-2 p-2' onClick={ ()=>clickedAlphabet(item)} key={index}>{item}</button>
            </>
          )
        })}  
      </div>

      { data.filter(item => item.title.toUpperCase().startsWith(`${filtredalphabet}`)).map((item,index) =>{
        return(
          <>
          <div className='ml-40' style={ {fontSize:'32px'}} key={index}> {index+1} {item.title}</div> 
          </>
        )
      })}
      </div>
    </div>
  )
}

export default Api
