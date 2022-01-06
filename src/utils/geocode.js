const request=require('postman-request')
const geocode=(address,calllback)=>{  //defing a method with callback patterrn
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1Ijoicm9iaW4xOTk5IiwiYSI6ImNrd21qd3ZtaDEzeDMyb3Bkc3hnamMwY2QifQ.OsS8lx1CgQTozbV4cDufJA'
    request({url:url,json:true},(error,{body})=>{
        //we have destructure the response object
    if(error){
        calllback('a low level os problem',undefined)
    }
    else if(body.features.length===0){
        calllback('unable to find the address', undefined)
    }
    else{
        const longitude=body.features[0].center[0]
        const lattitude=body.features[0].center[1]
        const data={
            longitude:longitude,
            lattitude:lattitude
        }
        calllback(undefined,data);   //calling the callback with data as argument
    }
    
 })
}
module.exports=geocode