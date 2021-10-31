import React, {useState, useEffect, useCallback, useRef} from 'react'
import Axios from 'axios'
//Import Tagify dependencies and style
import Tags from '@yaireo/tagify/dist/react.tagify'
import '@yaireo/dragsort/dist/dragsort.css'
import './TagifySearch.css'
//-------------------------------------//
//Import Lottie Component
import Loading from '../../utils/lottie/Loading'
//--------------------------------------//
//Import Assets
import searchIcon from '../../assets/search-3-64.png'
import CarCard from './Car-Container/CarCard'
//--------------------------------------//

// Tagify settings object
const baseTagifySettings = {
  blacklist: ["xxx", "yyy", "zzz"],
  maxTags: 3,
  placeholder: "Search Make, Type, Year",
  dropdown: {
    enabled: 0
  }
}

const TagifySearch = () => {
  const tagifyRef1 = useRef()
  const [tagifySettings, setTagifySettings] = useState([])
  // const [tagifyProps, setTagifyProps] = useState({})
  const [searchVal, setSearchVal] = useState([])
  // const [objectArray, setobjectArray] = useState([{value: 'toyota', type: 'make'}])
  const [objectArray, setobjectArray] = useState([])
  const [carList, setCarList] = useState([])
  //Loading state
  const [loading, setLoading] = useState(true)
  //----------------------//
  const [notice, setNotice] = useState(true)

  // merged tagify settings (static & dynamic)
  const settings = {
    ...baseTagifySettings,
    ...tagifySettings
  }
  //Monitor Changing in Search Value
  const onChange = useCallback(e => {
    console.log("CHANGED:", e.detail.value)
    console.log(typeof e.detail.value)
    setSearchVal(e.detail.value)
  }, [])

  // access Tagify clearAll:
  // const clearAll = () => {
  //   tagifyRef1.current && tagifyRef1.current.removeAllTags()
  // }
  //----------------------------//

  useEffect(()=>{
    if(searchVal.length > 2){
      let jsonArray = searchVal.slice(1,-1).split(",")
      let tempArray = [];
      //----This Function will take user input and indentify the type of keyword weather it is make or vehicle type or year
      const verifyfunc = async () =>{
        if(jsonArray.length > 0){
          let i = 0;
          while(i < jsonArray.length){
            let tempObj = JSON.parse(jsonArray[i])
            
            if(tempObj){
              ///vehicles/GetMakesForVehicleType/car?format=json---Vehicle type
              const response = await Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${tempObj.value}?format=json`);
            if(response.data.Count === 0){
              //vehicles/GetVehicleTypesForMake/mercedes?format=json--Vehicle name
              await Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${tempObj.value}?format=json`)
                .then(res =>{
                  if(res.data.Count  !==0){
                    tempObj.type = 'make'
                  }else{
                    tempObj.type = 'year'
                  }
                }).catch((error)=>{
                  console.log(error)
                })
            }else{
              setCarList([])
              setLoading(true)
              tempObj.type = 'vehicletype'
            }
              //Filling up temporary Array to pass to objectArray
              tempArray[i]=tempObj;
              //-----------------------------------------------//
            }          
            i++;
          }  
        }
        setobjectArray(tempArray)
      }
      //------------------------------------------------------------------------//

      verifyfunc()
    }else{
      setCarList([])
      setLoading(true)
    }
  },[searchVal])
  //This function will go through the objectArray to indentify what API can be used base on user's input
  function fetchData(objectArray){
    console.log(objectArray)
    let make = '';
    let type = '';
    let year = '';
    let i = 0;
    if(objectArray.length > 0){
      while(i<objectArray.length){
        if(objectArray[i].type === 'make'){
          make = `${objectArray[i].value}`
        }else if(objectArray[i].type === 'vehicletype'){
          type = `${objectArray[i].value}`
        }else{
          year = `${objectArray[i].value}`
        }
        i++
      }
      if(make !== ''){
        if(type !== ''){
          if(year !== ''){
            Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${type}?format=json`).then(res=>{
              if(Boolean(res.data.Count) === true){
                setCarList(res.data.Results)
                setLoading(false)
              }
            }).catch((error)=>{
              console.log(error)
            })
          }else{
            Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/vehicletype/${type}?format=json`).then(res=>{
              if(Boolean(res.data.Count) === true){
                setCarList(res.data.Results)
                setLoading(false)
              }
            }).catch((error)=>{
              console.log(error)
            })
          }
        }else{
          if(year !== ''){
            Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`).then(res=>{
              if(Boolean(res.data.Count) === true){
                setCarList(res.data.Results)
                setLoading(false)
              }
            }).catch((error)=>{
              console.log(error)
            })
          }else{
            Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`).then(res=>{
              if(Boolean(res.data.Count) === true){
                setCarList(res.data.Results)
                setLoading(false)
              }
            }).catch((error)=>{
              console.log(error)
            })
          }
        }
      setNotice(false) 
      }else{
        // console.log('Enter Make')
        setNotice(true)
      }
    }
  }
  //-----------------------------------------------------------------------------------------------//
  useEffect(()=>{
    fetchData(objectArray)
  },[objectArray])
  
  return (
    <>
      <div className="mainTag">
        <div className="searchBar">
          <div className="iconCont">
            <img src={searchIcon} alt="search icon"/>
          </div>
          <Tags
            className="tagClass"
            tagifyRef={tagifyRef1}
            settings={settings}
            autoFocus={false}
            onChange={onChange}
            onEditInput={() => console.log("onEditInput")}
            onEditBeforeUpdate={() => console.log`onEditBeforeUpdate`}
            onEditUpdated={() => console.log("onEditUpdated")}
            onEditStart={() => console.log("onEditStart")}
            onEditKeydown={() => console.log("onEditKeydown")}
            onDropdownShow={() => console.log("onDropdownShow")}
            onDropdownHide={() => console.log("onDropdownHide")}
            onDropdownSelect={() => console.log("onDropdownSelect")}
            onDropdownScroll={() => console.log("onDropdownScroll")}
            onDropdownNoMatch={() => console.log("onDropdownNoMatch")}
            onDropdownUpdated={() => console.log("onDropdownUpdated")}
          />
        </div>
        {notice ? <p style={{textAlign:"center"}}>Please enter Make</p> : <p></p>}
        {loading ? 
          <div style={{height:'70vh'}} class="preload-wrapper">
            <div class="preload-item">
              <Loading/> 
            </div>
          </div>
        : 
        <div className="carContainer">
          {carList.map((car)=>{
            return(
              <CarCard key={car.Model_ID}
                makeName={car.Make_Name}
                modelName={car.Model_Name}
                modelID={car.Model_ID}
              />
            )
          })}
        </div>
        }
      </div>
    </>
  )
}

export default TagifySearch;
