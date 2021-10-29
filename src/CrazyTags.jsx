import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react'
import {getWhitelistFromServer} from './mockServer'
import DragSort from '@yaireo/dragsort'
import '@yaireo/dragsort/dist/dragsort.css'

//import Tags from './tagify/react.tagify'
import Tags from '@yaireo/tagify/dist/react.tagify'
import Axios from 'axios'

/////////////////////////////////////////////////

// Tagify settings object
const baseTagifySettings = {
  blacklist: ["xxx", "yyy", "zzz"],
  maxTags: 6,
  //backspace: "edit",
  placeholder: "type something",
  dropdown: {
    enabled: 0 // a;ways show suggestions dropdown
  }
}

// this is an example React component which implemenets Tagify within
// itself. This example is a bit elaborate, to demonstrate what's possible.
const CrazyTags = () => {
  const tagifyRef1 = useRef()
  const tagifyRefDragSort = useRef()

  // just a name I made up for allowing dynamic changes for tagify settings on this component
  const [tagifySettings, setTagifySettings] = useState([])
  const [tagifyProps, setTagifyProps] = useState({})
  const [searchVal, setSearchVal] = useState([])
  const [objectArray, setobjectArray] = useState([])
  const [carList, setCarList] = useState([])
  // console.log(tagifyProps)
  // on component mount
  useEffect(() => {
    // setTagifyProps({loading: true})

    // getWhitelistFromServer(2000).then((response) => {
    //   console.log(response)
    //   setTagifyProps((lastProps) => ({
    //     ...lastProps,
    //     whitelist: response,
    //     showFilteredDropdown: "a",
    //     loading: false
    //   }))
    // })


    // setTimeout(
    //   () =>
    //     setTagifyProps((lastProps) => ({
    //       ...lastProps,
    //       defaultValue: ["abc"],
    //       showFilteredDropdown: false
    //     })),
    //   5000
    // )
  }, [])

  // merged tagify settings (static & dynamic)
  const settings = {
    ...baseTagifySettings,
    ...tagifySettings
  }

  const onChange = useCallback(e => {
    console.log("CHANGED:", e.detail.value)
    console.log(typeof e.detail.value)
    setSearchVal(e.detail.value)

  }, [])

  // access Tagify internal methods example:
  const clearAll = () => {
    tagifyRef1.current && tagifyRef1.current.removeAllTags()
  }
  // console.log(searchVal[1])
  // console.log(typeof searchVal)
  // console.log(searchVal)
  // console.log(searchVal.slice(1,-1))
  // let  = [];
  useEffect(()=>{
    if(searchVal.length > 2){
      let jsonArray = searchVal.slice(1,-1).split(",")
      console.log(jsonArray.length)
      const verifyfunc = async () =>{
        if(jsonArray.length > 0){
          let i = 0;
      
          while(i < jsonArray.length){
            // console.log(JSON.parse(jsonArray[i]));
            let tempObj = JSON.parse(jsonArray[i])
            // tempObj.type = 'afdsf'
            console.log(Boolean(tempObj))
            
            //Define the tag
            ///vehicles/GetMakesForVehicleType/car?format=json---Vehicle type
            
            if(tempObj){
              const response = await Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${tempObj.value}?format=json`);
            if(response.data.Count === 0){
              await Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${tempObj.value}?format=json`)
                    .then(res =>{
                      if(res.data.Count  !=0){
                        tempObj.type = 'make'
                        console.log(tempObj.type)
                      }else{
                        tempObj.type = 'year'
                        // console.log(tempObj.type)
                      }
                    })
            }else{
              tempObj.type = 'vehicletype'
            }
            // await Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${tempObj.value}?format=json`)
            //   .then(response => {
            //     console.log(response.data.Count)
            //     if(response.data.Count === 0){
            //       await Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${tempObj.value}?format=json`)
            //         .then(res =>{
            //           if(res.data.Count  !=0){
            //             tempObj.type = 'make'
            //             console.log(tempObj.type)
            //           }else{
            //             tempObj.type = 'year'
            //             // console.log(tempObj.type)
            //           }
            //         })
            //     }else{
            //       tempObj.type = 'vehicletype'
            //     }
                console.log(tempObj)
                objectArray[i]=tempObj;
                console.log(objectArray)
            //     // console.log(response.data)
            function fetchData(){
              console.log(objectArray)
              let make;
              let type;
              let year;
              let i = 0;
              console.log(make)
              // console.log(objectArray[5].type)
              // console.log(objectArray)
              // console.log(objectArray.length)
              if(objectArray.length > 0){
                console.log(objectArray[0].type)
                while(i<objectArray.length){
                  console.log(i)
                  console.log(objectArray[i].value)
                  if(objectArray[i].type === 'make'){
                    make = `${objectArray[i].value}`
                  }else if(objectArray[i].type == 'vehicletype'){
                    type = `${objectArray[i].value}`
                  }else{
                    year = `${objectArray[i].value}`
                  }
                  i++
                }
                console.log(make)
                if(make !== undefined){
                  if(type !== undefined){
                    if(year !== undefined){
                      Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${type}?format=json`).then(res=>{
                        console.log(res.data.Results)
                        setCarList(res.data.Results)
                      })
                      console.log(make)
                      console.log(carList)
                    }else{
                      Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/vehicletype/${type}?format=json`).then(res=>{
                        console.log(res.data.Results)
                        setCarList(res.data.Results)
                      })
                      console.log(make)
                      console.log(carList)
                    }
                  }else{
                    if(year !== undefined){
                      Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`).then(res=>{
                        console.log(res.data.Results)
                        setCarList(res.data.Results)
                      })
                      console.log(make)
                      console.log(carList)
                    }else{
                      Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`).then(res=>{
                        console.log(res.data.Results)
                        setCarList(res.data.Results)
                      })
                      console.log(make)
                      console.log(carList)
                    }
                  }
                }else{
                  if(type !== undefined){
                    if(year !== undefined){
                      console.log('not support')
                    }else{
                      Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${type}?format=json`).then(res=>{
                      console.log(res.data.Results)
                      setCarList(res.data.Results)
                      })
                      console.log(make)
                      console.log(carList)
                    }
                  }
                }

              }
              
            }
            fetchData()
            
            //   })
            }
              // console.log(tempObj)
              
              // objectArray.push(tempObj);
              // setObj(objectArray);
            
            ///vehicles/GetVehicleTypesForMake/mercedes?format=json--Vehicle name
            
            i++;
          }
        }
      }
      verifyfunc()
     
      }else{
        setCarList([])
      }
  },[searchVal])

  
  // useEffect(()=>{
  //   // Axios.get()
  //   let make;
  //   let type = "vehicletype/"
  //   let year = "modelyear/"
  //   let i = 0;
  //   // console.log(objectArray[5].type)
  //   // console.log(objectArray)
  //   // console.log(objectArray.length)
  //   if(objectArray.length > 0){
  //     // console.log(objectArray[0].type)
  //     while(i<objectArray.length){
  //       console.log(i)
  //       console.log(objectArray[i].value)
  //       if(objectArray[i].type === 'make'){
  //         make = `${objectArray[i].value}`
  //       }else if(objectArray[i].type == 'vehicletype'){
  //         type = type + `${objectArray[i].value}`
  //       }else{
  //         year = year + `${objectArray[i].value}`
  //       }
  //       i++
  //     }
  //   }
  //   Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`).then(res=>{
  //     console.log(res.data.Results)
  //   })
  //   console.log(make)

  // },[objectArray.length])
    

  // let tagArray = JSON.parse(searchVal.slice(1,-1).split(","))
  // console.log(tagA)
  // let tagArray = searchVal.split(",")
  
  return (
    <>
      <h2>
        <em>Crazy</em> Tags:
      </h2>
      <p>
        Wait a <em>few seconds</em> to see things happen. <br />
        <small>
          <em>(Carefully examine the source-code)</em>
        </small>
      </p>
      <button className="clearAllBtn" onClick={clearAll}>
        Clear All
      </button>
      <Tags
        tagifyRef={tagifyRef1}
        settings={settings}
        // defaultValue="a,b,c"
        autoFocus={true}
        {...tagifyProps}
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

      <div>
        {carList.map((car)=>{
          return(
            <div>
              {car.Model_Name}
            </div>
          )
        })}
      </div>

    </>
  )
}

export default CrazyTags
