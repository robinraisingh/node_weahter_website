//requirng module fro request call
const request=require('postman-request')

const forecast=(lattitude,longitude,callback)=>{
    //constructing url
    const url='http://api.weatherstack.com/current?access_key=4661249ec612e63c82265c3ccbb57c9c&query='+encodeURIComponent(lattitude)+','+encodeURIComponent(longitude);
    ///making request
    request({url/*url:url**/,json:true},(error,{body})=>{
            //we have destructure the response object
            //const data=JSON.parse(response.body)
            if(error){
                callback('low level os error',undefined)
            }
            else if(body.error){
                callback('unable to fetch weather',undefined)
            }
            else{
                const temp=body.current.temperature;
                const feel=body.current.feelslike
                const data={
                    temp:temp,
                    feel:feel
                }
                //return response and error
                callback(undefined,data)
            }
           
        })
    }
module.exports=forecast