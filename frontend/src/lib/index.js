import axios from 'axios'
import csvDownload from 'json-to-csv-export'

const uploadFile = async (files) => {
    const data = new FormData();
    // If file selected
    if ( files ) {
        console.log(files)
        for ( let i = 0; i < files.length; i++ ) {
            data.append( 'userImages', files[ i ], files[ i ].name );
        }
        try{
            const response = await axios.post( '/api/upload', data, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
            if ( 200 === response.status ) {
                if( response.data.error ) {
                    console.log(response?.data?.error?.code)
                    return null
                } else {
                    let data = response.data;
                    return data.filesArray
                }
            }
        }catch(err){
            console.log(err)
            return null
        }
    } else {
    // if file not selected throw error
    return null
    }
}


const scheduleEvent = async ({name , email , phone , concern , dateTime, userConcern, attachments, video}) => {
    if(name && phone && concern && dateTime){
        const body = {
          name,
          email,
          attachments,
          summary: `${phone} - ${concern} - (${video ? 'Video' : 'Call'})`,
          description: userConcern ? `${video ? 'Video' : 'Call'} Consultation - ${userConcern}` : null,
          startTime: dateTime.getTime(),
        }
        const res = await fetch(process.env.REACT_APP_API_URL + '/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        });
  
        if (res.status === 200) {
          const d = await res.json()
          return d
        } 
        return null
      }else{
        window.alert('Please fill required fields')
        return null
    }
}

const downloadCsv = (data, headers, name) => {
    const dataToConvert = {
        data: data,
        filename: name,
        delimiter: ',',
        headers: headers
      }
      csvDownload(dataToConvert)
      return
}

export {uploadFile, scheduleEvent, downloadCsv}